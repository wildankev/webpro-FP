<?php
/**
 * myITS Merchandise - Shipping API (RajaOngkir Integration)
 * 
 * Handles shipping cost calculation using RajaOngkir API.
 * Provides endpoints for:
 * - Getting list of provinces
 * - Getting list of cities
 * - Calculating shipping costs
 * 
 * API Documentation: https://rajaongkir.com/dokumentasi
 * 
 * @package myITS_Merchandise
 * @version 1.0.0
 * 
 * Endpoints:
 *   GET  /api/shipping/provinces         - Get all provinces
 *   GET  /api/shipping/cities            - Get all cities (optional: ?province={id})
 *   POST /api/shipping/cost              - Calculate shipping cost
 *   GET  /api/shipping/couriers          - Get available couriers
 */

// Prevent direct access
if (!defined('MYITS_BACKEND')) {
    http_response_code(403);
    exit('Direct access not allowed');
}

// ============================================
// Cache File Paths
// ============================================

/**
 * Cache file for provinces data
 * Provinces rarely change, so we cache them locally
 */
define('PROVINCES_CACHE_FILE', DATA_PATH . '/provinces_cache.json');

/**
 * Cache file for cities data
 * Cities rarely change, so we cache them locally
 */
define('CITIES_CACHE_FILE', DATA_PATH . '/cities_cache.json');

/**
 * Cache expiration time in seconds (24 hours)
 */
define('SHIPPING_CACHE_TTL', 86400);

// ============================================
// Shipping Helper Functions
// ============================================

/**
 * Make HTTP request to RajaOngkir API
 * 
 * @param string $endpoint API endpoint (e.g., 'province', 'city', 'cost')
 * @param string $method HTTP method (GET or POST)
 * @param array|null $data Request body data (for POST)
 * @return array Response data with 'success' and 'data'/'error' keys
 */
