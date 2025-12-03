<?php
/**
 * myITS Merchandise - Authentication API
 * 
 * Handles admin authentication.
 * Provides login, logout, and session checking.
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
// Auth Session File
// ============================================

define('AUTH_FILE', DATA_PATH . '/auth_sessions.json');

// ============================================
// Auth Functions
// ============================================

/**
 * Get all active auth sessions
 * 
 * @return array Array of auth sessions
 */
function getAuthSessions(): array {
    return JsonDatabase::read(AUTH_FILE);
}

/**
 * Save auth sessions
 * 
 * @param array $sessions Auth sessions data
 * @return bool Success status
 */
function saveAuthSessions(array $sessions): bool {
    return JsonDatabase::write(AUTH_FILE, $sessions);
}

/**
 * Validate admin credentials
 * 
 * @param string $email Admin email
 * @param string $password Admin password
 * @return bool True if valid, false otherwise
 */
function validateAdminCredentials(string $email, string $password): bool {
    return $email === ADMIN_EMAIL && $password === ADMIN_PASSWORD;
}

/**
 * Create a new auth session
 * 
 * @param string $email Admin email
 * @return string Session token
 */
function createAuthSession(string $email): string {
    $sessions = getAuthSessions();
    
    // Generate token
    $token = generateToken();
    
    // Create session
    $sessions[$token] = [
        'email' => $email,
        'created_at' => date('c'),
        'expires_at' => date('c', strtotime('+24 hours'))
    ];
    
    // Clean expired sessions
    $now = time();
    foreach ($sessions as $t => $session) {
        if (strtotime($session['expires_at']) < $now) {
            unset($sessions[$t]);
        }
    }
    
    saveAuthSessions($sessions);
    
    return $token;
}

/**
 * Validate an auth token
 * 
 * @param string $token Auth token
 * @return array|null Session data if valid, null otherwise
 */
function validateAuthToken(string $token): ?array {
    $sessions = getAuthSessions();
    
    if (!isset($sessions[$token])) {
        return null;
    }
    
    $session = $sessions[$token];
    
    // Check if expired
    if (strtotime($session['expires_at']) < time()) {
        // Remove expired session
        unset($sessions[$token]);
        saveAuthSessions($sessions);
        return null;
    }
    
    return $session;
}

/**
 * Revoke an auth session
 * 
 * @param string $token Auth token
 * @return bool True if revoked, false if not found
 */
function revokeAuthSession(string $token): bool {
    $sessions = getAuthSessions();
    
    if (!isset($sessions[$token])) {
        return false;
    }
    
    unset($sessions[$token]);
    saveAuthSessions($sessions);
    
    return true;
}

/**
 * Get auth token from request headers
 * 
 * @return string|null Auth token or null
 */
function getAuthTokenFromRequest(): ?string {
    // Get headers using a portable approach
    $headers = [];
    
    // Use getallheaders() if available, otherwise fall back to $_SERVER
    if (function_exists('getallheaders')) {
        $headers = getallheaders();
    } else {
        // Fallback for environments where getallheaders() is not available
        foreach ($_SERVER as $key => $value) {
            if (strpos($key, 'HTTP_') === 0) {
                $headerName = str_replace('_', '-', substr($key, 5));
                $headerName = ucwords(strtolower($headerName), '-');
                $headers[$headerName] = $value;
            }
        }
    }
    
    // Check Authorization header
    if (isset($headers['Authorization'])) {
        $auth = $headers['Authorization'];
        if (strpos($auth, 'Bearer ') === 0) {
            return substr($auth, 7);
        }
    }
    
    // Check X-Auth-Token header
    if (isset($headers['X-Auth-Token'])) {
        return $headers['X-Auth-Token'];
    }
    
    // Check query parameter
    if (isset($_GET['token'])) {
        return $_GET['token'];
    }
    
    return null;
}

/**
 * Check if current request is authenticated
 * 
 * @return array|null Session data if authenticated, null otherwise
 */
function checkAuth(): ?array {
    $token = getAuthTokenFromRequest();
    
    if ($token === null) {
        return null;
    }
    
    return validateAuthToken($token);
}

/**
 * Require authentication for a request
 * Sends error and exits if not authenticated
 * 
 * @return array Session data
 */
function requireAuth(): array {
    $session = checkAuth();
    
    if ($session === null) {
        sendError('Authentication required', 401);
    }
    
    return $session;
}

// ============================================
// Request Handler
// ============================================

/**
 * Handle auth API requests
 * 
 * @param string $method HTTP method
 * @param string|null $action Action to perform
 * @return void
 */
function handleAuthRequest(string $method, ?string $action): void {
    switch ($action) {
        case 'login':
            if ($method !== 'POST') {
                sendError('Method not allowed', 405);
            }
            
            $data = getJsonBody();
            
            // Validate required fields
            $missing = validateRequired($data, ['email', 'password']);
            if (!empty($missing)) {
                sendError('Email and password are required', 400);
            }
            
            $email = sanitizeString($data['email']);
            $password = $data['password']; // Don't sanitize password
            
            // Validate email format
            if (!validateEmail($email)) {
                sendError('Invalid email format', 400);
            }
            
            // Check credentials
            if (!validateAdminCredentials($email, $password)) {
                sendError('Invalid email or password', 401);
            }
            
            // Create session
            $token = createAuthSession($email);
            
            sendSuccess([
                'token' => $token,
                'email' => $email,
                'expires_at' => date('c', strtotime('+24 hours'))
            ], 'Login successful');
            break;
            
        case 'logout':
            if ($method !== 'POST') {
                sendError('Method not allowed', 405);
            }
            
            $token = getAuthTokenFromRequest();
            
            if ($token === null) {
                // Also check body for token
                $data = getJsonBody();
                $token = $data['token'] ?? null;
            }
            
            if ($token !== null) {
                revokeAuthSession($token);
            }
            
            sendSuccess(null, 'Logged out successfully');
            break;
            
        case 'check':
            if ($method !== 'GET') {
                sendError('Method not allowed', 405);
            }
            
            $session = checkAuth();
            
            if ($session === null) {
                sendSuccess([
                    'authenticated' => false
                ], 'Not authenticated');
            } else {
                sendSuccess([
                    'authenticated' => true,
                    'email' => $session['email'],
                    'expires_at' => $session['expires_at']
                ], 'Authenticated');
            }
            break;
            
        default:
            sendError('Invalid auth action', 400);
    }
}
