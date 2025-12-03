<?php
/**
 * myITS Merchandise - Products API
 * 
 * Handles all product-related API requests.
 * Provides CRUD operations for product management.
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
// Initial Product Data
// ============================================

/**
 * Default products (matches frontend data.js)
 */
$INITIAL_PRODUCTS = [
    [
        'id' => 1,
        'name' => 'ITS Hoodie Navy',
        'category' => 'Apparel',
        'price' => 185000,
        'stock' => 50,
        'image' => 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
        'desc' => 'Bahan Cotton Fleece premium, nyaman dipakai sehari-hari dengan bordir logo ITS eksklusif.'
    ],
    [
        'id' => 2,
        'name' => 'Tumbler Smart LED',
        'category' => 'Accessories',
        'price' => 85000,
        'stock' => 100,
        'image' => 'https://images.unsplash.com/photo-1602143407151-0111419500be?w=800&q=80',
        'desc' => 'Tumbler stainless steel dengan indikator suhu LED. Tahan panas/dingin hingga 12 jam.'
    ],
    [
        'id' => 3,
        'name' => 'Kaos Teknik Informatika',
        'category' => 'Apparel',
        'price' => 95000,
        'stock' => 75,
        'image' => 'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?w=800&q=80',
        'desc' => 'Cotton Combed 30s. Desain minimalis \'Code Sleep Repeat\' khas anak IT.'
    ],
    [
        'id' => 4,
        'name' => 'Sticker Pack Vivan',
        'category' => 'Stationery',
        'price' => 15000,
        'stock' => 200,
        'image' => 'https://images.unsplash.com/photo-1572375992501-4f9f6ca7fc29?w=800&q=80',
        'desc' => 'Paket stiker vinyl tahan air dengan berbagai maskot dan slogan kampus.'
    ],
    [
        'id' => 5,
        'name' => 'Lanyard ITS Official',
        'category' => 'Accessories',
        'price' => 25000,
        'stock' => 150,
        'image' => 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
        'desc' => 'Tali ID Card bahan tisu lembut, print 2 sisi. Wajib punya untuk maba.'
    ],
    [
        'id' => 6,
        'name' => 'Varsity Jacket Pride',
        'category' => 'Apparel',
        'price' => 250000,
        'stock' => 20,
        'image' => 'https://images.unsplash.com/photo-1559563458-52c485da6509?w=800&q=80',
        'desc' => 'Jaket Varsity gaya amerika dengan inisial fakultas. Limited Edition.'
    ],
    [
        'id' => 7,
        'name' => 'Tote Bag Canvas',
        'category' => 'Bags',
        'price' => 45000,
        'stock' => 60,
        'image' => 'https://images.unsplash.com/photo-1597484662317-9bd7bd12a018?w=800&q=80',
        'desc' => 'Tas kanvas tebal muat laptop 14 inch. Cocok untuk ngampus santai.'
    ],
    [
        'id' => 8,
        'name' => 'Notebook Hardcover',
        'category' => 'Stationery',
        'price' => 35000,
        'stock' => 80,
        'image' => 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
        'desc' => 'Buku catatan hardcover dengan kertas bookpaper cream yang enak buat nulis.'
    ]
];

// ============================================
// Products Functions
// ============================================

/**
 * Get all products from storage
 * 
 * @return array Array of products
 */
function getProducts(): array {
    global $INITIAL_PRODUCTS;
    
    $products = JsonDatabase::read(PRODUCTS_FILE);
    
    // If no products in storage, initialize with default products
    if (empty($products)) {
        $products = $INITIAL_PRODUCTS;
        JsonDatabase::write(PRODUCTS_FILE, $products);
    }
    
    return $products;
}

/**
 * Get a single product by ID
 * 
 * @param int $id Product ID
 * @return array|null Product data or null if not found
 */
function getProductById(int $id): ?array {
    $products = getProducts();
    
    foreach ($products as $product) {
        if ($product['id'] === $id) {
            return $product;
        }
    }
    
    return null;
}

/**
 * Create a new product
 * 
 * @param array $data Product data
 * @return array Created product
 */
function createProduct(array $data): array {
    $products = getProducts();
    
    // Generate new ID
    $newId = generateId($products);
    
    // Create product array with sanitized data
    $product = [
        'id' => $newId,
        'name' => sanitizeString($data['name']),
        'category' => sanitizeString($data['category']),
        'price' => validateInt($data['price'], 0) ?: 0,
        'stock' => validateInt($data['stock'], 0) ?: 0,
        'image' => filter_var($data['image'], FILTER_VALIDATE_URL) ? $data['image'] : '',
        'desc' => sanitizeString($data['desc'] ?? '')
    ];
    
    // Add to products array
    $products[] = $product;
    
    // Save to storage
    JsonDatabase::write(PRODUCTS_FILE, $products);
    
    return $product;
}

