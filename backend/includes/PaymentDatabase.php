<?php
/**
 * myITS Merchandise - Payment Database Operations (Midtrans)
 * 
 * Handles MySQL database operations for payment transactions.
 * Uses PDO for secure database connections.
 * 
 * Features:
 * - Store customer information
 * - Store transaction details with timestamps
 * - Log webhook activities from Midtrans
 * - Query transaction history
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
 * PaymentDatabase class
 * Handles all database operations for Midtrans payment integration
 */
class PaymentDatabase {
    
    // ============================================
    // Customer Operations
    // ============================================
    
    /**
     * Create or get existing customer
     * Returns customer ID for the given email
     * 
     * @param string $name Customer name
     * @param string $email Customer email (unique identifier)
     * @param string|null $phone Customer phone number
     * @return int Customer ID
     */
    public static function createOrGetCustomer(string $name, string $email, ?string $phone = null): int {
        // Check if customer exists
        $existing = MySQLDatabase::fetchOne(
            'SELECT id FROM customers WHERE email = ?',
            [$email]
        );
        
        if ($existing) {
            // Update customer info if needed
            MySQLDatabase::update(
                'customers',
                [
                    'name' => $name,
                    'phone' => $phone,
                    'updated_at' => date('Y-m-d H:i:s')
                ],
                'id = ?',
                [$existing['id']]
            );
            return (int) $existing['id'];
        }
        
        // Create new customer
        return MySQLDatabase::insert('customers', [
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }
    
    /**
     * Get customer by ID
     * 
     * @param int $customerId Customer ID
     * @return array|null Customer data or null if not found
     */
    public static function getCustomerById(int $customerId): ?array {
        $result = MySQLDatabase::fetchOne(
            'SELECT * FROM customers WHERE id = ?',
            [$customerId]
        );
        return $result ?: null;
    }
    
    /**
     * Get customer by email
     * 
     * @param string $email Customer email
     * @return array|null Customer data or null if not found
     */
    public static function getCustomerByEmail(string $email): ?array {
        $result = MySQLDatabase::fetchOne(
            'SELECT * FROM customers WHERE email = ?',
            [$email]
        );
        return $result ?: null;
    }
    
    // ============================================
    // Transaction Operations
    // ============================================
    
    /**
     * Create a new transaction
     * 
     * @param array $data Transaction data containing:
     *   - order_id: Unique order ID
     *   - customer_id: Customer ID (optional)
     *   - gross_amount: Total amount
     *   - items: Array of cart items
     *   - shipping_address: Shipping address (optional)
     *   - shipping_cost: Shipping cost (optional)
     *   - snap_token: Midtrans snap token (optional)
     *   - redirect_url: Payment redirect URL (optional)
     * @return int Transaction ID
     */
    public static function createTransaction(array $data): int {
        MySQLDatabase::beginTransaction();
        
        try {
            // Insert transaction
            $transactionId = MySQLDatabase::insert('transactions', [
                'order_id' => $data['order_id'],
                'customer_id' => $data['customer_id'] ?? null,
                'gross_amount' => $data['gross_amount'],
                'payment_status' => 'pending',
                'shipping_address' => isset($data['shipping_address']) ? json_encode($data['shipping_address']) : null,
                'shipping_cost' => $data['shipping_cost'] ?? 0,
                'snap_token' => $data['snap_token'] ?? null,
                'redirect_url' => $data['redirect_url'] ?? null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]);
            
            // Insert transaction items
            if (!empty($data['items'])) {
                foreach ($data['items'] as $item) {
                    $price = (int) ($item['price'] ?? 0);
                    $quantity = (int) ($item['qty'] ?? $item['quantity'] ?? 1);
                    
                    MySQLDatabase::insert('transaction_items', [
                        'transaction_id' => $transactionId,
                        'product_id' => $item['id'] ?? null,
                        'product_name' => $item['name'] ?? 'Unknown Product',
                        'product_price' => $price,
                        'quantity' => $quantity,
                        'subtotal' => $price * $quantity,
                        'created_at' => date('Y-m-d H:i:s')
                    ]);
                }
            }
            
            MySQLDatabase::commit();
            return $transactionId;
            
        } catch (Exception $e) {
            MySQLDatabase::rollback();
            throw $e;
        }
    }
    
    /**
     * Get transaction by order ID
     * 
     * @param string $orderId Order ID
     * @return array|null Transaction data or null if not found
     */
    public static function getTransactionByOrderId(string $orderId): ?array {
        $transaction = MySQLDatabase::fetchOne(
            'SELECT t.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone
             FROM transactions t
             LEFT JOIN customers c ON t.customer_id = c.id
             WHERE t.order_id = ?',
            [$orderId]
        );
        
        if (!$transaction) {
            return null;
        }
        
        // Get transaction items
        $items = MySQLDatabase::fetchAll(
            'SELECT * FROM transaction_items WHERE transaction_id = ?',
            [$transaction['id']]
        );
        
        $transaction['items'] = $items;
        
        // Decode JSON fields
        if ($transaction['shipping_address']) {
            $transaction['shipping_address'] = json_decode($transaction['shipping_address'], true);
        }
        if ($transaction['midtrans_response']) {
            $transaction['midtrans_response'] = json_decode($transaction['midtrans_response'], true);
        }
        
        return $transaction;
    }
    
    /**
     * Get transaction by ID
     * 
     * @param int $transactionId Transaction ID
     * @return array|null Transaction data or null if not found
     */
    public static function getTransactionById(int $transactionId): ?array {
        $transaction = MySQLDatabase::fetchOne(
            'SELECT t.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone
             FROM transactions t
             LEFT JOIN customers c ON t.customer_id = c.id
             WHERE t.id = ?',
            [$transactionId]
        );
        
        if (!$transaction) {
            return null;
        }
        
        // Get transaction items
        $items = MySQLDatabase::fetchAll(
            'SELECT * FROM transaction_items WHERE transaction_id = ?',
            [$transactionId]
        );
        
        $transaction['items'] = $items;
        
        // Decode JSON fields
        if ($transaction['shipping_address']) {
            $transaction['shipping_address'] = json_decode($transaction['shipping_address'], true);
        }
        if ($transaction['midtrans_response']) {
            $transaction['midtrans_response'] = json_decode($transaction['midtrans_response'], true);
        }
        
        return $transaction;
    }
    
    /**
     * Update transaction status
     * 
     * @param string $orderId Order ID
     * @param string $status New payment status
     * @param array $additionalData Additional data to update
     * @return bool True on success
     */
    public static function updateTransactionStatus(string $orderId, string $status, array $additionalData = []): bool {
        $updateData = [
            'payment_status' => $status,
            'updated_at' => date('Y-m-d H:i:s')
        ];
        
        // Add additional fields if provided
        $allowedFields = ['payment_type', 'transaction_id', 'fraud_status', 'midtrans_response'];
        foreach ($allowedFields as $field) {
            if (isset($additionalData[$field])) {
                if ($field === 'midtrans_response' && is_array($additionalData[$field])) {
                    $updateData[$field] = json_encode($additionalData[$field]);
                } else {
                    $updateData[$field] = $additionalData[$field];
                }
            }
        }
        
        $affected = MySQLDatabase::update(
            'transactions',
            $updateData,
            'order_id = ?',
            [$orderId]
        );
        
        return $affected > 0;
    }
    
    /**
     * Get all transactions with optional filters
     * 
     * @param array $filters Filter options:
     *   - status: Payment status filter
     *   - customer_id: Filter by customer
     *   - from_date: Start date (Y-m-d)
     *   - to_date: End date (Y-m-d)
     *   - limit: Number of records
     *   - offset: Offset for pagination
     * @return array Array of transactions
     */
    public static function getTransactions(array $filters = []): array {
        $sql = 'SELECT t.*, c.name as customer_name, c.email as customer_email
                FROM transactions t
                LEFT JOIN customers c ON t.customer_id = c.id
                WHERE 1=1';
        $params = [];
        
        if (!empty($filters['status'])) {
            $sql .= ' AND t.payment_status = ?';
            $params[] = $filters['status'];
        }
        
        if (!empty($filters['customer_id'])) {
            $sql .= ' AND t.customer_id = ?';
            $params[] = $filters['customer_id'];
        }
        
        if (!empty($filters['from_date'])) {
            $sql .= ' AND t.created_at >= ?';
            $params[] = $filters['from_date'] . ' 00:00:00';
        }
        
        if (!empty($filters['to_date'])) {
            $sql .= ' AND t.created_at <= ?';
            $params[] = $filters['to_date'] . ' 23:59:59';
        }
        
        $sql .= ' ORDER BY t.created_at DESC';
        
        if (!empty($filters['limit'])) {
            $sql .= ' LIMIT ' . (int) $filters['limit'];
            if (!empty($filters['offset'])) {
                $sql .= ' OFFSET ' . (int) $filters['offset'];
            }
        }
        
        $transactions = MySQLDatabase::fetchAll($sql, $params);
        
        // Decode JSON fields
        foreach ($transactions as &$transaction) {
            if ($transaction['shipping_address']) {
                $transaction['shipping_address'] = json_decode($transaction['shipping_address'], true);
            }
            if ($transaction['midtrans_response']) {
                $transaction['midtrans_response'] = json_decode($transaction['midtrans_response'], true);
            }
        }
        
        return $transactions;
    }
    
    // ============================================
    // Webhook Log Operations
    // ============================================
    
    /**
     * Log a webhook notification from Midtrans
     * 
     * @param array $notification Raw notification data from Midtrans
     * @param bool $isValid Whether the notification signature is valid
     * @return int Webhook log ID
     */
    public static function logWebhook(array $notification, bool $isValid = true): int {
        return MySQLDatabase::insert('webhook_logs', [
            'order_id' => $notification['order_id'] ?? '',
            'transaction_status' => $notification['transaction_status'] ?? null,
            'payment_type' => $notification['payment_type'] ?? null,
            'gross_amount' => $notification['gross_amount'] ?? null,
            'signature_key' => $notification['signature_key'] ?? null,
            'fraud_status' => $notification['fraud_status'] ?? null,
            'status_code' => $notification['status_code'] ?? null,
            'status_message' => $notification['status_message'] ?? null,
            'raw_payload' => json_encode($notification),
            'is_valid' => $isValid ? 1 : 0,
            'processed_at' => date('Y-m-d H:i:s')
        ]);
    }
    
    /**
     * Get webhook logs for an order
     * 
     * @param string $orderId Order ID
     * @return array Array of webhook logs
     */
    public static function getWebhookLogs(string $orderId): array {
        $logs = MySQLDatabase::fetchAll(
            'SELECT * FROM webhook_logs WHERE order_id = ? ORDER BY processed_at DESC',
            [$orderId]
        );
        
        // Decode raw_payload
        foreach ($logs as &$log) {
            if ($log['raw_payload']) {
                $log['raw_payload'] = json_decode($log['raw_payload'], true);
            }
        }
        
        return $logs;
    }
    
    /**
     * Get all webhook logs with optional filters
     * 
     * @param array $filters Filter options
     * @return array Array of webhook logs
     */
    public static function getAllWebhookLogs(array $filters = []): array {
        $sql = 'SELECT * FROM webhook_logs WHERE 1=1';
        $params = [];
        
        if (!empty($filters['order_id'])) {
            $sql .= ' AND order_id = ?';
            $params[] = $filters['order_id'];
        }
        
        if (!empty($filters['transaction_status'])) {
            $sql .= ' AND transaction_status = ?';
            $params[] = $filters['transaction_status'];
        }
        
        if (isset($filters['is_valid'])) {
            $sql .= ' AND is_valid = ?';
            $params[] = $filters['is_valid'] ? 1 : 0;
        }
        
        $sql .= ' ORDER BY processed_at DESC';
        
        if (!empty($filters['limit'])) {
            $sql .= ' LIMIT ' . (int) $filters['limit'];
        }
        
        $logs = MySQLDatabase::fetchAll($sql, $params);
        
        // Decode raw_payload
        foreach ($logs as &$log) {
            if ($log['raw_payload']) {
                $log['raw_payload'] = json_decode($log['raw_payload'], true);
            }
        }
        
        return $logs;
    }
}
