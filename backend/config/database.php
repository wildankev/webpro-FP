<?php
/**
 * myITS Merchandise - Database Configuration
 * 
 * Database connection settings.
 * Uses JSON file storage for simplicity (can be extended to MySQL/PostgreSQL).
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
// Database Type Configuration
// ============================================

/**
 * Database type: 'json' (file-based) or 'mysql' (future implementation)
 */
define('DB_TYPE', 'json');

// ============================================
// JSON File Storage Configuration
// ============================================

/**
 * Path to products data file
 */
define('PRODUCTS_FILE', DATA_PATH . '/products.json');

/**
 * Path to cart sessions data file
 */
define('CART_FILE', DATA_PATH . '/carts.json');

/**
 * Path to orders data file
 */
define('ORDERS_FILE', DATA_PATH . '/orders.json');

// ============================================
// MySQL Configuration (for future use)
// ============================================

/**
 * Database host
 */
define('DB_HOST', 'localhost');

/**
 * Database name
 */
define('DB_NAME', 'myits_merchandise');

/**
 * Database user
 */
define('DB_USER', 'root');

/**
 * Database password
 */
define('DB_PASS', '');

/**
 * Database charset
 */
define('DB_CHARSET', 'utf8mb4');

// ============================================
// Database Class
// ============================================

/**
 * Simple JSON-based database class
 * Provides basic CRUD operations using JSON files
 */
class JsonDatabase {
    /**
     * Read data from a JSON file
     * 
     * @param string $file Path to the JSON file
     * @return array Data array or empty array if file doesn't exist
     */
    public static function read(string $file): array {
        if (!file_exists($file)) {
            return [];
        }
        
        $content = file_get_contents($file);
        if ($content === false) {
            return [];
        }
        
        $data = json_decode($content, true);
        return is_array($data) ? $data : [];
    }
    
    /**
     * Write data to a JSON file
     * 
     * @param string $file Path to the JSON file
     * @param array $data Data to write
     * @return bool True on success, false on failure
     */
    public static function write(string $file, array $data): bool {
        $dir = dirname($file);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        
        $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        return file_put_contents($file, $json) !== false;
    }
}
