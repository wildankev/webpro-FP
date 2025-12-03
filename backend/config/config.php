<?php
/**
 * myITS Merchandise - Backend Configuration
 * 
 * Main configuration file for the PHP backend.
 * Contains application settings and constants.
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
// Application Settings
// ============================================

/**
 * Application name
 */
define('APP_NAME', 'myITS Merchandise');

/**
 * Application version
 */
define('APP_VERSION', '1.0.0');

/**
 * Debug mode (set to false in production)
 */
define('DEBUG_MODE', true);

// ============================================
// Path Configuration
// ============================================

/**
 * Base path for the backend
 */
define('BACKEND_PATH', dirname(__DIR__));

/**
 * Root path for the project
 */
define('ROOT_PATH', dirname(BACKEND_PATH));

/**
 * Data storage path
 */
define('DATA_PATH', BACKEND_PATH . '/data');

// ============================================
// API Configuration
// ============================================

/**
 * API version
 */
define('API_VERSION', 'v1');

/**
 * Allowed origins for CORS
 * 
 * SECURITY WARNING: In production, replace '*' with your specific domain(s)
 * Example: 'https://myits-merchandise.its.ac.id'
 * Using '*' allows any domain to make API requests
 */
define('ALLOWED_ORIGINS', '*');

/**
 * Default response content type
 */
define('CONTENT_TYPE', 'application/json');

// ============================================
// Admin Configuration
// ============================================

/**
 * Admin credentials
 * 
 * SECURITY WARNING: These are default credentials for demonstration only.
 * In production:
 * 1. Change these to strong, unique values
 * 2. Consider using environment variables instead of hardcoded values
 * 3. Use password hashing (see auth.php for proper implementation)
 * 4. Implement a proper user management system
 */
define('ADMIN_EMAIL', 'admin@its.ac.id');
define('ADMIN_PASSWORD', 'admin');

// ============================================
// Error Reporting
// ============================================

if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
} else {
    error_reporting(0);
    ini_set('display_errors', '0');
}

// ============================================
// Timezone
// ============================================

date_default_timezone_set('Asia/Jakarta');
