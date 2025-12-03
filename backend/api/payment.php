<?php
/**
 * myITS Merchandise - Payment API (Midtrans Integration)
 * 
 * Handles payment processing using Midtrans Payment Gateway.
 * Supports both JSON file storage and MySQL database.
 * 
 * Provides endpoints for:
 * - Creating payment transactions (Snap token generation)
 * - Checking transaction status
 * - Handling payment webhooks/notifications
 * 
 * API Documentation: https://docs.midtrans.com/
 * 
 * @package myITS_Merchandise
 * @version 1.0.0
 * 
 * Endpoints:
 *   POST /api/payment/create      - Create new payment transaction
 *   GET  /api/payment/status/{id} - Get transaction status
 *   POST /api/payment/webhook     - Handle Midtrans notification webhook
 */

// Prevent direct access
if (!defined('MYITS_BACKEND')) {
    http_response_code(403);
    exit('Direct access not allowed');
}

// Load PaymentDatabase if MySQL is enabled
if (DB_TYPE === 'mysql') {
    require_once __DIR__ . '/../includes/PaymentDatabase.php';
}

// ============================================
// Orders File Path (for JSON storage fallback)
// ============================================

define('PAYMENT_ORDERS_FILE', DATA_PATH . '/orders.json');

// ============================================
// Payment Helper Functions
// ============================================

/**
 * Make HTTP request to Midtrans API
 * 
 * @param string $url API endpoint URL
 * @param string $method HTTP method (GET, POST)
 * @param array|null $data Request body data (for POST)
 * @return array Response data with 'success' and 'data'/'error' keys
 */
function midtransRequest(string $url, string $method = 'GET', ?array $data = null): array {
    // Create authorization header with Server Key
    $authString = base64_encode(MIDTRANS_SERVER_KEY . ':');
    
    $headers = [
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: Basic ' . $authString
    ];
    
    $ch = curl_init();
    
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);
    
    if ($method === 'POST' && $data !== null) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    
    curl_close($ch);
    
    if ($curlError) {
        return [
            'success' => false,
            'error' => 'cURL Error: ' . $curlError
        ];
    }
    
    $responseData = json_decode($response, true);
    
    // Check for HTTP errors
    if ($httpCode >= 400) {
        return [
            'success' => false,
            'error' => $responseData['error_messages'] ?? $responseData['status_message'] ?? 'HTTP Error ' . $httpCode,
            'http_code' => $httpCode
        ];
    }
    
    return [
        'success' => true,
        'data' => $responseData
    ];
}

/**
 * Generate unique order ID
 * 
 * @return string Unique order ID in format: ORDER-{timestamp}-{random}
 */
function generateOrderId(): string {
    return 'ORDER-' . date('YmdHis') . '-' . strtoupper(substr(uniqid(), -4));
}

/**
 * Get all orders from storage (supports both JSON and MySQL)
 * 
 * @return array Array of orders
 */
function getOrders(): array {
    if (DB_TYPE === 'mysql' && isMySQLEnabled()) {
        return PaymentDatabase::getTransactions();
    }
    return JsonDatabase::read(PAYMENT_ORDERS_FILE);
}

/**
 * Save all orders to storage (JSON only - MySQL uses individual saves)
 * 
 * @param array $orders Orders data
 * @return bool Success status
 */
function saveOrders(array $orders): bool {
    return JsonDatabase::write(PAYMENT_ORDERS_FILE, $orders);
}

/**
 * Get order by order ID (supports both JSON and MySQL)
 * 
 * @param string $orderId Order ID
 * @return array|null Order data or null if not found
 */
