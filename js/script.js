/**
 * myITS Merchandise - Main JavaScript
 * Vanilla JavaScript (ES6+) for all application logic
 * No frameworks, only Bootstrap 5.3 for UI components
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
// Application State
// ============================================
let state = {
    currentView: 'home',
    products: [],
    cart: [],
    activeProduct: null,
    isAdmin: false
};

// ============================================
// Utility Functions
// ============================================

/**
 * Format number to Indonesian Rupiah currency
 * @param {number} num - Number to format
 * @returns {string} Formatted currency string
 */
function formatRupiah(num) {
    return 'Rp ' + num.toLocaleString('id-ID');
}

/**
 * Save cart to localStorage
 */
function saveCart() {
    localStorage.setItem('myits_cart', JSON.stringify(state.cart));
}

/**
 * Load cart from localStorage
 */
function loadCart() {
    const saved = localStorage.getItem('myits_cart');
    if (saved) {
        try {
            state.cart = JSON.parse(saved);
        } catch (e) {
            state.cart = [];
        }
    }
}

/**
 * Save products to localStorage
 */
function saveProducts() {
    localStorage.setItem('myits_products', JSON.stringify(state.products));
}

/**
 * Load products from localStorage or use initial data
 */
function loadProducts() {
    const saved = localStorage.getItem('myits_products');
    if (saved) {
        try {
            state.products = JSON.parse(saved);
        } catch (e) {
            state.products = [...INITIAL_PRODUCTS];
        }
    } else {
        state.products = [...INITIAL_PRODUCTS];
    }
}

/**
 * Get total cart item count
 * @returns {number} Total quantity of items in cart
 */
function getCartCount() {
    return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

/**
 * Get total cart price
 * @returns {number} Total price of all items in cart
 */
function getCartTotal() {
    return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

// ============================================
// Toast Notifications
// ============================================

/**
 * Show a toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    const toastElement = document.getElementById('mainToast');
    
    if (toastMessage && toastElement) {
        toastMessage.textContent = message;
        const toast = bootstrap.Toast.getOrCreateInstance(toastElement, {
            animation: true,
            autohide: true,
            delay: 3000
        });
        toast.show();
    }
}

// ============================================
// Navigation & View Management
// ============================================

/**
 * Navigate to a specific view
 * @param {string} viewName - Name of the view to navigate to
 */
function navigateTo(viewName) {
    // Handle admin navigation
    if (viewName === 'login' && state.isAdmin) {
        viewName = 'admin';
    }
    
    // Hide all views
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.add('d-none');
    });
    
    // Show target view
    const targetView = document.getElementById(viewName + 'View');
    if (targetView) {
        targetView.classList.remove('d-none');
        state.currentView = viewName;
    }
    
    // Update sidebar active state
    updateSidebarActiveState(viewName);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

/**
 * Update sidebar navigation active state
 * @param {string} viewName - Current active view
 */
function updateSidebarActiveState(viewName) {
    // Map view names for active state
    const viewMap = {
        'detail': 'catalog',
        'admin': 'login'
    };
    
    const activeView = viewMap[viewName] || viewName;
    
    // Remove active class from all sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to matching links
    document.querySelectorAll(`[data-view="${activeView}"]`).forEach(link => {
        link.classList.add('active');
    });
}

// ============================================
// Product Rendering Functions
// ============================================

/**
 * Create HTML for a product card
 * @param {Object} product - Product object
 * @returns {string} HTML string for product card
 */
function createProductCardHTML(product) {
    return `
        <div class="col-12 col-sm-6 col-md-4 col-xl-3">
            <div class="product-card" onclick="showProductDetail(${product.id})">
                <div class="position-relative">
                    <img src="${product.image}" alt="${product.name}" class="product-card-img" loading="lazy">
                    <span class="stock-badge">Stok: ${product.stock}</span>
                </div>
                <div class="product-card-body">
                    <small class="text-muted">${product.category}</small>
                    <h5 class="text-white fs-6 fw-medium mt-1 mb-1 text-truncate" title="${product.name}">
                        ${product.name}
                    </h5>
                    <div class="text-its-cyan fw-semibold fs-5 mb-3">
                        ${formatRupiah(product.price)}
                    </div>
                    <button class="btn btn-outline-secondary btn-add-cart w-100 d-flex align-items-center justify-content-center gap-2" 
                            onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="bi bi-cart-plus"></i>
                        Tambah
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render recent products (first 4) on home page
 */
function renderRecentProducts() {
    const container = document.getElementById('recentProducts');
    if (!container) return;
    
    const recentProducts = state.products.slice(0, 4);
    container.innerHTML = recentProducts.map(createProductCardHTML).join('');
}

/**
 * Render all products on catalog page
 */
function renderAllProducts() {
    const container = document.getElementById('allProducts');
    if (!container) return;
    
    container.innerHTML = state.products.map(createProductCardHTML).join('');
}

/**
 * Show product detail view
 * @param {number} productId - Product ID to display
 */
function showProductDetail(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    state.activeProduct = product;
    
    const container = document.getElementById('productDetailContent');
    if (!container) return;
    
    container.innerHTML = `
        <div class="row g-4">
            <div class="col-md-6">
                <div class="bg-dark-card p-3 rounded-4 border border-secondary">
                    <img src="${product.image}" alt="${product.name}" class="product-detail-img">
                </div>
            </div>
            <div class="col-md-6">
                <div class="text-its-blue fw-bold text-uppercase small mb-2 letter-spacing-1">
                    ${product.category}
                </div>
                <h1 class="display-6 fw-bold text-white mb-3">
                    ${product.name}
                </h1>
                <div class="text-its-cyan fs-3 fw-bold mb-4">
                    ${formatRupiah(product.price)}
                </div>
                <p class="text-secondary fs-5 mb-4" style="line-height: 1.7;">
                    ${product.desc}
                </p>
                <div class="product-detail-info-box mb-4">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Stok Tersedia</span>
                        <span class="fw-bold text-white">${product.stock} pcs</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="text-muted">Pengiriman</span>
                        <span class="fw-bold text-white">Surabaya</span>
                    </div>
                </div>
                <button class="btn btn-its-blue btn-lg w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                        onclick="addToCart(${product.id})">
                    <i class="bi bi-cart-plus fs-5"></i>
                    Tambah ke Keranjang
                </button>
            </div>
        </div>
    `;
    
    navigateTo('detail');
}

// ============================================
// Cart Functions
// ============================================

/**
 * Add a product to cart
 * @param {number} productId - Product ID to add
 */
function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }
    
    saveCart();
    updateCartBadges();
    renderCartItems();
    showToast(`${product.name} masuk keranjang!`);
    
    // Open cart drawer
    const cartDrawer = document.getElementById('cartDrawer');
    if (cartDrawer) {
        const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartDrawer);
        offcanvas.show();
    }
}

/**
 * Remove an item from cart
 * @param {number} productId - Product ID to remove
 */
function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadges();
    renderCartItems();
}

/**
 * Update cart badge counts in navigation
 */
function updateCartBadges() {
    const count = getCartCount();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

/**
 * Render cart items in cart drawer
 */
function renderCartItems() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!container) return;
    
    if (state.cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty h-100">
                <div class="cart-empty-icon">🛒</div>
                <p class="mb-0">Keranjang masih kosong</p>
            </div>
        `;
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        container.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name text-white">${item.name}</div>
                    <div class="cart-item-price">${formatRupiah(item.price)} x ${item.qty}</div>
                </div>
                <div class="d-flex flex-column justify-content-between align-items-end">
                    <span class="cart-item-total">${formatRupiah(item.price * item.qty)}</span>
                    <button class="btn btn-link text-danger p-0" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        if (checkoutBtn) checkoutBtn.disabled = false;
    }
    
    if (totalElement) {
        totalElement.textContent = formatRupiah(getCartTotal());
    }
}

