/**
 * myITS Merchandise - Data Management
 * Product data and Cart management using localStorage
 */

// ============================================
// Product Data
// ============================================
const INITIAL_PRODUCTS = [
    { 
        id: 1, 
        name: "ITS Hoodie Navy", 
        category: "Apparel", 
        price: 185000, 
        stock: 50, 
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80", 
        desc: "Bahan Cotton Fleece premium, nyaman dipakai sehari-hari dengan bordir logo ITS eksklusif." 
    },
    { 
        id: 2, 
        name: "Tumbler Smart LED", 
        category: "Accessories", 
        price: 85000, 
        stock: 100, 
        image: "https://images.unsplash.com/photo-1602143407151-0111419500be?w=800&q=80", 
        desc: "Tumbler stainless steel dengan indikator suhu LED. Tahan panas/dingin hingga 12 jam." 
    },
    { 
        id: 3, 
        name: "Kaos Teknik Informatika", 
        category: "Apparel", 
        price: 95000, 
        stock: 75, 
        image: "https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?w=800&q=80", 
        desc: "Cotton Combed 30s. Desain minimalis 'Code Sleep Repeat' khas anak IT." 
    },
    { 
        id: 4, 
        name: "Sticker Pack Vivan", 
        category: "Stationery", 
        price: 15000, 
        stock: 200, 
        image: "https://images.unsplash.com/photo-1572375992501-4f9f6ca7fc29?w=800&q=80", 
        desc: "Paket stiker vinyl tahan air dengan berbagai maskot dan slogan kampus." 
    },
    { 
        id: 5, 
        name: "Lanyard ITS Official", 
        category: "Accessories", 
        price: 25000, 
        stock: 150, 
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80", 
        desc: "Tali ID Card bahan tisu lembut, print 2 sisi. Wajib punya untuk maba." 
    },
    { 
        id: 6, 
        name: "Varsity Jacket Pride", 
        category: "Apparel", 
        price: 250000, 
        stock: 20, 
        image: "https://images.unsplash.com/photo-1559563458-52c485da6509?w=800&q=80", 
        desc: "Jaket Varsity gaya amerika dengan inisial fakultas. Limited Edition." 
    },
    { 
        id: 7, 
        name: "Tote Bag Canvas", 
        category: "Bags", 
        price: 45000, 
        stock: 60, 
        image: "https://images.unsplash.com/photo-1597484662317-9bd7bd12a018?w=800&q=80", 
        desc: "Tas kanvas tebal muat laptop 14 inch. Cocok untuk ngampus santai." 
    },
    { 
        id: 8, 
        name: "Notebook Hardcover", 
        category: "Stationery", 
        price: 35000, 
        stock: 80, 
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80", 
        desc: "Buku catatan hardcover dengan kertas bookpaper cream yang enak buat nulis." 
    }
];

// ============================================
// Products Management
// ============================================
const Products = {
    /**
     * Get all products from localStorage or initial data
     * @returns {Array} Array of product objects
     */
    getAll: function() {
        const saved = localStorage.getItem('myits_products');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return [...INITIAL_PRODUCTS];
            }
        }
        return [...INITIAL_PRODUCTS];
    },

    /**
     * Get a single product by ID
     * @param {number} id - Product ID
     * @returns {Object|null} Product object or null if not found
     */
    getById: function(id) {
        const products = this.getAll();
        return products.find(p => p.id === parseInt(id)) || null;
    },

    /**
     * Save products to localStorage
     * @param {Array} products - Array of products to save
     */
    save: function(products) {
        localStorage.setItem('myits_products', JSON.stringify(products));
    },

    /**
     * Delete a product by ID
     * @param {number} id - Product ID to delete
     */
    delete: function(id) {
        const products = this.getAll().filter(p => p.id !== parseInt(id));
        this.save(products);
    },

    /**
     * Get recent products (first 4)
     * @returns {Array} Array of recent products
     */
    getRecent: function() {
        return this.getAll().slice(0, 4);
    }
};

// ============================================
// Cart Management
// ============================================
const Cart = {
    /**
     * Get cart items from localStorage
     * @returns {Array} Array of cart items
     */
    get: function() {
        const saved = localStorage.getItem('myits_cart');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return [];
            }
        }
        return [];
    },

    /**
     * Save cart to localStorage
     * @param {Array} items - Cart items to save
     */
    save: function(items) {
        localStorage.setItem('myits_cart', JSON.stringify(items));
    },

    /**
     * Add a product to cart
     * @param {Object} product - Product to add
     */
    add: function(product) {
        const cart = this.get();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: 1
            });
        }

        this.save(cart);
        return cart;
    },

    /**
     * Remove an item from cart
     * @param {number} id - Product ID to remove
     */
    remove: function(id) {
        const cart = this.get().filter(item => item.id !== parseInt(id));
        this.save(cart);
        return cart;
    },

    /**
     * Clear the entire cart
     */
    clear: function() {
        this.save([]);
    },

    /**
     * Get total count of items in cart
     * @returns {number} Total quantity
     */
    getCount: function() {
        return this.get().reduce((sum, item) => sum + item.qty, 0);
    },

    /**
     * Get total price of cart
     * @returns {number} Total price
     */
    getTotal: function() {
        return this.get().reduce((sum, item) => sum + (item.price * item.qty), 0);
    }
};

// ============================================
// Admin Authentication
// ============================================
const Auth = {
    /**
     * Check if user is logged in as admin
     * @returns {boolean} True if admin is logged in
     */
    isLoggedIn: function() {
        return localStorage.getItem('myits_admin_auth') === 'true';
    },

    /**
     * Login as admin
     * @param {string} email - Admin email
     * @param {string} password - Admin password
     * @returns {boolean} True if login successful
     */
    login: function(email, password) {
        if (email === 'admin@its.ac.id' && password === 'admin') {
            localStorage.setItem('myits_admin_auth', 'true');
            return true;
        }
        return false;
    },

    /**
     * Logout admin
     */
    logout: function() {
        localStorage.removeItem('myits_admin_auth');
    }
};