function getOrderById(string $orderId): ?array {
    if (DB_TYPE === 'mysql' && isMySQLEnabled()) {
        $transaction = PaymentDatabase::getTransactionByOrderId($orderId);
        if ($transaction) {
            // Map MySQL fields to JSON format for compatibility
            return [
                'order_id' => $transaction['order_id'],
                'gross_amount' => (int) $transaction['gross_amount'],
                'items' => $transaction['items'] ?? [],
                'customer' => [
                    'name' => $transaction['customer_name'] ?? '',
                    'email' => $transaction['customer_email'] ?? '',
                    'phone' => $transaction['customer_phone'] ?? ''
                ],
                'shipping_address' => $transaction['shipping_address'],
                'shipping_cost' => (int) ($transaction['shipping_cost'] ?? 0),
                'payment_status' => $transaction['payment_status'],
                'payment_type' => $transaction['payment_type'],
                'transaction_id' => $transaction['transaction_id'],
                'fraud_status' => $transaction['fraud_status'],
                'snap_token' => $transaction['snap_token'],
                'redirect_url' => $transaction['redirect_url'],
                'created_at' => $transaction['created_at'],
                'updated_at' => $transaction['updated_at'],
                'midtrans_response' => $transaction['midtrans_response']
            ];
        }
        return null;
    }
    
    $orders = getOrders();
    
    foreach ($orders as $order) {
        if ($order['order_id'] === $orderId) {
            return $order;
        }
    }
    
    return null;
}

/**
 * Save or update an order (supports both JSON and MySQL)
 * 
 * @param array $order Order data
 * @return bool Success status
 */
function saveOrder(array $order): bool {
    if (DB_TYPE === 'mysql' && isMySQLEnabled()) {
        try {
            // Create or get customer
            $customerId = null;
            if (!empty($order['customer']['email'])) {
                $customerId = PaymentDatabase::createOrGetCustomer(
                    $order['customer']['name'] ?? 'Customer',
                    $order['customer']['email'],
                    $order['customer']['phone'] ?? null
                );
            }
            
            // Create transaction
            PaymentDatabase::createTransaction([
                'order_id' => $order['order_id'],
                'customer_id' => $customerId,
                'gross_amount' => $order['gross_amount'],
                'items' => $order['items'] ?? [],
                'shipping_address' => $order['shipping_address'] ?? null,
                'shipping_cost' => $order['shipping_cost'] ?? 0,
                'snap_token' => $order['snap_token'] ?? null,
                'redirect_url' => $order['redirect_url'] ?? null
            ]);
            
            return true;
        } catch (Exception $e) {
            if (DEBUG_MODE) {
                error_log('PaymentDatabase error: ' . $e->getMessage());
            }
            return false;
        }
    }
    
    // JSON storage fallback
    $orders = getOrders();
    $found = false;
    
    foreach ($orders as $index => $existingOrder) {
        if ($existingOrder['order_id'] === $order['order_id']) {
            $orders[$index] = $order;
            $found = true;
            break;
        }
    }
    
    if (!$found) {
        $orders[] = $order;
    }
    
    return saveOrders($orders);
}

/**
 * Update order status (supports both JSON and MySQL)
 * 
 * @param string $orderId Order ID
 * @param string $status New status
 * @param array $additionalData Additional data to update
 * @return bool Success status
 */
function updateOrderStatus(string $orderId, string $status, array $additionalData = []): bool {
    if (DB_TYPE === 'mysql' && isMySQLEnabled()) {
        try {
            return PaymentDatabase::updateTransactionStatus($orderId, $status, $additionalData);
        } catch (Exception $e) {
            if (DEBUG_MODE) {
                error_log('PaymentDatabase error: ' . $e->getMessage());
            }
            return false;
        }
    }
    
    // JSON storage fallback
    $orders = getOrders();
    
    foreach ($orders as $index => $order) {
        if ($order['order_id'] === $orderId) {
            $orders[$index]['payment_status'] = $status;
            $orders[$index]['updated_at'] = date('c');
            
            // Merge additional data
            foreach ($additionalData as $key => $value) {
                $orders[$index][$key] = $value;
            }
            
            return saveOrders($orders);
        }
    }
    
    return false;
}

// ============================================
// Payment API Functions
// ============================================