/**
 * Handle checkout process
 */
function handleCheckout() {
    const total = getCartTotal();
    
    if (state.cart.length === 0) {
        showToast('Keranjang kosong!');
        return;
    }
    
    if (confirm(`Total pembayaran ${formatRupiah(total)}. Lanjutkan?`)) {
        state.cart = [];
        saveCart();
        updateCartBadges();
        renderCartItems();
        
        // Close cart drawer
        const cartDrawer = document.getElementById('cartDrawer');
        if (cartDrawer) {
            const offcanvas = bootstrap.Offcanvas.getInstance(cartDrawer);
            if (offcanvas) offcanvas.hide();
        }
        
        navigateTo('success');
    }
}

// ============================================
// Admin Functions
// ============================================

/**
 * Handle admin login
 * @param {Event} e - Form submit event
 */
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email === 'admin@its.ac.id' && password === 'admin') {
        state.isAdmin = true;
        showToast('Login Admin Berhasil');
        renderAdminProducts();
        navigateTo('admin');
    } else {
        alert('Email/Password Salah! (Gunakan: admin@its.ac.id / admin)');
    }
}

/**
 * Handle admin logout
 */
function handleLogout() {
    state.isAdmin = false;
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    navigateTo('home');
    showToast('Berhasil logout');
}

/**
 * Render products table in admin dashboard
 */
function renderAdminProducts() {
    const container = document.getElementById('adminProductList');
    if (!container) return;
    
    container.innerHTML = state.products.map(product => `
        <tr>
            <td class="px-4 py-3">#${product.id}</td>
            <td class="px-4 py-3">
                <div class="d-flex align-items-center gap-3">
                    <img src="${product.image}" alt="${product.name}" 
                         class="rounded" style="width: 40px; height: 40px; object-fit: cover;">
                    <span class="fw-medium text-white">${product.name}</span>
                </div>
            </td>
            <td class="px-4 py-3">${formatRupiah(product.price)}</td>
            <td class="px-4 py-3">${product.stock}</td>
            <td class="px-4 py-3">
                <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${product.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * Delete a product (admin function)
 * @param {number} productId - Product ID to delete
 */
function deleteProduct(productId) {
    if (confirm('Hapus produk ini?')) {
        state.products = state.products.filter(p => p.id !== productId);
        saveProducts();
        renderAdminProducts();
        renderRecentProducts();
        renderAllProducts();
        showToast('Produk berhasil dihapus');
    }
}

// ============================================
// Event Listeners Setup
// ============================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Sidebar navigation links
    document.querySelectorAll('[data-view]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const view = this.getAttribute('data-view');
            navigateTo(view);
        });
    });
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// ============================================
// Application Initialization
// ============================================

/**
 * Initialize the application
 */
function init() {
    // Load data from localStorage
    loadProducts();
    loadCart();
    
    // Render initial content
    renderRecentProducts();
    renderAllProducts();
    renderCartItems();
    updateCartBadges();
    
    // Setup event listeners
    initEventListeners();
    
    // Start at home view
    navigateTo('home');
    
    console.log('myITS Merchandise initialized successfully!');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);
