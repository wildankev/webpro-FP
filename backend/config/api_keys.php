<?php
/**
 * myITS Merchandise - External API Keys Configuration
 * 
 * Contains API keys and configuration for external services:
 * - Midtrans Payment Gateway
 * - RajaOngkir Shipping Cost API
 * 
 * SECURITY WARNING: 
 * 1. Never commit this file with actual API keys to version control
 * 2. Use environment variables in production
 * 3. Keep this file secure and limit access
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
// Midtrans Payment Gateway Configuration
// ============================================

/**
 * Midtrans Environment
 * Set to true for production, false for sandbox (testing)
 * Recommended: Use environment variable MIDTRANS_IS_PRODUCTION=true for production
 */
define('MIDTRANS_IS_PRODUCTION', filter_var(getenv('MIDTRANS_IS_PRODUCTION'), FILTER_VALIDATE_BOOLEAN));

/**
 * Midtrans Server Key
 * Used for server-side API calls (payment creation, status check)
 * Get from: https://dashboard.midtrans.com/settings/config_info
 * 
 * Key format varies based on environment (sandbox vs production)
 */
define('MIDTRANS_SERVER_KEY', getenv('MIDTRANS_SERVER_KEY') ?: 'your_midtrans_server_key_here');

/**
 * Midtrans Client Key
 * Used for frontend (Snap popup)
 * Get from: https://dashboard.midtrans.com/settings/config_info
 * 
 * Key format varies based on environment (sandbox vs production)
 */
define('MIDTRANS_CLIENT_KEY', getenv('MIDTRANS_CLIENT_KEY') ?: 'your_midtrans_client_key_here');

/**
 * Midtrans Merchant ID
 * Your unique merchant identifier
 */
define('MIDTRANS_MERCHANT_ID', getenv('MIDTRANS_MERCHANT_ID') ?: 'your_merchant_id_here');

/**
 * Midtrans API URLs
 */
if (MIDTRANS_IS_PRODUCTION) {
    define('MIDTRANS_SNAP_URL', 'https://app.midtrans.com/snap/v1/transactions');
    define('MIDTRANS_API_URL', 'https://api.midtrans.com/v2');
} else {
    define('MIDTRANS_SNAP_URL', 'https://app.sandbox.midtrans.com/snap/v1/transactions');
    define('MIDTRANS_API_URL', 'https://api.sandbox.midtrans.com/v2');
}

// ============================================
// RajaOngkir Shipping Cost API Configuration
// ============================================

/**
 * RajaOngkir API Key
 * Get from: https://rajaongkir.com/akun/panel
 * 
 * Account Types:
 * - Starter (Free): Limited to JNE courier
 * - Basic: JNE, POS, TIKI
 * - Pro: All couriers + international
 */
define('RAJAONGKIR_API_KEY', getenv('RAJAONGKIR_API_KEY') ?: 'your_rajaongkir_api_key_here');

/**
 * RajaOngkir Account Type
 * 'starter', 'basic', or 'pro'
 */
define('RAJAONGKIR_ACCOUNT_TYPE', 'starter');

/**
 * RajaOngkir API URL based on account type
 */
switch (RAJAONGKIR_ACCOUNT_TYPE) {
    case 'pro':
        define('RAJAONGKIR_API_URL', 'https://pro.rajaongkir.com/api');
        break;
    case 'basic':
        define('RAJAONGKIR_API_URL', 'https://api.rajaongkir.com/basic');
        break;
    default:
        define('RAJAONGKIR_API_URL', 'https://api.rajaongkir.com/starter');
}

/**
 * Default shipping origin city ID
 * This is the city where the store is located
 * Surabaya (ITS location) = 444
 * 
 * You can get city IDs from the /shipping/cities endpoint
 */
define('DEFAULT_ORIGIN_CITY', 444);

/**
 * Supported courier codes for RajaOngkir
 * Available options depend on account type:
 * - Starter: jne
 * - Basic: jne, pos, tiki
 * - Pro: jne, pos, tiki, rpx, pandu, wahana, sicepat, jnt, pahala, sap, jet, indah, dse, slis, first, ncs, star, ninja, lion, idl, rex, ide, sentral
 */
define('RAJAONGKIR_COURIERS_STARTER', ['jne']);
define('RAJAONGKIR_COURIERS_BASIC', ['jne', 'pos', 'tiki']);
define('RAJAONGKIR_COURIERS_PRO', ['jne', 'pos', 'tiki', 'rpx', 'sicepat', 'jnt', 'ninja', 'lion']);

// Set available couriers based on account type
switch (RAJAONGKIR_ACCOUNT_TYPE) {
    case 'pro':
        define('RAJAONGKIR_AVAILABLE_COURIERS', RAJAONGKIR_COURIERS_PRO);
        break;
    case 'basic':
        define('RAJAONGKIR_AVAILABLE_COURIERS', RAJAONGKIR_COURIERS_BASIC);
        break;
    default:
        define('RAJAONGKIR_AVAILABLE_COURIERS', RAJAONGKIR_COURIERS_STARTER);
}