/**
 * Update an existing product
 * 
 * @param int $id Product ID
 * @param array $data Updated product data
 * @return array|null Updated product or null if not found
 */
function updateProduct(int $id, array $data): ?array {
    $products = getProducts();
    
    foreach ($products as $index => $product) {
        if ($product['id'] === $id) {
            // Update fields if provided
            if (isset($data['name'])) {
                $products[$index]['name'] = sanitizeString($data['name']);
            }
            if (isset($data['category'])) {
                $products[$index]['category'] = sanitizeString($data['category']);
            }
            if (isset($data['price'])) {
                $price = validateInt($data['price'], 0);
                if ($price !== false) {
                    $products[$index]['price'] = $price;
                }
            }
            if (isset($data['stock'])) {
                $stock = validateInt($data['stock'], 0);
                if ($stock !== false) {
                    $products[$index]['stock'] = $stock;
                }
            }
            if (isset($data['image'])) {
                if (filter_var($data['image'], FILTER_VALIDATE_URL)) {
                    $products[$index]['image'] = $data['image'];
                }
            }
            if (isset($data['desc'])) {
                $products[$index]['desc'] = sanitizeString($data['desc']);
            }
            
            // Save to storage
            JsonDatabase::write(PRODUCTS_FILE, $products);
            
            return $products[$index];
        }
    }
    
    return null;
}

/**
 * Delete a product
 * 
 * @param int $id Product ID
 * @return bool True if deleted, false if not found
 */
function deleteProduct(int $id): bool {
    $products = getProducts();
    
    // Find and remove the product by index
    foreach ($products as $index => $product) {
        if ($product['id'] === $id) {
            // Remove the product and re-index the array
            unset($products[$index]);
            JsonDatabase::write(PRODUCTS_FILE, array_values($products));
            return true;
        }
    }
    
    return false;
}

// ============================================
// Request Handler
// ============================================

/**
 * Handle products API requests
 * 
 * @param string $method HTTP method
 * @param int|null $productId Product ID (if applicable)
 * @param string|null $action Action (if applicable)
 * @return void
 */
function handleProductsRequest(string $method, ?int $productId, ?string $action): void {
    switch ($method) {
        case 'GET':
            if ($productId !== null) {
                // Get single product
                $product = getProductById($productId);
                if ($product === null) {
                    sendError('Product not found', 404);
                }
                sendSuccess($product, 'Product retrieved successfully');
            } else {
                // Get all products
                $products = getProducts();
                
                // Handle filtering by category
                $category = $_GET['category'] ?? null;
                if ($category) {
                    $products = array_filter($products, function($p) use ($category) {
                        return strtolower($p['category']) === strtolower($category);
                    });
                    $products = array_values($products);
                }
                
                // Handle limit parameter (for recent products)
                $limit = validateInt($_GET['limit'] ?? 0, 1, 100);
                if ($limit) {
                    $products = array_slice($products, 0, $limit);
                }
                
                sendSuccess($products, 'Products retrieved successfully');
            }
            break;
            
        case 'POST':
            // Create new product
            $data = getJsonBody();
            
            // Validate required fields
            $missing = validateRequired($data, ['name', 'category', 'price', 'stock', 'image']);
            if (!empty($missing)) {
                sendError('Missing required fields: ' . implode(', ', $missing), 400);
            }
            
            $product = createProduct($data);
            sendSuccess($product, 'Product created successfully', 201);
            break;
            
        case 'PUT':
            if ($productId === null) {
                sendError('Product ID is required', 400);
            }
            
            $data = getJsonBody();
            if (empty($data)) {
                sendError('No data provided for update', 400);
            }
            
            $product = updateProduct($productId, $data);
            if ($product === null) {
                sendError('Product not found', 404);
            }
            
            sendSuccess($product, 'Product updated successfully');
            break;
            
        case 'DELETE':
            if ($productId === null) {
                sendError('Product ID is required', 400);
            }
            
            if (deleteProduct($productId)) {
                sendSuccess(null, 'Product deleted successfully');
            } else {
                sendError('Product not found', 404);
            }
            break;
            
        default:
            sendError('Method not allowed', 405);
    }
}
