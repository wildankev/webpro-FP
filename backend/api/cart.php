<?php
/**
 * myITS Merchandise - Cart API
 * 
 * Handles shopping cart operations.
 * Uses session-based cart storage.
 * 
 * @package myITS_Merchandise
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('MYITS_BACKEND')) {
    http_response_code(403);
    exit('Direct access not allowed');
}

// ============================================
// Cart Functions
// ============================================

/**
 * Get all cart sessions from storage
 * 
 * @return array Array of cart sessions
 */
function getAllCarts(): array {
    return JsonDatabase::read(CART_FILE);
}

/**
 * Save all cart sessions to storage
 * 
 * @param array $carts Cart sessions data
 * @return bool Success status
 */
function saveAllCarts(array $carts): bool {
    return JsonDatabase::write(CART_FILE, $carts);
}

/**
 * Get cart items for a session
 * 
 * @param string $sessionId Session identifier
 * @return array Cart items
 */
function getCart(string $sessionId): array {
    $carts = getAllCarts();
    return $carts[$sessionId] ?? [];
}

/**
 * Save cart items for a session
 * 
 * @param string $sessionId Session identifier
 * @param array $items Cart items
 * @return bool Success status
 */
function saveCart(string $sessionId, array $items): bool {
    $carts = getAllCarts();
    $carts[$sessionId] = $items;
    return saveAllCarts($carts);
}

/**
 * Add item to cart
 * 
 * @param string $sessionId Session identifier
 * @param int $productId Product ID
 * @param int $quantity Quantity to add
 * @return array Updated cart items
 */
function addToCart(string $sessionId, int $productId, int $quantity = 1): array {
    // Get product details
    $product = getProductById($productId);
    if ($product === null) {
        return [];
    }
    
    $cart = getCart($sessionId);
    $found = false;
    
    // Check if item already exists in cart
    foreach ($cart as $index => $item) {
        if ($item['id'] === $productId) {
            $cart[$index]['qty'] += $quantity;
            $found = true;
            break;
        }
    }
    
    // Add new item if not found
    if (!$found) {
        $cart[] = [
            'id' => $product['id'],
            'name' => $product['name'],
            'price' => $product['price'],
            'image' => $product['image'],
            'qty' => $quantity
        ];
    }
    
    saveCart($sessionId, $cart);
    return $cart;
}

/**
 * Update item quantity in cart
 * 
 * @param string $sessionId Session identifier
 * @param int $productId Product ID
 * @param int $quantity New quantity
 * @return array Updated cart items
 */
function updateCartItem(string $sessionId, int $productId, int $quantity): array {
    $cart = getCart($sessionId);
    
    foreach ($cart as $index => $item) {
        if ($item['id'] === $productId) {
            if ($quantity <= 0) {
                // Remove item if quantity is 0 or less
                unset($cart[$index]);
                $cart = array_values($cart);
            } else {
                $cart[$index]['qty'] = $quantity;
            }
            break;
        }
    }
    
    saveCart($sessionId, $cart);
    return $cart;
}

/**
 * Remove item from cart
 * 
 * @param string $sessionId Session identifier
 * @param int $productId Product ID
 * @return array Updated cart items
 */
function removeFromCart(string $sessionId, int $productId): array {
    $cart = getCart($sessionId);
    
    $cart = array_filter($cart, function($item) use ($productId) {
        return $item['id'] !== $productId;
    });
    
    $cart = array_values($cart);
    saveCart($sessionId, $cart);
    return $cart;
}

/**
 * Clear cart
 * 
 * @param string $sessionId Session identifier
 * @return bool Success status
 */
function clearCart(string $sessionId): bool {
    return saveCart($sessionId, []);
}

/**
 * Get cart total
 * 
 * @param string $sessionId Session identifier
 * @return array Cart total information
 */
function getCartTotal(string $sessionId): array {
    $cart = getCart($sessionId);
    
    $totalItems = 0;
    $totalPrice = 0;
    
    foreach ($cart as $item) {
        $totalItems += $item['qty'];
        $totalPrice += $item['price'] * $item['qty'];
    }
    
    return [
        'items' => $totalItems,
        'total' => $totalPrice,
        'formatted' => formatRupiah($totalPrice)
    ];
}