/**
 * Create a new payment transaction
 * Generates a Midtrans Snap token for payment popup
 * 
 * Expected Input:
 * {
 *   "cart_items": [
 *     {"id": 1, "name": "Product Name", "price": 100000, "qty": 2}
 *   ],
 *   "customer": {
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "phone": "08123456789"
 *   },
 *   "shipping_address": {
 *     "address": "Jl. Example No. 123",
 *     "city": "Surabaya",
 *     "postal_code": "60111"
 *   },
 *   "shipping_cost": 15000
 * }
 * 
 * Output:
 * {
 *   "success": true,
 *   "data": {
 *     "order_id": "ORDER-20231215120000-ABCD",
 *     "snap_token": "abc123...",
 *     "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/..."
 *   }
 * }
 * 
 * @param array $data Payment request data
 * @return array Payment response
 */
function createPayment(array $data): array {
    // Validate required fields
    if (empty($data['cart_items']) || !is_array($data['cart_items'])) {
        return ['success' => false, 'error' => 'Cart items are required'];
    }
    
    if (empty($data['customer']) || !is_array($data['customer'])) {
        return ['success' => false, 'error' => 'Customer information is required'];
    }
    
    // Generate order ID
    $orderId = generateOrderId();
    
    // Calculate gross amount
    $grossAmount = 0;
    $itemDetails = [];
    
    foreach ($data['cart_items'] as $item) {
        $price = validateInt($item['price'], 0) ?: 0;
        // Support both 'qty' and 'quantity' field names for flexibility
        $qty = validateInt($item['qty'] ?? $item['quantity'] ?? 1, 1) ?: 1;
        $itemTotal = $price * $qty;
        $grossAmount += $itemTotal;
        
        $itemDetails[] = [
            'id' => strval($item['id']),
            'price' => $price,
            'quantity' => $qty,
            'name' => substr(sanitizeString($item['name']), 0, 50) // Max 50 chars
        ];
    }
    
    // Add shipping cost if provided
    $shippingCost = validateInt($data['shipping_cost'] ?? 0, 0) ?: 0;
    if ($shippingCost > 0) {
        $grossAmount += $shippingCost;
        $itemDetails[] = [
            'id' => 'shipping',
            'price' => $shippingCost,
            'quantity' => 1,
            'name' => 'Shipping Cost'
        ];
    }
    
    // Validate customer email - return error if invalid
    $customerEmail = filter_var($data['customer']['email'] ?? '', FILTER_VALIDATE_EMAIL);
    if (!$customerEmail) {
        return ['success' => false, 'error' => 'Valid customer email is required'];
    }
    
    // Prepare customer details
    $customerDetails = [
        'first_name' => sanitizeString($data['customer']['name'] ?? 'Customer'),
        'email' => $customerEmail,
        'phone' => preg_replace('/[^0-9+]/', '', $data['customer']['phone'] ?? '')
    ];
    
    // Add shipping address if provided
    if (!empty($data['shipping_address'])) {
        $customerDetails['shipping_address'] = [
            'first_name' => $customerDetails['first_name'],
            'email' => $customerDetails['email'],
            'phone' => $customerDetails['phone'],
            'address' => sanitizeString($data['shipping_address']['address'] ?? ''),
            'city' => sanitizeString($data['shipping_address']['city'] ?? ''),
            'postal_code' => sanitizeString($data['shipping_address']['postal_code'] ?? '')
        ];
    }
    
    // Prepare Snap API request
    $baseUrl = $_SERVER['HTTP_ORIGIN'] ?? 'http://localhost:8080';
    $snapPayload = [
        'transaction_details' => [
            'order_id' => $orderId,
            'gross_amount' => $grossAmount
        ],
        'item_details' => $itemDetails,
        'customer_details' => $customerDetails,
        'callbacks' => [
            'finish' => $baseUrl . '/checkout-success.html'
        ]
    ];
    
    // Call Midtrans Snap API
    $response = midtransRequest(MIDTRANS_SNAP_URL, 'POST', $snapPayload);
    
    if (!$response['success']) {
        return [
            'success' => false,
            'error' => 'Failed to create payment: ' . ($response['error'] ?? 'Unknown error')
        ];
    }
    
    // Save order to storage
    $order = [
        'order_id' => $orderId,
        'gross_amount' => $grossAmount,
        'items' => $data['cart_items'],
        'customer' => $data['customer'],
        'shipping_address' => $data['shipping_address'] ?? null,
        'shipping_cost' => $shippingCost,
        'payment_status' => 'pending',
        'snap_token' => $response['data']['token'] ?? null,
        'redirect_url' => $response['data']['redirect_url'] ?? null,
        'created_at' => date('c'),
        'updated_at' => date('c')
    ];
    
    saveOrder($order);
    
    return [
        'success' => true,
        'data' => [
            'order_id' => $orderId,
            'gross_amount' => $grossAmount,
            'snap_token' => $response['data']['token'] ?? null,
            'redirect_url' => $response['data']['redirect_url'] ?? null,
            'client_key' => MIDTRANS_CLIENT_KEY
        ]
    ];
}

