<?php
/**
 * myITS Merchandise - MySQL Database Integration Examples
 * 
 * This file provides usage examples for the MySQL database integration
 * for both Midtrans Payment Gateway and RajaOngkir Shipping API.
 * 
 * IMPORTANT: This file is for demonstration purposes only.
 * Do not expose this file in production environments.
 * 
 * @package myITS_Merchandise
 * @version 1.0.0
 */

// Define backend constant
define('MYITS_BACKEND', true);

// Load configuration
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';

// Check if script is run from CLI or web
$isCli = php_sapi_name() === 'cli';
$newLine = $isCli ? "\n" : "<br>\n";
$separator = $isCli ? str_repeat('-', 60) . "\n" : "<hr>\n";

/**
 * Output helper function
 */
function output($message, $isHeader = false) {
    global $isCli, $newLine;
    
    if ($isHeader) {
        if ($isCli) {
            echo "\n=== $message ===" . $newLine;
        } else {
            echo "<h2>$message</h2>" . $newLine;
        }
    } else {
        echo $message . $newLine;
    }
}

/**
 * Output JSON data
 */
function outputJson($data) {
    global $isCli, $newLine;
    
    $json = json_encode($data, JSON_PRETTY_PRINT);
    if ($isCli) {
        echo $json . $newLine;
    } else {
        echo "<pre>" . htmlspecialchars($json) . "</pre>" . $newLine;
    }
}

// ============================================
// Start Examples
// ============================================

if (!$isCli) {
    echo "<!DOCTYPE html><html><head><title>MySQL Integration Examples</title></head><body>";
    echo "<h1>myITS Merchandise - MySQL Database Integration Examples</h1>";
}

output("MySQL Database Integration Examples", true);
output("Current database type: " . DB_TYPE);
echo $separator;

// ============================================
// Example 1: Database Connection Test
// ============================================

output("1. Database Connection Test", true);

if (DB_TYPE !== 'mysql') {
    output("Database type is not set to 'mysql'. Set DB_TYPE='mysql' environment variable to enable MySQL.");
    output("Current connection: JSON file storage (default)");
} else {
    try {
        if (MySQLDatabase::isAvailable()) {
            output("✓ MySQL connection successful!");
            output("  Host: " . DB_HOST);
            output("  Database: " . DB_NAME);
        } else {
            output("✗ MySQL connection failed. Check your database configuration.");
        }
    } catch (PDOException $e) {
        output("✗ Connection error: " . $e->getMessage());
    }
}

echo $separator;

// ============================================
// Example 2: Payment Database (Midtrans)
// ============================================

output("2. Payment Database Operations (Midtrans)", true);