// ============================================
// Request Handler
// ============================================

/**
 * Handle cart API requests
 * 
 * @param string $method HTTP method
 * @param string|null $action Action to perform
 * @return void
 */
function handleCartRequest(string $method, ?string $action): void {
    // Get session ID from request (or generate new one)
    $sessionId = $_GET['session'] ?? getRequestParam('session') ?? null;
    
    switch ($method) {
        case 'GET':
            // Get cart contents
            if ($sessionId === null) {
                sendError('Session ID is required', 400);
            }
            
            $cart = getCart($sessionId);
            $total = getCartTotal($sessionId);
            
            sendSuccess([
                'items' => $cart,
                'summary' => $total
            ], 'Cart retrieved successfully');
            break;
            
        case 'POST':
            switch ($action) {
                case 'add':
                    // Add item to cart
                    $data = getJsonBody();
                    
                    // Generate session ID if not provided
                    if (empty($data['session'])) {
                        $sessionId = generateToken();
                    } else {
                        $sessionId = $data['session'];
                    }
                    
                    $productId = validateInt($data['productId'] ?? $data['product_id'] ?? 0, 1);
                    if (!$productId) {
                        sendError('Valid product ID is required', 400);
                    }
                    
                    $quantity = validateInt($data['quantity'] ?? $data['qty'] ?? 1, 1) ?: 1;
                    
                    $cart = addToCart($sessionId, $productId, $quantity);
                    if (empty($cart)) {
                        sendError('Product not found', 404);
                    }
                    
                    $total = getCartTotal($sessionId);
                    
                    sendSuccess([
                        'session' => $sessionId,
                        'items' => $cart,
                        'summary' => $total
                    ], 'Item added to cart');
                    break;
                    
                case 'update':
                    // Update item quantity
                    $data = getJsonBody();
                    
                    if (empty($data['session'])) {
                        sendError('Session ID is required', 400);
                    }
                    $sessionId = $data['session'];
                    
                    $productId = validateInt($data['productId'] ?? $data['product_id'] ?? 0, 1);
                    if (!$productId) {
                        sendError('Valid product ID is required', 400);
                    }
                    
                    $quantity = validateInt($data['quantity'] ?? $data['qty'] ?? 0, 0);
                    if ($quantity === false) {
                        sendError('Valid quantity is required', 400);
                    }
                    
                    $cart = updateCartItem($sessionId, $productId, $quantity);
                    $total = getCartTotal($sessionId);
                    
                    sendSuccess([
                        'session' => $sessionId,
                        'items' => $cart,
                        'summary' => $total
                    ], 'Cart updated');
                    break;
                    
                case 'remove':
                    // Remove item from cart
                    $data = getJsonBody();
                    
                    if (empty($data['session'])) {
                        sendError('Session ID is required', 400);
                    }
                    $sessionId = $data['session'];
                    
                    $productId = validateInt($data['productId'] ?? $data['product_id'] ?? 0, 1);
                    if (!$productId) {
                        sendError('Valid product ID is required', 400);
                    }
                    
                    $cart = removeFromCart($sessionId, $productId);
                    $total = getCartTotal($sessionId);
                    
                    sendSuccess([
                        'session' => $sessionId,
                        'items' => $cart,
                        'summary' => $total
                    ], 'Item removed from cart');
                    break;
                    
                case 'clear':
                    // Clear entire cart
                    $data = getJsonBody();
                    
                    if (empty($data['session'])) {
                        sendError('Session ID is required', 400);
                    }
                    $sessionId = $data['session'];
                    
                    clearCart($sessionId);
                    
                    sendSuccess([
                        'session' => $sessionId,
                        'items' => [],
                        'summary' => [
                            'items' => 0,
                            'total' => 0,
                            'formatted' => formatRupiah(0)
                        ]
                    ], 'Cart cleared');
                    break;
                    
                default:
                    sendError('Invalid cart action', 400);
            }
            break;
            
        default:
            sendError('Method not allowed', 405);
    }
}