/**
 * Get transaction status from Midtrans
 * 
 * Expected Input:
 * - Order ID as URL parameter: GET /api/payment/status/{order_id}
 * 
 * Output:
 * {
 *   "success": true,
 *   "data": {
 *     "order_id": "ORDER-20231215120000-ABCD",
 *     "transaction_status": "settlement",
 *     "fraud_status": "accept",
 *     "payment_type": "credit_card",
 *     "gross_amount": "115000.00"
 *   }
 * }
 * 
 * Transaction Status Values:
 * - pending: Waiting for payment
 * - settlement: Payment received
 * - capture: Card captured (for credit card)
 * - deny: Payment denied
 * - cancel: Payment cancelled
 * - expire: Payment expired
 * - refund: Payment refunded
 * 
 * @param string $orderId Order ID
 * @return array Transaction status response
 */
function getTransactionStatus(string $orderId): array {
    // First check local order
    $order = getOrderById($orderId);
    
    // Call Midtrans Status API
    $url = MIDTRANS_API_URL . '/' . urlencode($orderId) . '/status';
    $response = midtransRequest($url, 'GET');
    
    if (!$response['success']) {
        // If Midtrans doesn't have the transaction, return local order status
        if ($order !== null) {
            return [
                'success' => true,
                'data' => [
                    'order_id' => $order['order_id'],
                    'transaction_status' => $order['payment_status'],
                    'gross_amount' => $order['gross_amount'],
                    'source' => 'local'
                ]
            ];
        }
        
        return [
            'success' => false,
            'error' => 'Transaction not found: ' . ($response['error'] ?? 'Unknown error')
        ];
    }
    
    $statusData = $response['data'];
    
    // Update local order with latest status
    if ($order !== null) {
        $newStatus = mapMidtransStatus($statusData['transaction_status'] ?? 'pending');
        updateOrderStatus($orderId, $newStatus, [
            'payment_type' => $statusData['payment_type'] ?? null,
            'fraud_status' => $statusData['fraud_status'] ?? null,
            'midtrans_response' => $statusData
        ]);
    }
    
    return [
        'success' => true,
        'data' => [
            'order_id' => $statusData['order_id'],
            'transaction_status' => $statusData['transaction_status'],
            'fraud_status' => $statusData['fraud_status'] ?? null,
            'payment_type' => $statusData['payment_type'] ?? null,
            'gross_amount' => $statusData['gross_amount'],
            'transaction_time' => $statusData['transaction_time'] ?? null,
            'transaction_id' => $statusData['transaction_id'] ?? null
        ]
    ];
}

/**
 * Map Midtrans transaction status to internal status
 * 
 * @param string $midtransStatus Midtrans status
 * @return string Internal status
 */