if (DB_TYPE === 'mysql' && MySQLDatabase::isAvailable()) {
    require_once __DIR__ . '/../includes/PaymentDatabase.php';
    
    // Example 2.1: Create or Get Customer
    output("2.1 Creating/Getting Customer...");
    try {
        $customerId = PaymentDatabase::createOrGetCustomer(
            'John Doe',
            'john.doe@example.com',
            '08123456789'
        );
        output("  Customer ID: $customerId");
        
        // Get customer details
        $customer = PaymentDatabase::getCustomerById($customerId);
        output("  Customer data:");
        outputJson($customer);
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
    // Example 2.2: Create Transaction
    output("2.2 Creating Transaction...");
    try {
        $orderId = 'EXAMPLE-' . date('YmdHis') . '-' . rand(1000, 9999);
        $transactionId = PaymentDatabase::createTransaction([
            'order_id' => $orderId,
            'customer_id' => $customerId ?? null,
            'gross_amount' => 250000,
            'items' => [
                [
                    'id' => 1,
                    'name' => 'ITS Hoodie Navy',
                    'price' => 185000,
                    'qty' => 1
                ],
                [
                    'id' => 5,
                    'name' => 'Lanyard ITS Official',
                    'price' => 50000,
                    'qty' => 1
                ]
            ],
            'shipping_address' => [
                'address' => 'Jl. Teknik Kimia No. 1',
                'city' => 'Surabaya',
                'postal_code' => '60111'
            ],
            'shipping_cost' => 15000
        ]);
        output("  Transaction ID: $transactionId");
        output("  Order ID: $orderId");
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
        $orderId = null;
    }
    
    // Example 2.3: Get Transaction
    if (!empty($orderId)) {
        output("2.3 Getting Transaction by Order ID...");
        try {
            $transaction = PaymentDatabase::getTransactionByOrderId($orderId);
            if ($transaction) {
                output("  Transaction found:");
                outputJson([
                    'order_id' => $transaction['order_id'],
                    'gross_amount' => $transaction['gross_amount'],
                    'payment_status' => $transaction['payment_status'],
                    'customer_name' => $transaction['customer_name'],
                    'items_count' => count($transaction['items'] ?? [])
                ]);
            }
        } catch (Exception $e) {
            output("  Error: " . $e->getMessage());
        }
    }
    
    // Example 2.4: Update Transaction Status
    if (!empty($orderId)) {
        output("2.4 Updating Transaction Status...");
        try {
            $updated = PaymentDatabase::updateTransactionStatus($orderId, 'paid', [
                'payment_type' => 'bank_transfer',
                'transaction_id' => 'TRX-' . rand(100000, 999999)
            ]);
            output("  Status updated: " . ($updated ? 'Yes' : 'No'));
        } catch (Exception $e) {
            output("  Error: " . $e->getMessage());
        }
    }
    
    // Example 2.5: Log Webhook
    output("2.5 Logging Webhook Notification...");
    try {
        $webhookId = PaymentDatabase::logWebhook([
            'order_id' => $orderId ?? 'EXAMPLE-ORDER',
            'transaction_status' => 'settlement',
            'payment_type' => 'bank_transfer',
            'gross_amount' => '250000.00',
            'signature_key' => 'example_signature_key',
            'fraud_status' => 'accept',
            'status_code' => '200',
            'status_message' => 'Success'
        ], true);
        output("  Webhook log ID: $webhookId");
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
    // Example 2.6: Get All Transactions
    output("2.6 Getting All Transactions...");
    try {
        $transactions = PaymentDatabase::getTransactions(['limit' => 5]);
        output("  Found " . count($transactions) . " transactions");
        foreach ($transactions as $t) {
            output("  - {$t['order_id']}: {$t['payment_status']} ({$t['gross_amount']} IDR)");
        }
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
} else {
    output("MySQL is not enabled. Examples use JSON file storage.");
    output("To enable MySQL:");
    output("  1. Set environment variable: DB_TYPE=mysql");
    output("  2. Configure database connection in backend/config/database.php");
    output("  3. Run the schema.sql to create tables");
}

echo $separator;

// ============================================
// Example 3: Shipping Database (RajaOngkir)
// ============================================

output("3. Shipping Database Operations (RajaOngkir)", true);

if (DB_TYPE === 'mysql' && MySQLDatabase::isAvailable()) {
    require_once __DIR__ . '/../includes/ShippingDatabase.php';
    
    // Example 3.1: Store Provinces
    output("3.1 Storing Provinces...");
    try {
        $sampleProvinces = [
            ['province_id' => '1', 'province' => 'Bali'],
            ['province_id' => '5', 'province' => 'DI Yogyakarta'],
            ['province_id' => '6', 'province' => 'DKI Jakarta'],
            ['province_id' => '11', 'province' => 'Jawa Timur'],
            ['province_id' => '9', 'province' => 'Jawa Barat']
        ];
        $count = ShippingDatabase::storeProvinces($sampleProvinces);
        output("  Stored $count provinces");
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
    // Example 3.2: Get Provinces
    output("3.2 Getting Provinces...");
    try {
        $provinces = ShippingDatabase::getProvinces();
        output("  Found " . count($provinces) . " provinces");
        foreach (array_slice($provinces, 0, 5) as $p) {
            output("  - {$p['province_id']}: {$p['province']}");
        }
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
    // Example 3.3: Store Cities
    output("3.3 Storing Cities...");
    try {
        $sampleCities = [
            [
                'city_id' => '444',
                'province_id' => '11',
                'province' => 'Jawa Timur',
                'type' => 'Kota',
                'city_name' => 'Surabaya',
                'postal_code' => '60119'
            ],
            [
                'city_id' => '501',
                'province_id' => '5',
                'province' => 'DI Yogyakarta',
                'type' => 'Kota',
                'city_name' => 'Yogyakarta',
                'postal_code' => '55111'
            ],
            [
                'city_id' => '152',
                'province_id' => '6',
                'province' => 'DKI Jakarta',
                'type' => 'Kota',
                'city_name' => 'Jakarta Pusat',
                'postal_code' => '10540'
            ]
        ];
        $count = ShippingDatabase::storeCities($sampleCities);
        output("  Stored $count cities");
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
    // Example 3.4: Get Cities
    output("3.4 Getting Cities...");
    try {
        $cities = ShippingDatabase::getCities();
        output("  Found " . count($cities) . " cities");
        foreach (array_slice($cities, 0, 3) as $c) {
            output("  - {$c['city_id']}: {$c['city_name']}, {$c['province']}");
        }
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
    // Example 3.5: Get City by ID
    output("3.5 Getting City by ID (444 = Surabaya)...");
    try {
        $city = ShippingDatabase::getCityById(444);
        if ($city) {
            outputJson($city);
        } else {
            output("  City not found");
        }
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
    // Example 3.6: Store Shipping Calculation
    output("3.6 Storing Shipping Calculation...");
    try {
        $calcId = ShippingDatabase::storeShippingCalculation([
            'origin_city_id' => 444,
            'destination_city_id' => 501,
            'weight' => 1000,
            'courier' => 'jne',
            'service' => 'REG',
            'service_description' => 'Layanan Reguler',
            'cost' => 15000,
            'etd' => '2-3'
        ]);
        output("  Calculation ID: $calcId");
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
    // Example 3.7: Get Cached Shipping Cost
    output("3.7 Getting Cached Shipping Cost...");
    try {
        $cached = ShippingDatabase::getCachedShippingCost(444, 501, 1000, 'jne');
        if ($cached) {
            output("  Cached results found:");
            outputJson($cached);
        } else {
            output("  No cache found (expired or not cached)");
        }
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
    // Example 3.8: Search Cities
    output("3.8 Searching Cities (query: 'surabaya')...");
    try {
        $results = ShippingDatabase::searchCities('surabaya', 5);
        output("  Found " . count($results) . " results");
        foreach ($results as $c) {
            output("  - {$c['city_name']}, {$c['province']}");
        }
    } catch (Exception $e) {
        output("  Error: " . $e->getMessage());
    }
    
} else {
    output("MySQL is not enabled. Examples use JSON file storage.");
    output("To enable MySQL:");
    output("  1. Set environment variable: DB_TYPE=mysql");
    output("  2. Configure database connection in backend/config/database.php");
    output("  3. Run the schema.sql to create tables");
}

echo $separator;

// ============================================
// Example 4: Environment Variable Configuration
// ============================================

output("4. Environment Variable Configuration", true);

output("The following environment variables can be used to configure the database:");
output("");
output("Database Type:");
output("  DB_TYPE=mysql          # Set to 'mysql' to enable MySQL (default: 'json')");
output("");
output("MySQL Connection:");
output("  DB_HOST=localhost      # Database host");
output("  DB_PORT=3306           # Database port");
output("  DB_NAME=myits_merchandise  # Database name");
output("  DB_USER=root           # Database username");
output("  DB_PASS=               # Database password");
output("");
output("API Keys (for external services):");
output("  MIDTRANS_SERVER_KEY=   # Midtrans server key");
output("  MIDTRANS_CLIENT_KEY=   # Midtrans client key");
output("  MIDTRANS_IS_PRODUCTION=false  # Set to true for production");
output("  RAJAONGKIR_API_KEY=    # RajaOngkir API key");

echo $separator;

// ============================================
// Example 5: Setting Up the Database
// ============================================

output("5. Setting Up the Database", true);

output("To set up the MySQL database:");
output("");
output("1. Create the database and tables:");
output("   mysql -u root -p < backend/database/schema.sql");
output("");
output("2. Set environment variables (Linux/Mac):");
output("   export DB_TYPE=mysql");
output("   export DB_HOST=localhost");
output("   export DB_NAME=myits_merchandise");
output("   export DB_USER=your_user");
output("   export DB_PASS=your_password");
output("");
output("3. For PHP built-in server with environment:");
output("   DB_TYPE=mysql php -S localhost:8080");
output("");
output("4. For Apache/Nginx, set variables in .htaccess or config:");
output("   SetEnv DB_TYPE mysql");

if (!$isCli) {
    echo "</body></html>";
}