function rajaOngkirRequest(string $endpoint, string $method = 'GET', ?array $data = null): array {
    $url = RAJAONGKIR_API_URL . '/' . $endpoint;
    
    $headers = [
        'key: ' . RAJAONGKIR_API_KEY,
        'Content-Type: application/x-www-form-urlencoded'
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
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
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
    
    // Check RajaOngkir response structure
    if (!isset($responseData['rajaongkir'])) {
        return [
            'success' => false,
            'error' => 'Invalid response from RajaOngkir API'
        ];
    }
    
    $result = $responseData['rajaongkir'];
    
    // Check for API errors
    if (isset($result['status']['code']) && $result['status']['code'] != 200) {
        return [
            'success' => false,
            'error' => $result['status']['description'] ?? 'RajaOngkir API Error',
            'http_code' => $result['status']['code']
        ];
    }
    
    return [
        'success' => true,
        'data' => $result['results'] ?? $result
    ];
}

/**
 * Get cached data if not expired
 * 
 * @param string $cacheFile Cache file path
 * @return array|null Cached data or null if expired/not exists
 */
function getCachedData(string $cacheFile): ?array {
    if (!file_exists($cacheFile)) {
        return null;
    }
    
    $content = file_get_contents($cacheFile);
    $cache = json_decode($content, true);
    
    if (!$cache || !isset($cache['timestamp']) || !isset($cache['data'])) {
        return null;
    }
    
    // Check if cache is expired
    if (time() - $cache['timestamp'] > SHIPPING_CACHE_TTL) {
        return null;
    }
    
    return $cache['data'];
}

/**
 * Save data to cache
 * 
 * @param string $cacheFile Cache file path
 * @param array $data Data to cache
 * @return bool Success status
 */
function saveToCache(string $cacheFile, array $data): bool {
    $cache = [
        'timestamp' => time(),
        'data' => $data
    ];
    
    $dir = dirname($cacheFile);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    return file_put_contents($cacheFile, json_encode($cache, JSON_PRETTY_PRINT)) !== false;
}

// ============================================
// Shipping API Functions
// ============================================

/**
 * Get all provinces
 * 
 * Output:
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "province_id": "1",
 *       "province": "Bali"
 *     },
 *     ...
 *   ]
 * }
 * 
 * @param bool $forceRefresh Force refresh from API (ignore cache)
 * @return array Provinces data
 */
function getProvinces(bool $forceRefresh = false): array {
    // Try to get from cache first
    if (!$forceRefresh) {
        $cached = getCachedData(PROVINCES_CACHE_FILE);
        if ($cached !== null) {
            return ['success' => true, 'data' => $cached, 'cached' => true];
        }
    }
    
    // Fetch from API
    $response = rajaOngkirRequest('province');
    
    if (!$response['success']) {
        return $response;
    }
    
    // Cache the result
    saveToCache(PROVINCES_CACHE_FILE, $response['data']);
    
    return [
        'success' => true,
        'data' => $response['data'],
        'cached' => false
    ];
}

/**
 * Get cities, optionally filtered by province
 * 
 * Input (optional):
 * - province_id: Filter cities by province ID
 * 
 * Output:
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "city_id": "1",
 *       "province_id": "21",
 *       "province": "Nanggroe Aceh Darussalam",
 *       "type": "Kabupaten",
 *       "city_name": "Aceh Barat",
 *       "postal_code": "23681"
 *     },
 *     ...
 *   ]
 * }
 * 
 * @param int|null $provinceId Province ID to filter by (optional)
 * @param bool $forceRefresh Force refresh from API (ignore cache)
 * @return array Cities data
 */
function getCities(?int $provinceId = null, bool $forceRefresh = false): array {
    // For all cities, try cache first
    if ($provinceId === null && !$forceRefresh) {
        $cached = getCachedData(CITIES_CACHE_FILE);
        if ($cached !== null) {
            return ['success' => true, 'data' => $cached, 'cached' => true];
        }
    }
    
    // Build endpoint
    $endpoint = 'city';
    if ($provinceId !== null) {
        $endpoint .= '?province=' . $provinceId;
    }
    
    // Fetch from API
    $response = rajaOngkirRequest($endpoint);
    
    if (!$response['success']) {
        return $response;
    }
    
    // Cache all cities (only when not filtering by province)
    if ($provinceId === null) {
        saveToCache(CITIES_CACHE_FILE, $response['data']);
    }
    
    return [
        'success' => true,
        'data' => $response['data'],
        'cached' => false
    ];
}

/**
 * Get a single city by ID
 * 
 * @param int $cityId City ID
 * @return array|null City data or null if not found
 */
function getCityById(int $cityId): ?array {
    $cities = getCities();
    
    if (!$cities['success'] || empty($cities['data'])) {
        return null;
    }
    
    foreach ($cities['data'] as $city) {
        if ((int)$city['city_id'] === $cityId) {
            return $city;
        }
    }
    
    return null;
}

/**
 * Calculate shipping cost
 * 
 * Expected Input:
 * {
 *   "origin": 444,        // Origin city ID (default: store location)
 *   "destination": 501,   // Destination city ID (required)
 *   "weight": 1000,       // Weight in grams (required)
 *   "courier": "jne"      // Courier code (required)
 * }
 * 
 * Output:
 * {
 *   "success": true,
 *   "data": {
 *     "origin": {
 *       "city_id": "444",
 *       "province_id": "11",
 *       "province": "Jawa Timur",
 *       "type": "Kota",
 *       "city_name": "Surabaya",
 *       "postal_code": "60119"
 *     },
 *     "destination": {
 *       "city_id": "501",
 *       "province_id": "5",
 *       "province": "DI Yogyakarta",
 *       "type": "Kota",
 *       "city_name": "Yogyakarta",
 *       "postal_code": "55111"
 *     },
 *     "results": [
 *       {
 *         "code": "jne",
 *         "name": "Jalur Nugraha Ekakurir (JNE)",
 *         "costs": [
 *           {
 *             "service": "REG",
 *             "description": "Layanan Reguler",
 *             "cost": [
 *               {
 *                 "value": 15000,
 *                 "etd": "2-3",
 *                 "note": ""
 *               }
 *             ]
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * }
 * 
 * @param array $data Shipping cost request data
 * @return array Shipping cost response
 */
function calculateShippingCost(array $data): array {
    // Get origin (use default if not provided)
    $origin = validateInt($data['origin'] ?? DEFAULT_ORIGIN_CITY, 1);
    if (!$origin) {
        $origin = DEFAULT_ORIGIN_CITY;
    }
    
    // Validate destination
    $destination = validateInt($data['destination'] ?? 0, 1);
    if (!$destination) {
        return ['success' => false, 'error' => 'Valid destination city ID is required'];
    }
    
    // Validate weight (in grams)
    $weight = validateInt($data['weight'] ?? 0, 1);
    if (!$weight) {
        return ['success' => false, 'error' => 'Valid weight in grams is required'];
    }
    
    // Validate courier
    $courier = strtolower(sanitizeString($data['courier'] ?? ''));
    if (empty($courier)) {
        return ['success' => false, 'error' => 'Courier code is required'];
    }
    
    // Check if courier is available for account type
    if (!in_array($courier, RAJAONGKIR_AVAILABLE_COURIERS)) {
        return [
            'success' => false, 
            'error' => 'Courier "' . $courier . '" is not available. Available couriers: ' . 
                       implode(', ', RAJAONGKIR_AVAILABLE_COURIERS)
        ];
    }
    
    // Call RajaOngkir Cost API
    $response = rajaOngkirRequest('cost', 'POST', [
        'origin' => $origin,
        'destination' => $destination,
        'weight' => $weight,
        'courier' => $courier
    ]);
    
    if (!$response['success']) {
        return $response;
    }
    
    // Get origin and destination city details
    $originCity = getCityById($origin);
    $destinationCity = getCityById($destination);
    
    return [
        'success' => true,
        'data' => [
            'origin' => $originCity ?? ['city_id' => $origin],
            'destination' => $destinationCity ?? ['city_id' => $destination],
            'weight' => $weight,
            'courier' => $courier,
            'results' => $response['data']
        ]
    ];
}

/**
 * Calculate shipping cost for multiple couriers at once
 * 
 * Expected Input:
 * {
 *   "destination": 501,   // Destination city ID (required)
 *   "weight": 1000        // Weight in grams (required)
 * }
 * 
 * Output:
 * Returns shipping costs for all available couriers
 * 
 * @param array $data Shipping cost request data
 * @return array Shipping cost response for all couriers
 */
function calculateAllCouriersCost(array $data): array {
    $results = [];
    $errors = [];
    
    foreach (RAJAONGKIR_AVAILABLE_COURIERS as $courier) {
        $data['courier'] = $courier;
        $response = calculateShippingCost($data);
        
        if ($response['success']) {
            $results[] = [
                'courier' => $courier,
                'services' => $response['data']['results'][0]['costs'] ?? []
            ];
        } else {
            $errors[] = [
                'courier' => $courier,
                'error' => $response['error']
            ];
        }
    }
    
    // Get origin and destination city details
    $origin = validateInt($data['origin'] ?? DEFAULT_ORIGIN_CITY, 1) ?: DEFAULT_ORIGIN_CITY;
    $destination = validateInt($data['destination'] ?? 0, 1);
    
    return [
        'success' => true,
        'data' => [
            'origin' => getCityById($origin) ?? ['city_id' => $origin],
            'destination' => getCityById($destination) ?? ['city_id' => $destination],
            'weight' => validateInt($data['weight'] ?? 0, 1) ?: 0,
            'results' => $results,
            'errors' => $errors
        ]
    ];
}

/**
 * Get available couriers for current account type
 * 
 * @return array Available couriers
 */
function getAvailableCouriers(): array {
    $courierNames = [
        'jne' => 'Jalur Nugraha Ekakurir (JNE)',
        'pos' => 'POS Indonesia',
        'tiki' => 'Titipan Kilat (TIKI)',
        'rpx' => 'RPX Holding',
        'pandu' => 'Pandu Logistics',
        'wahana' => 'Wahana Prestasi Logistik',
        'sicepat' => 'SiCepat Express',
        'jnt' => 'J&T Express',
        'pahala' => 'Pahala Express',
        'sap' => 'SAP Express',
        'jet' => 'JET Express',
        'indah' => 'Indah Cargo',
        'dse' => 'DSE (21 Express)',
        'slis' => 'Solusi Ekspres',
        'first' => 'First Logistics',
        'ncs' => 'Nusantara Card Semesta',
        'star' => 'Star Cargo',
        'ninja' => 'Ninja Express',
        'lion' => 'Lion Parcel',
        'idl' => 'IDL Cargo',
        'rex' => 'Royal Express Indonesia',
        'ide' => 'IDE Express',
        'sentral' => 'Sentral Cargo'
    ];
    
    $result = [];
    foreach (RAJAONGKIR_AVAILABLE_COURIERS as $code) {
        $result[] = [
            'code' => $code,
            'name' => $courierNames[$code] ?? $code
        ];
    }
    
    return $result;
}

// ============================================
// Request Handler
// ============================================

/**
 * Handle shipping API requests
 * 
 * Routes:
 * - GET  /shipping/provinces           - Get all provinces
 * - GET  /shipping/cities              - Get all cities
 * - GET  /shipping/cities?province=5   - Get cities by province
 * - POST /shipping/cost                - Calculate shipping cost
 * - POST /shipping/cost/all            - Calculate cost for all couriers
 * - GET  /shipping/couriers            - Get available couriers
 * - GET  /shipping/origin              - Get default origin city
 * 
 * @param string $method HTTP method
 * @param string|null $action Action to perform
 * @return void
 */
function handleShippingRequest(string $method, ?string $action): void {
    switch ($action) {
        case 'provinces':
            // Get all provinces
            if ($method !== 'GET') {
                sendError('Method not allowed', 405);
            }
            
            $forceRefresh = isset($_GET['refresh']) && $_GET['refresh'] === 'true';
            $result = getProvinces($forceRefresh);
            
            if (!$result['success']) {
                sendError($result['error'], 500);
            }
            
            sendSuccess([
                'provinces' => $result['data'],
                'cached' => $result['cached'] ?? false
            ], 'Provinces retrieved successfully');
            break;
            
        case 'cities':
            // Get cities (optionally by province)
            if ($method !== 'GET') {
                sendError('Method not allowed', 405);
            }
            
            $provinceId = validateInt($_GET['province'] ?? null, 1);
            $forceRefresh = isset($_GET['refresh']) && $_GET['refresh'] === 'true';
            
            $result = getCities($provinceId, $forceRefresh);
            
            if (!$result['success']) {
                sendError($result['error'], 500);
            }
            
            sendSuccess([
                'cities' => $result['data'],
                'cached' => $result['cached'] ?? false,
                'province_id' => $provinceId
            ], 'Cities retrieved successfully');
            break;
            
        case 'cost':
            // Calculate shipping cost
            if ($method !== 'POST') {
                sendError('Method not allowed', 405);
            }
            
            $data = getJsonBody();
            $result = calculateShippingCost($data);
            
            if (!$result['success']) {
                sendError($result['error'], 400);
            }
            
            sendSuccess($result['data'], 'Shipping cost calculated successfully');
            break;
            
        case 'cost-all':
            // Calculate shipping cost for all couriers
            if ($method !== 'POST') {
                sendError('Method not allowed', 405);
            }
            
            $data = getJsonBody();
            $result = calculateAllCouriersCost($data);
            
            if (!$result['success']) {
                sendError($result['error'], 400);
            }
            
            sendSuccess($result['data'], 'Shipping costs calculated for all couriers');
            break;
            
        case 'couriers':
            // Get available couriers
            if ($method !== 'GET') {
                sendError('Method not allowed', 405);
            }
            
            $couriers = getAvailableCouriers();
            
            sendSuccess([
                'couriers' => $couriers,
                'account_type' => RAJAONGKIR_ACCOUNT_TYPE
            ], 'Available couriers retrieved');
            break;
            
        case 'origin':
            // Get default origin city
            if ($method !== 'GET') {
                sendError('Method not allowed', 405);
            }
            
            $originCity = getCityById(DEFAULT_ORIGIN_CITY);
            
            sendSuccess([
                'origin' => $originCity ?? ['city_id' => DEFAULT_ORIGIN_CITY],
                'city_id' => DEFAULT_ORIGIN_CITY
            ], 'Origin city retrieved');
            break;
            
        default:
            sendError('Invalid shipping action. Available: provinces, cities, cost, cost-all, couriers, origin', 400);
    }
}