function mapMidtransStatus(string $midtransStatus): string {
    $statusMap = [
        'capture' => 'paid',
        'settlement' => 'paid',
        'pending' => 'pending',
        'deny' => 'failed',
        'cancel' => 'cancelled',
        'expire' => 'expired',
        'refund' => 'refunded',
        'partial_refund' => 'partial_refund'
    ];
    
    return $statusMap[$midtransStatus] ?? $midtransStatus;
}

/**
 * Handle Midtrans webhook notification
 * This endpoint is called by Midtrans to notify about payment status changes.
 * 
 * Expected Input (from Midtrans):
 * {
 *   "transaction_time": "2023-12-15 12:00:00",
 *   "transaction_status": "settlement",
 *   "transaction_id": "abc123",
 *   "status_message": "Success, transaction found",
 *   "status_code": "200",
 *   "signature_key": "signature...",
 *   "order_id": "ORDER-20231215120000-ABCD",
 *   "payment_type": "bank_transfer",
 *   "gross_amount": "115000.00",
 *   "fraud_status": "accept"
 * }
 * 
 * Webhook Security:
 * The signature_key is verified using SHA512 hash of:
 * order_id + status_code + gross_amount + server_key
 * 
 * @param array $notification Webhook notification data
 * @return array Webhook response
 */
function handleWebhookNotification(array $notification): array {
    // Validate required fields
    if (empty($notification['order_id']) || empty($notification['transaction_status'])) {
        return [
            'success' => false,
            'error' => 'Invalid notification: missing required fields'
        ];
    }
    
    $orderId = $notification['order_id'];
    $transactionStatus = $notification['transaction_status'];
    $fraudStatus = $notification['fraud_status'] ?? null;
    $grossAmount = $notification['gross_amount'] ?? null;
    $statusCode = $notification['status_code'] ?? null;
    $signatureKey = $notification['signature_key'] ?? null;
    
    // Verify signature for security
    $isValid = true;
    if ($signatureKey !== null && $grossAmount !== null && $statusCode !== null) {
        $expectedSignature = hash('sha512', 
            $orderId . $statusCode . $grossAmount . MIDTRANS_SERVER_KEY
        );
        
        if ($signatureKey !== $expectedSignature) {
            $isValid = false;
            
            // Log invalid webhook to MySQL if enabled
            if (DB_TYPE === 'mysql' && isMySQLEnabled()) {
                PaymentDatabase::logWebhook($notification, false);
            }
            
            return [
                'success' => false,
                'error' => 'Invalid signature'
            ];
        }
    }
    
    // Log webhook to MySQL if enabled
    if (DB_TYPE === 'mysql' && isMySQLEnabled()) {
        try {
            PaymentDatabase::logWebhook($notification, $isValid);
        } catch (Exception $e) {
            if (DEBUG_MODE) {
                error_log('Webhook log error: ' . $e->getMessage());
            }
        }
    }
    
    // Get order from local storage
    $order = getOrderById($orderId);
    
    if ($order === null) {
        // Order not found locally, but still acknowledge to Midtrans
        return [
            'success' => true,
            'message' => 'Notification received but order not found locally'
        ];
    }
    
    // Determine final status
    $newStatus = 'pending';
    
    if ($transactionStatus === 'capture') {
        // For credit card transactions
        $newStatus = ($fraudStatus === 'accept') ? 'paid' : 'pending';
    } elseif ($transactionStatus === 'settlement') {
        $newStatus = 'paid';
    } elseif (in_array($transactionStatus, ['cancel', 'deny', 'expire'])) {
        $newStatus = $transactionStatus === 'expire' ? 'expired' : 'failed';
    } elseif ($transactionStatus === 'pending') {
        $newStatus = 'pending';
    } elseif ($transactionStatus === 'refund' || $transactionStatus === 'partial_refund') {
        $newStatus = 'refunded';
    }
    
    // Update order status
    updateOrderStatus($orderId, $newStatus, [
        'payment_type' => $notification['payment_type'] ?? null,
        'fraud_status' => $fraudStatus,
        'transaction_id' => $notification['transaction_id'] ?? null,
        'midtrans_notification' => $notification,
        'webhook_received_at' => date('c')
    ]);
    
    return [
        'success' => true,
        'message' => 'Notification processed successfully',
        'data' => [
            'order_id' => $orderId,
            'status' => $newStatus
        ]
    ];
}

