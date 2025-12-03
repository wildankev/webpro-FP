-- ============================================
-- myITS Merchandise - Database Schema
-- ============================================
-- This SQL schema is for MySQL/MariaDB
-- Includes tables for:
-- - Core application (products, cart, admin, orders)
-- - Midtrans Payment Gateway integration
-- - RajaOngkir Shipping API integration
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS myits_merchandise
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE myits_merchandise;

-- ============================================
-- Products Table
-- ============================================
-- Stores merchandise product information

CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INT UNSIGNED NOT NULL DEFAULT 0,
    stock INT UNSIGNED NOT NULL DEFAULT 0,
    image VARCHAR(500) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_price (price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Cart Sessions Table
-- ============================================
-- Stores shopping cart session information

CREATE TABLE IF NOT EXISTS cart_sessions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_token VARCHAR(64) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    
    INDEX idx_token (session_token),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Cart Items Table
-- ============================================
-- Stores items in shopping carts

CREATE TABLE IF NOT EXISTS cart_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (session_id) REFERENCES cart_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_product (session_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Admin Users Table
-- ============================================
-- Stores admin user accounts

CREATE TABLE IF NOT EXISTS admin_users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Auth Sessions Table
-- ============================================
-- Stores admin authentication sessions

CREATE TABLE IF NOT EXISTS auth_sessions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- MIDTRANS PAYMENT GATEWAY TABLES
-- ============================================

-- ============================================
-- Customers Table
-- ============================================
-- Stores customer information for transactions

CREATE TABLE IF NOT EXISTS customers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_email (email),
    INDEX idx_email (email),
    INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Transactions Table (Midtrans)
-- ============================================
-- Stores all transaction details from Midtrans payment gateway

CREATE TABLE IF NOT EXISTS transactions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL UNIQUE,
    customer_id INT UNSIGNED DEFAULT NULL,
    gross_amount INT UNSIGNED NOT NULL DEFAULT 0,
    payment_status ENUM('pending', 'paid', 'failed', 'expired', 'cancelled', 'refunded', 'partial_refund') DEFAULT 'pending',
    payment_type VARCHAR(50) DEFAULT NULL,
    transaction_id VARCHAR(100) DEFAULT NULL,
    fraud_status VARCHAR(20) DEFAULT NULL,
    snap_token VARCHAR(255) DEFAULT NULL,
    redirect_url VARCHAR(500) DEFAULT NULL,
    shipping_address TEXT DEFAULT NULL,
    shipping_cost INT UNSIGNED DEFAULT 0,
    midtrans_response JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
    INDEX idx_order_id (order_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Transaction Items Table
-- ============================================
-- Stores items in each transaction

CREATE TABLE IF NOT EXISTS transaction_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED DEFAULT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    subtotal INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    INDEX idx_transaction_id (transaction_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Webhook Logs Table (Midtrans)
-- ============================================
-- Logs all webhook notifications from Midtrans

CREATE TABLE IF NOT EXISTS webhook_logs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    transaction_status VARCHAR(50) DEFAULT NULL,
    payment_type VARCHAR(50) DEFAULT NULL,
    gross_amount VARCHAR(50) DEFAULT NULL,
    signature_key VARCHAR(255) DEFAULT NULL,
    fraud_status VARCHAR(20) DEFAULT NULL,
    status_code VARCHAR(10) DEFAULT NULL,
    status_message VARCHAR(255) DEFAULT NULL,
    raw_payload JSON NOT NULL,
    is_valid BOOLEAN DEFAULT TRUE,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_order_id (order_id),
    INDEX idx_transaction_status (transaction_status),
    INDEX idx_processed_at (processed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- RAJAONGKIR SHIPPING API TABLES
-- ============================================

-- ============================================
-- Provinces Table (RajaOngkir)
-- ============================================
-- Stores province data from RajaOngkir to reduce API calls

CREATE TABLE IF NOT EXISTS provinces (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    province_id INT UNSIGNED NOT NULL UNIQUE,
    province_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_province_id (province_id),
    INDEX idx_province_name (province_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Cities Table (RajaOngkir)
-- ============================================
-- Stores city data from RajaOngkir to reduce API calls

CREATE TABLE IF NOT EXISTS cities (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    city_id INT UNSIGNED NOT NULL UNIQUE,
    province_id INT UNSIGNED NOT NULL,
    province_name VARCHAR(100) NOT NULL,
    city_type VARCHAR(20) NOT NULL,
    city_name VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_city_id (city_id),
    INDEX idx_province_id (province_id),
    INDEX idx_city_name (city_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Shipping Calculations Table (RajaOngkir)
-- ============================================
-- Stores shipping cost calculations for caching and history

CREATE TABLE IF NOT EXISTS shipping_calculations (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    origin_city_id INT UNSIGNED NOT NULL,
    destination_city_id INT UNSIGNED NOT NULL,
    weight INT UNSIGNED NOT NULL,
    courier VARCHAR(20) NOT NULL,
    service VARCHAR(50) NOT NULL,
    service_description VARCHAR(255) DEFAULT NULL,
    cost INT UNSIGNED NOT NULL,
    etd VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    
    INDEX idx_origin (origin_city_id),
    INDEX idx_destination (destination_city_id),
    INDEX idx_courier (courier),
    INDEX idx_expires (expires_at),
    INDEX idx_route (origin_city_id, destination_city_id, weight, courier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Legacy Orders Table (kept for backward compatibility)
-- ============================================
-- Stores completed orders (simple version)

CREATE TABLE IF NOT EXISTS orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) DEFAULT NULL,
    customer_email VARCHAR(255) DEFAULT NULL,
    customer_phone VARCHAR(20) DEFAULT NULL,
    total_amount INT UNSIGNED NOT NULL DEFAULT 0,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_order_number (order_number),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Order Items Table
-- ============================================
-- Stores items in orders

CREATE TABLE IF NOT EXISTS order_items (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED DEFAULT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL DEFAULT 1,
    subtotal INT UNSIGNED NOT NULL DEFAULT 0,
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    INDEX idx_order_id (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insert Default Admin User
-- ============================================
-- Default password is 'admin' (hashed using password_hash with PASSWORD_DEFAULT)
-- SECURITY WARNING: In production, change this to a strong, unique password

INSERT INTO admin_users (email, password_hash, name) VALUES
('admin@its.ac.id', '$2y$10$khtYVHOYteqfT4fwz1BMTO2G7SLq5LgDhG0MIxEB/olkAtTsP2bEK', 'Administrator');

-- ============================================
-- Insert Default Products
-- ============================================

INSERT INTO products (name, category, price, stock, image, description) VALUES
('ITS Hoodie Navy', 'Apparel', 185000, 50, 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', 'Bahan Cotton Fleece premium, nyaman dipakai sehari-hari dengan bordir logo ITS eksklusif.'),
('Tumbler Smart LED', 'Accessories', 85000, 100, 'https://images.unsplash.com/photo-1602143407151-0111419500be?w=800&q=80', 'Tumbler stainless steel dengan indikator suhu LED. Tahan panas/dingin hingga 12 jam.'),
('Kaos Teknik Informatika', 'Apparel', 95000, 75, 'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?w=800&q=80', 'Cotton Combed 30s. Desain minimalis ''Code Sleep Repeat'' khas anak IT.'),
('Sticker Pack Vivan', 'Stationery', 15000, 200, 'https://images.unsplash.com/photo-1572375992501-4f9f6ca7fc29?w=800&q=80', 'Paket stiker vinyl tahan air dengan berbagai maskot dan slogan kampus.'),
('Lanyard ITS Official', 'Accessories', 25000, 150, 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80', 'Tali ID Card bahan tisu lembut, print 2 sisi. Wajib punya untuk maba.'),
('Varsity Jacket Pride', 'Apparel', 250000, 20, 'https://images.unsplash.com/photo-1559563458-52c485da6509?w=800&q=80', 'Jaket Varsity gaya amerika dengan inisial fakultas. Limited Edition.'),
('Tote Bag Canvas', 'Bags', 45000, 60, 'https://images.unsplash.com/photo-1597484662317-9bd7bd12a018?w=800&q=80', 'Tas kanvas tebal muat laptop 14 inch. Cocok untuk ngampus santai.'),
('Notebook Hardcover', 'Stationery', 35000, 80, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80', 'Buku catatan hardcover dengan kertas bookpaper cream yang enak buat nulis.');
