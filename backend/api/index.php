<?php
/**
 * myITS Merchandise - API Router
 * 
 * Main entry point for all API requests.
 * Routes requests to appropriate handlers based on the endpoint.
 * 
 * @package myITS_Merchandise
 * @version 1.0.0
 * 
 * Usage:
 *   GET  /api/products          - Get all products
 *   GET  /api/products/{id}     - Get single product
 *   POST /api/products          - Create product (admin)
 *   PUT  /api/products/{id}     - Update product (admin)
 *   DELETE /api/products/{id}   - Delete product (admin)
 *   
 *   POST /api/cart/add          - Add item to cart
 *   POST /api/cart/remove       - Remove item from cart
 *   GET  /api/cart/{session}    - Get cart contents
 *   POST /api/cart/clear        - Clear cart
 *   
 *   POST /api/auth/login        - Admin login
 *   POST /api/auth/logout       - Admin logout
 *   GET  /api/auth/check        - Check auth status
 * 
 *   POST /api/payment/create           - Create payment transaction (Midtrans)
 *   GET  /api/payment/status/{order_id} - Get transaction status
 *   POST /api/payment/webhook          - Handle Midtrans webhook notification
 *   GET  /api/payment/orders           - Get all orders
 *   GET  /api/payment/order/{order_id} - Get single order
 *   GET  /api/payment/client-key       - Get Midtrans client key
 * 
 *   GET  /api/shipping/provinces       - Get all provinces (RajaOngkir)
 *   GET  /api/shipping/cities          - Get all cities
 *   GET  /api/shipping/cities?province={id} - Get cities by province
 *   POST /api/shipping/cost            - Calculate shipping cost
 *   POST /api/shipping/cost-all        - Calculate cost for all couriers
 *   GET  /api/shipping/couriers        - Get available couriers
 *   GET  /api/shipping/origin          - Get default origin city
 */

// Define backend constant to allow includes
define('MYITS_BACKEND', true);

// Load configuration
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/api_keys.php';
require_once __DIR__ . '/../includes/helpers.php';

// Set CORS headers
setCorsHeaders();

// Get the request URI and parse it
$requestUri = $_SERVER['REQUEST_URI'] ?? '';
$scriptName = $_SERVER['SCRIPT_NAME'] ?? '';

// Remove query string from URI
$requestUri = strtok($requestUri, '?');

// Get the base path (directory containing index.php)
$basePath = dirname($scriptName);

// Remove base path from request URI to get the endpoint
$endpoint = str_replace($basePath, '', $requestUri);
$endpoint = trim($endpoint, '/');

// Parse endpoint parts
$parts = explode('/', $endpoint);

// Get the resource (first part after 'api' or the first part)
$resource = '';
$resourceId = null;
$action = null;

if (!empty($parts)) {
    // Skip 'index.php' if present
    if ($parts[0] === 'index.php') {
        array_shift($parts);
    }
    
    // Get resource
    if (!empty($parts)) {
        $resource = $parts[0];
        
        // Get ID or action (second part)
        if (isset($parts[1])) {
            if (is_numeric($parts[1])) {
                $resourceId = (int) $parts[1];
            } else {
                $action = $parts[1];
            }
        }
        
        // Get action if there's a third part
        if (isset($parts[2])) {
            $action = $parts[2];
        }
    }
}

// Get request method
$method = getRequestMethod();

// Route the request
try {
    switch ($resource) {
        case 'products':
            require_once __DIR__ . '/products.php';
            handleProductsRequest($method, $resourceId, $action);
            break;
            
        case 'cart':
            require_once __DIR__ . '/products.php'; // Cart depends on products
            require_once __DIR__ . '/cart.php';
            handleCartRequest($method, $action);
            break;
            
        case 'auth':
            require_once __DIR__ . '/auth.php';
            handleAuthRequest($method, $action);
            break;
            
        case 'payment':
            // Payment API (Midtrans integration)
            // For payment endpoints, we need to handle order_id in the URL
            // e.g., /payment/status/{order_id} or /payment/order/{order_id}
            $orderId = null;
            if (isset($parts[2]) && !empty($parts[2])) {
                $orderId = $parts[2];
            }
            require_once __DIR__ . '/payment.php';
            handlePaymentRequest($method, $action, $orderId);
            break;
            
        case 'shipping':
            // Shipping API (RajaOngkir integration)
            require_once __DIR__ . '/shipping.php';
            handleShippingRequest($method, $action);
            break;
            
        case '':
        case 'status':
            // API status endpoint
            sendSuccess([
                'name' => APP_NAME,
                'version' => APP_VERSION,
                'api_version' => API_VERSION,
                'status' => 'running',
                'timestamp' => date('c')
            ], 'API is running');
            break;
            
        default:
            sendError('Endpoint not found', 404);
    }
} catch (Exception $e) {
    if (DEBUG_MODE) {
        sendError($e->getMessage(), 500, [
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ]);
    } else {
        sendError('Internal server error', 500);
    }
}