// ============================================
// Request Handler
// ============================================

/**
 * Handle payment API requests
 * 
 * Routes:
 * - POST /payment/create         - Create payment transaction
 * - GET  /payment/status/{id}    - Get transaction status
 * - POST /payment/webhook        - Handle Midtrans webhook
 * - GET  /payment/orders         - Get all orders (admin)
 * - GET  /payment/order/{id}     - Get single order (admin)
 * 
 * @param string $method HTTP method
 * @param string|null $action Action to perform
 * @param string|null $orderId Order ID (for status/order endpoints)
 * @return void
 */
function handlePaymentRequest(string $method, ?string $action, ?string $orderId = null): void {
    switch ($action) {
        case 'create':
            // Create new payment
            if ($method !== 'POST') {
                sendError('Method not allowed', 405);
            }
            
            $data = getJsonBody();
            $result = createPayment($data);
            
            if (!$result['success']) {
                sendError($result['error'], 400);
            }
            
            sendSuccess($result['data'], 'Payment created successfully', 201);
            break;
            
        case 'status':
            // Get transaction status
            if ($method !== 'GET') {
                sendError('Method not allowed', 405);
            }
            
            if (empty($orderId)) {
                sendError('Order ID is required', 400);
            }
            
            $result = getTransactionStatus($orderId);
            
            if (!$result['success']) {
                sendError($result['error'], 404);
            }
            
            sendSuccess($result['data'], 'Transaction status retrieved');
            break;
            
        case 'webhook':
        case 'notification':
            // Handle Midtrans webhook/notification
            if ($method !== 'POST') {
                sendError('Method not allowed', 405);
            }
            
            // Get raw JSON input (Midtrans sends raw JSON)
            $notification = getJsonBody();
            
            if (empty($notification)) {
                sendError('Empty notification body', 400);
            }
            
            $result = handleWebhookNotification($notification);
            
            if (!$result['success']) {
                sendError($result['error'], 400);
            }
            
            sendSuccess($result['data'] ?? null, $result['message'] ?? 'Notification processed');
            break;
            
        case 'orders':
            // Get all orders (admin)
            if ($method !== 'GET') {
                sendError('Method not allowed', 405);
            }
            
            $orders = getOrders();
            
            // Apply filters if provided
            $status = $_GET['status'] ?? null;
            if ($status) {
                $orders = array_filter($orders, function($o) use ($status) {
                    return $o['payment_status'] === $status;
                });
                $orders = array_values($orders);
            }
            
            // Sort by created_at desc
            usort($orders, function($a, $b) {
                return strtotime($b['created_at'] ?? 0) - strtotime($a['created_at'] ?? 0);
            });
            
            sendSuccess($orders, 'Orders retrieved successfully');
            break;
            
        case 'order':
            // Get single order by ID
            if ($method !== 'GET') {
                sendError('Method not allowed', 405);
            }
            
            if (empty($orderId)) {
                sendError('Order ID is required', 400);
            }
            
            $order = getOrderById($orderId);
            
            if ($order === null) {
                sendError('Order not found', 404);
            }
            
            sendSuccess($order, 'Order retrieved successfully');
            break;
            
        case 'client-key':
            // Get client key for frontend
            if ($method !== 'GET') {
                sendError('Method not allowed', 405);
            }
            
            sendSuccess([
                'client_key' => MIDTRANS_CLIENT_KEY,
                'is_production' => MIDTRANS_IS_PRODUCTION
            ], 'Client key retrieved');
            break;
            
        default:
            sendError('Invalid payment action. Available: create, status/{order_id}, webhook, orders, order/{order_id}, client-key', 400);
    }
}
