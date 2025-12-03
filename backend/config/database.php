<?php
/**
 * myITS Merchandise - Database Configuration
 * 
 * Database connection settings.
 * Supports both JSON file storage and MySQL database.
 * Uses PDO for secure MySQL connections.
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
 * Database type: 'json' (file-based) or 'mysql'
 * Set to 'mysql' to enable MySQL database integration
 */
define('DB_TYPE', getenv('DB_TYPE') ?: 'json');

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
// MySQL Configuration
// ============================================

/**
 * Database host
 * Use environment variable or default to localhost
 */
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');

/**
 * Database port
 */
define('DB_PORT', getenv('DB_PORT') ?: '3306');

/**
 * Database name
 */
define('DB_NAME', getenv('DB_NAME') ?: 'myits_merchandise');

/**
 * Database user
 * SECURITY: Use environment variables in production
 */
define('DB_USER', getenv('DB_USER') ?: 'root');

/**
 * Database password
 * SECURITY: Use environment variables in production
 */
define('DB_PASS', getenv('DB_PASS') ?: '');

/**
 * Database charset
 */
define('DB_CHARSET', 'utf8mb4');

// ============================================
// JSON Database Class
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

// ============================================
// MySQL Database Class (PDO)
// ============================================

/**
 * MySQL Database class using PDO
 * Provides secure database connections and CRUD operations
 * 
 * Features:
 * - Singleton pattern for connection reuse
 * - Prepared statements to prevent SQL injection
 * - Error handling with exceptions
 * - UTF-8 support
 */
class MySQLDatabase {
    /**
     * PDO instance (singleton)
     * @var PDO|null
     */
    private static ?PDO $connection = null;
    
    /**
     * Get the database connection (singleton)
     * Creates a new connection if one doesn't exist
     * 
     * @return PDO Database connection
     * @throws PDOException If connection fails
     */
    public static function getConnection(): PDO {
        if (self::$connection === null) {
            $dsn = sprintf(
                'mysql:host=%s;port=%s;dbname=%s;charset=%s',
                DB_HOST,
                DB_PORT,
                DB_NAME,
                DB_CHARSET
            );
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET
            ];
            
            self::$connection = new PDO($dsn, DB_USER, DB_PASS, $options);
        }
        
        return self::$connection;
    }
    
    /**
     * Close the database connection
     * 
     * @return void
     */
    public static function closeConnection(): void {
        self::$connection = null;
    }
    
    /**
     * Execute a query with prepared statements
     * 
     * @param string $sql SQL query with placeholders
     * @param array $params Parameters to bind
     * @return PDOStatement Executed statement
     * @throws PDOException If query fails
     */
    public static function query(string $sql, array $params = []): PDOStatement {
        $stmt = self::getConnection()->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
    
    /**
     * Fetch all rows from a query
     * 
     * @param string $sql SQL query with placeholders
     * @param array $params Parameters to bind
     * @return array Array of rows
     */
    public static function fetchAll(string $sql, array $params = []): array {
        return self::query($sql, $params)->fetchAll();
    }
    
    /**
     * Fetch a single row from a query
     * 
     * @param string $sql SQL query with placeholders
     * @param array $params Parameters to bind
     * @return array|false Row data or false if not found
     */
    public static function fetchOne(string $sql, array $params = []) {
        return self::query($sql, $params)->fetch();
    }
    
    /**
     * Insert a row and return the last insert ID
     * 
     * @param string $table Table name
     * @param array $data Associative array of column => value
     * @return int Last insert ID
     */
    public static function insert(string $table, array $data): int {
        $columns = array_keys($data);
        $placeholders = array_fill(0, count($columns), '?');
        
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $table,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );
        
        self::query($sql, array_values($data));
        return (int) self::getConnection()->lastInsertId();
    }
    
    /**
     * Update rows in a table
     * 
     * @param string $table Table name
     * @param array $data Associative array of column => value to update
     * @param string $where WHERE clause (use ? for placeholders)
     * @param array $whereParams Parameters for WHERE clause
     * @return int Number of affected rows
     */
    public static function update(string $table, array $data, string $where, array $whereParams = []): int {
        $setClauses = [];
        foreach (array_keys($data) as $column) {
            $setClauses[] = "$column = ?";
        }
        
        $sql = sprintf(
            'UPDATE %s SET %s WHERE %s',
            $table,
            implode(', ', $setClauses),
            $where
        );
        
        $params = array_merge(array_values($data), $whereParams);
        $stmt = self::query($sql, $params);
        return $stmt->rowCount();
    }
    
    /**
     * Delete rows from a table
     * 
     * @param string $table Table name
     * @param string $where WHERE clause (use ? for placeholders)
     * @param array $params Parameters for WHERE clause
     * @return int Number of affected rows
     */
    public static function delete(string $table, string $where, array $params = []): int {
        $sql = sprintf('DELETE FROM %s WHERE %s', $table, $where);
        $stmt = self::query($sql, $params);
        return $stmt->rowCount();
    }
    
    /**
     * Begin a transaction
     * 
     * @return bool True on success
     */
    public static function beginTransaction(): bool {
        return self::getConnection()->beginTransaction();
    }
    
    /**
     * Commit a transaction
     * 
     * @return bool True on success
     */
    public static function commit(): bool {
        return self::getConnection()->commit();
    }
    
    /**
     * Rollback a transaction
     * 
     * @return bool True on success
     */
    public static function rollback(): bool {
        return self::getConnection()->rollBack();
    }
    
    /**
     * Check if database connection is available
     * 
     * @return bool True if connection successful
     */
    public static function isAvailable(): bool {
        try {
            self::getConnection();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}

// ============================================
// Database Helper Functions
// ============================================

/**
 * Get database instance based on DB_TYPE
 * 
 * @return string Database class name to use
 */
function getDbType(): string {
    return DB_TYPE;
}

/**
 * Check if MySQL database is enabled and available
 * 
 * @return bool True if MySQL is enabled and connection works
 */
function isMySQLEnabled(): bool {
    return DB_TYPE === 'mysql' && MySQLDatabase::isAvailable();
}
