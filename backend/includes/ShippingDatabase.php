<?php
/**
 * myITS Merchandise - Shipping Database Operations (RajaOngkir)
 * 
 * Handles MySQL database operations for shipping data.
 * Uses PDO for secure database connections.
 * 
 * Features:
 * - Store province and city data to reduce API calls
 * - Cache shipping cost calculations
 * - Provide efficient lookup for shipping data
 * 
 * @package myITS_Merchandise
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('MYITS_BACKEND')) {
    http_response_code(403);
    exit('Direct access not allowed');
}

/**
 * ShippingDatabase class
 * Handles all database operations for RajaOngkir shipping integration
 */
class ShippingDatabase {
    
    /**
     * Default cache TTL in seconds (24 hours)
     */
    const CACHE_TTL = 86400;
    
    /**
     * Shipping calculation cache TTL (1 hour)
     */
    const SHIPPING_CACHE_TTL = 3600;
    
    // ============================================
    // Province Operations
    // ============================================
    
    /**
     * Store provinces from RajaOngkir API
     * Performs bulk insert/update of province data
     * 
     * @param array $provinces Array of province data from RajaOngkir
     * @return int Number of provinces stored
     */
    public static function storeProvinces(array $provinces): int {
        if (empty($provinces)) {
            return 0;
        }
        
        $count = 0;
        
        foreach ($provinces as $province) {
            $provinceId = (int) ($province['province_id'] ?? 0);
            $provinceName = $province['province'] ?? '';
            
            if ($provinceId <= 0 || empty($provinceName)) {
                continue;
            }
            
            // Check if province exists
            $existing = MySQLDatabase::fetchOne(
                'SELECT id FROM provinces WHERE province_id = ?',
                [$provinceId]
            );
            
            if ($existing) {
                // Update existing province
                MySQLDatabase::update(
                    'provinces',
                    [
                        'province_name' => $provinceName,
                        'updated_at' => date('Y-m-d H:i:s')
                    ],
                    'province_id = ?',
                    [$provinceId]
                );
            } else {
                // Insert new province
                MySQLDatabase::insert('provinces', [
                    'province_id' => $provinceId,
                    'province_name' => $provinceName,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
            }
            
            $count++;
        }
        
        return $count;
    }
    
    /**
     * Get all provinces from database
     * 
     * @return array Array of provinces
     */
    public static function getProvinces(): array {
        return MySQLDatabase::fetchAll(
            'SELECT province_id, province_name as province FROM provinces ORDER BY province_name ASC'
        );
    }
    
    /**
     * Get province by ID
     * 
     * @param int $provinceId Province ID
     * @return array|null Province data or null if not found
     */
    public static function getProvinceById(int $provinceId): ?array {
        $result = MySQLDatabase::fetchOne(
            'SELECT province_id, province_name as province FROM provinces WHERE province_id = ?',
            [$provinceId]
        );
        return $result ?: null;
    }
    
    /**
     * Check if provinces data exists in database
     * 
     * @return bool True if provinces exist
     */
    public static function hasProvinces(): bool {
        $result = MySQLDatabase::fetchOne('SELECT COUNT(*) as count FROM provinces');
        return ($result['count'] ?? 0) > 0;
    }
    
    /**
     * Check if provinces data is stale (needs refresh)
     * 
     * @return bool True if data is older than CACHE_TTL
     */
    public static function isProvincesStale(): bool {
        $result = MySQLDatabase::fetchOne(
            'SELECT MAX(updated_at) as last_update FROM provinces'
        );
        
        if (!$result || !$result['last_update']) {
            return true;
        }
        
        $lastUpdate = strtotime($result['last_update']);
        return (time() - $lastUpdate) > self::CACHE_TTL;
    }
    
    // ============================================
    // City Operations
    // ============================================
    
    /**
     * Store cities from RajaOngkir API
     * Performs bulk insert/update of city data
     * 
     * @param array $cities Array of city data from RajaOngkir
     * @return int Number of cities stored
     */
    public static function storeCities(array $cities): int {
        if (empty($cities)) {
            return 0;
        }
        
        $count = 0;
        
        foreach ($cities as $city) {
            $cityId = (int) ($city['city_id'] ?? 0);
            
            if ($cityId <= 0) {
                continue;
            }
            
            // Check if city exists
            $existing = MySQLDatabase::fetchOne(
                'SELECT id FROM cities WHERE city_id = ?',
                [$cityId]
            );
            
            $cityData = [
                'city_id' => $cityId,
                'province_id' => (int) ($city['province_id'] ?? 0),
                'province_name' => $city['province'] ?? '',
                'city_type' => $city['type'] ?? '',
                'city_name' => $city['city_name'] ?? '',
                'postal_code' => $city['postal_code'] ?? null,
                'updated_at' => date('Y-m-d H:i:s')
            ];
            
            if ($existing) {
                // Update existing city
                MySQLDatabase::update(
                    'cities',
                    $cityData,
                    'city_id = ?',
                    [$cityId]
                );
            } else {
                // Insert new city
                $cityData['created_at'] = date('Y-m-d H:i:s');
                MySQLDatabase::insert('cities', $cityData);
            }
            
            $count++;
        }
        
        return $count;
    }
    
    /**
     * Get all cities from database
     * 
     * @param int|null $provinceId Optional province ID to filter
     * @return array Array of cities
     */
    public static function getCities(?int $provinceId = null): array {
        if ($provinceId !== null) {
            return MySQLDatabase::fetchAll(
                'SELECT city_id, province_id, province_name as province, city_type as type, 
                        city_name, postal_code
                 FROM cities 
                 WHERE province_id = ?
                 ORDER BY city_name ASC',
                [$provinceId]
            );
        }
        
        return MySQLDatabase::fetchAll(
            'SELECT city_id, province_id, province_name as province, city_type as type, 
                    city_name, postal_code
             FROM cities 
             ORDER BY province_name ASC, city_name ASC'
        );
    }
    
    /**
     * Get city by ID
     * 
     * @param int $cityId City ID
     * @return array|null City data or null if not found
     */
    public static function getCityById(int $cityId): ?array {
        $result = MySQLDatabase::fetchOne(
            'SELECT city_id, province_id, province_name as province, city_type as type, 
                    city_name, postal_code
             FROM cities 
             WHERE city_id = ?',
            [$cityId]
        );
        return $result ?: null;
    }
    
    /**
     * Search cities by name
     * 
     * @param string $query Search query
     * @param int $limit Maximum results
     * @return array Array of matching cities
     */
    public static function searchCities(string $query, int $limit = 10): array {
        return MySQLDatabase::fetchAll(
            'SELECT city_id, province_id, province_name as province, city_type as type, 
                    city_name, postal_code
             FROM cities 
             WHERE city_name LIKE ? OR province_name LIKE ?
             ORDER BY city_name ASC
             LIMIT ' . (int) $limit,
            ['%' . $query . '%', '%' . $query . '%']
        );
    }
    
    /**
     * Check if cities data exists in database
     * 
     * @return bool True if cities exist
     */
    public static function hasCities(): bool {
        $result = MySQLDatabase::fetchOne('SELECT COUNT(*) as count FROM cities');
        return ($result['count'] ?? 0) > 0;
    }
    
    /**
     * Check if cities data is stale (needs refresh)
     * 
     * @return bool True if data is older than CACHE_TTL
     */
    public static function isCitiesStale(): bool {
        $result = MySQLDatabase::fetchOne(
            'SELECT MAX(updated_at) as last_update FROM cities'
        );
        
        if (!$result || !$result['last_update']) {
            return true;
        }
        
        $lastUpdate = strtotime($result['last_update']);
        return (time() - $lastUpdate) > self::CACHE_TTL;
    }
    
    // ============================================
    // Shipping Calculation Cache Operations
    // ============================================
    
    /**
     * Store a shipping cost calculation
     * 
     * @param array $data Shipping calculation data:
     *   - origin_city_id: Origin city ID
     *   - destination_city_id: Destination city ID
     *   - weight: Weight in grams
     *   - courier: Courier code
     *   - service: Service type (e.g., REG, YES)
     *   - service_description: Service description
     *   - cost: Cost in IDR
     *   - etd: Estimated time of delivery
     * @return int Calculation ID
     */
    public static function storeShippingCalculation(array $data): int {
        // Set expiration time
        $expiresAt = date('Y-m-d H:i:s', time() + self::SHIPPING_CACHE_TTL);
        
        return MySQLDatabase::insert('shipping_calculations', [
            'origin_city_id' => $data['origin_city_id'],
            'destination_city_id' => $data['destination_city_id'],
            'weight' => $data['weight'],
            'courier' => $data['courier'],
            'service' => $data['service'],
            'service_description' => $data['service_description'] ?? null,
            'cost' => $data['cost'],
            'etd' => $data['etd'] ?? null,
            'created_at' => date('Y-m-d H:i:s'),
            'expires_at' => $expiresAt
        ]);
    }
    
    /**
     * Store multiple shipping calculations from a single API response
     * 
     * @param int $origin Origin city ID
     * @param int $destination Destination city ID
     * @param int $weight Weight in grams
     * @param string $courier Courier code
     * @param array $services Array of service options
     * @return int Number of calculations stored
     */
    public static function storeShippingCalculations(
        int $origin,
        int $destination,
        int $weight,
        string $courier,
        array $services
    ): int {
        // Delete existing calculations for this route
        self::clearShippingCache($origin, $destination, $weight, $courier);
        
        $count = 0;
        
        foreach ($services as $service) {
            if (!isset($service['cost'][0]['value'])) {
                continue;
            }
            
            self::storeShippingCalculation([
                'origin_city_id' => $origin,
                'destination_city_id' => $destination,
                'weight' => $weight,
                'courier' => $courier,
                'service' => $service['service'] ?? '',
                'service_description' => $service['description'] ?? null,
                'cost' => (int) $service['cost'][0]['value'],
                'etd' => $service['cost'][0]['etd'] ?? null
            ]);
            
            $count++;
        }
        
        return $count;
    }
    
    /**
     * Get cached shipping calculation
     * 
     * @param int $origin Origin city ID
     * @param int $destination Destination city ID
     * @param int $weight Weight in grams
     * @param string $courier Courier code
     * @return array|null Cached calculations or null if not found/expired
     */
    public static function getCachedShippingCost(
        int $origin,
        int $destination,
        int $weight,
        string $courier
    ): ?array {
        $results = MySQLDatabase::fetchAll(
            'SELECT service, service_description as description, cost, etd
             FROM shipping_calculations
             WHERE origin_city_id = ?
               AND destination_city_id = ?
               AND weight = ?
               AND courier = ?
               AND expires_at > NOW()
             ORDER BY cost ASC',
            [$origin, $destination, $weight, $courier]
        );
        
        if (empty($results)) {
            return null;
        }
        
        // Format results to match RajaOngkir API response format
        $costs = [];
        foreach ($results as $result) {
            $costs[] = [
                'service' => $result['service'],
                'description' => $result['description'],
                'cost' => [
                    [
                        'value' => (int) $result['cost'],
                        'etd' => $result['etd'],
                        'note' => ''
                    ]
                ]
            ];
        }
        
        return [
            [
                'code' => $courier,
                'name' => self::getCourierName($courier),
                'costs' => $costs
            ]
        ];
    }
    
    /**
     * Clear shipping cache for a specific route
     * 
     * @param int $origin Origin city ID
     * @param int $destination Destination city ID
     * @param int $weight Weight in grams
     * @param string $courier Courier code
     * @return int Number of records deleted
     */
    public static function clearShippingCache(
        int $origin,
        int $destination,
        int $weight,
        string $courier
    ): int {
        return MySQLDatabase::delete(
            'shipping_calculations',
            'origin_city_id = ? AND destination_city_id = ? AND weight = ? AND courier = ?',
            [$origin, $destination, $weight, $courier]
        );
    }
    
    /**
     * Clear all expired shipping calculations
     * 
     * @return int Number of records deleted
     */
    public static function clearExpiredCache(): int {
        return MySQLDatabase::delete(
            'shipping_calculations',
            'expires_at < NOW()',
            []
        );
    }
    
    /**
     * Get shipping calculation history
     * 
     * @param array $filters Filter options
     * @return array Array of calculations
     */
    public static function getShippingHistory(array $filters = []): array {
        $sql = 'SELECT sc.*, 
                       oc.city_name as origin_city, oc.province_name as origin_province,
                       dc.city_name as destination_city, dc.province_name as destination_province
                FROM shipping_calculations sc
                LEFT JOIN cities oc ON sc.origin_city_id = oc.city_id
                LEFT JOIN cities dc ON sc.destination_city_id = dc.city_id
                WHERE 1=1';
        $params = [];
        
        if (!empty($filters['origin_city_id'])) {
            $sql .= ' AND sc.origin_city_id = ?';
            $params[] = $filters['origin_city_id'];
        }
        
        if (!empty($filters['destination_city_id'])) {
            $sql .= ' AND sc.destination_city_id = ?';
            $params[] = $filters['destination_city_id'];
        }
        
        if (!empty($filters['courier'])) {
            $sql .= ' AND sc.courier = ?';
            $params[] = $filters['courier'];
        }
        
        $sql .= ' ORDER BY sc.created_at DESC';
        
        if (!empty($filters['limit'])) {
            $sql .= ' LIMIT ' . (int) $filters['limit'];
        }
        
        return MySQLDatabase::fetchAll($sql, $params);
    }
    
    // ============================================
    // Helper Methods
    // ============================================
    
    /**
     * Get courier name from code
     * 
     * @param string $code Courier code
     * @return string Courier name
     */
    private static function getCourierName(string $code): string {
        $couriers = [
            'jne' => 'Jalur Nugraha Ekakurir (JNE)',
            'pos' => 'POS Indonesia',
            'tiki' => 'Titipan Kilat (TIKI)',
            'rpx' => 'RPX Holding',
            'sicepat' => 'SiCepat Express',
            'jnt' => 'J&T Express',
            'ninja' => 'Ninja Express',
            'lion' => 'Lion Parcel'
        ];
        
        return $couriers[strtolower($code)] ?? strtoupper($code);
    }
}
