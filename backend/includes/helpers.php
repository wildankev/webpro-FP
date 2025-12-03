<?php
/**
 * myITS Merchandise - Helper Functions
 * 
 * Common utility functions used across the backend.
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
// Response Functions
// ============================================

/**
 * Send a JSON response
 * 
 * @param mixed $data Data to send
 * @param int $statusCode HTTP status code
 * @return void
 */
function sendJsonResponse($data, int $statusCode = 200): void {
    http_response_code($statusCode);
    header('Content-Type: ' . CONTENT_TYPE);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Send a success response
 * 
 * @param mixed $data Data to include in response
 * @param string $message Success message
 * @param int $statusCode HTTP status code
 * @return void
 */
function sendSuccess($data = null, string $message = 'Success', int $statusCode = 200): void {
    $response = [
        'success' => true,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    sendJsonResponse($response, $statusCode);
}

/**
 * Send an error response
 * 
 * @param string $message Error message
 * @param int $statusCode HTTP status code
 * @param array|null $errors Additional error details
 * @return void
 */
function sendError(string $message, int $statusCode = 400, ?array $errors = null): void {
    $response = [
        'success' => false,
        'message' => $message
    ];
    
    if ($errors !== null) {
        $response['errors'] = $errors;
    }
    
    sendJsonResponse($response, $statusCode);
}

// ============================================
// CORS Functions
// ============================================

/**
 * Set CORS headers for API responses
 * 
 * @return void
 */
function setCorsHeaders(): void {
    header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGINS);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 86400');
    
    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ============================================
// Request Functions
// ============================================

/**
 * Get the request method
 * 
 * @return string HTTP method (GET, POST, PUT, DELETE, etc.)
 */
function getRequestMethod(): string {
    return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
}

/**
 * Get JSON body from request
 * 
 * @return array Decoded JSON data or empty array
 */
function getJsonBody(): array {
    $input = file_get_contents('php://input');
    if (empty($input)) {
        return [];
    }
    
    $data = json_decode($input, true);
    return is_array($data) ? $data : [];
}

/**
 * Get a specific parameter from the request
 * 
 * @param string $key Parameter key
 * @param mixed $default Default value if not found
 * @return mixed Parameter value or default
 */
function getRequestParam(string $key, $default = null) {
    // Check GET parameters
    if (isset($_GET[$key])) {
        return $_GET[$key];
    }
    
    // Check POST parameters
    if (isset($_POST[$key])) {
        return $_POST[$key];
    }
    
    // Check JSON body
    $body = getJsonBody();
    if (isset($body[$key])) {
        return $body[$key];
    }
    
    return $default;
}

// ============================================
// Validation Functions
// ============================================

/**
 * Validate required fields in data
 * 
 * @param array $data Data to validate
 * @param array $requiredFields List of required field names
 * @return array Array of missing fields (empty if all present)
 */
function validateRequired(array $data, array $requiredFields): array {
    $missing = [];
    
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || $data[$field] === '') {
            $missing[] = $field;
        }
    }
    
    return $missing;
}

/**
 * Sanitize a string for safe output
 * 
 * @param string $input Input string
 * @return string Sanitized string
 */
function sanitizeString(string $input): string {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate and sanitize an integer
 * 
 * @param mixed $value Value to validate
 * @param int $min Minimum allowed value
 * @param int|null $max Maximum allowed value (null for no max)
 * @return int|false Validated integer or false if invalid
 */
function validateInt($value, int $min = 0, ?int $max = null) {
    $filtered = filter_var($value, FILTER_VALIDATE_INT);
    
    if ($filtered === false) {
        return false;
    }
    
    if ($filtered < $min) {
        return false;
    }
    
    if ($max !== null && $filtered > $max) {
        return false;
    }
    
    return $filtered;
}

/**
 * Validate an email address
 * 
 * @param string $email Email to validate
 * @return string|false Validated email or false if invalid
 */
function validateEmail(string $email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// ============================================
// ID Generation Functions
// ============================================

/**
 * Generate a unique ID for a new item in a collection
 * 
 * @param array $collection Existing items collection
 * @return int New unique ID
 */
function generateId(array $collection): int {
    if (empty($collection)) {
        return 1;
    }
    
    $maxId = 0;
    foreach ($collection as $item) {
        if (isset($item['id']) && $item['id'] > $maxId) {
            $maxId = $item['id'];
        }
    }
    
    return $maxId + 1;
}

/**
 * Generate a unique session token
 * 
 * @return string Unique token
 */
function generateToken(): string {
    return bin2hex(random_bytes(32));
}

// ============================================
// Currency Functions
// ============================================

/**
 * Format number to Indonesian Rupiah
 * 
 * @param int|float $amount Amount to format
 * @return string Formatted currency string
 */
function formatRupiah($amount): string {
    return 'Rp ' . number_format($amount, 0, ',', '.');
}
