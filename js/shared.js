/**
 * myITS Merchandise - Shared Functions
 * Common utilities, navbar, cart drawer, toast for all pages
 */

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
 * Get current page name from URL
 * @returns {string} Current page name (e.g., 'home', 'catalog', 'product-detail')
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page === 'index' ? 'home' : page;
}

// ============================================
// Toast Notifications
// ============================================

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast ('success', 'error', 'info')
 */
function showToast(message, type = 'success') {
    const toastMessage = document.getElementById('toastMessage');
    const toastElement = document.getElementById('mainToast');

    if (toastMessage && toastElement) {
        toastMessage.textContent = message;
        
        // Update toast color based on type
        toastElement.classList.remove('bg-its-blue', 'bg-danger', 'bg-warning');
        if (type === 'error') {
            toastElement.classList.add('bg-danger');
        } else if (type === 'info') {
            toastElement.classList.add('bg-warning');
        } else {
            toastElement.classList.add('bg-its-blue');
        }
        
        const toast = bootstrap.Toast.getOrCreateInstance(toastElement, {
            animation: true,
            autohide: true,
            delay: 3000
        });
        toast.show();
    }
}

// ============================================
// Cart Functions
// ============================================

/**
 * Update cart badge counts in navigation
 */
function updateCartBadges() {
    const count = Cart.getCount();
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
    const cart = Cart.get();

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty h-100">
                <div class="cart-empty-icon">🛒</div>
                <p class="mb-0">Keranjang masih kosong</p>
            </div>
        `;
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        container.innerHTML = cart.map(item => `
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
        totalElement.textContent = formatRupiah(Cart.getTotal());
    }
}

/**
 * Add a product to cart (shared across pages)
 * @param {number} productId - Product ID to add
 */
function addToCart(productId) {
    const product = Products.getById(productId);
    if (!product) return;

    Cart.add(product);
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
    Cart.remove(productId);
    updateCartBadges();
    renderCartItems();
}

/**
 * Handle checkout process
 */
function handleCheckout() {
    const total = Cart.getTotal();
    const cart = Cart.get();

    if (cart.length === 0) {
        showToast('Keranjang kosong!', 'error');
        return;
    }

    if (confirm(`Total pembayaran ${formatRupiah(total)}. Lanjutkan?`)) {
        Cart.clear();
        updateCartBadges();
        renderCartItems();

        // Close cart drawer
        const cartDrawer = document.getElementById('cartDrawer');
        if (cartDrawer) {
            const offcanvas = bootstrap.Offcanvas.getInstance(cartDrawer);
            if (offcanvas) offcanvas.hide();
        }

        // Navigate to success page
        window.location.href = 'checkout-success.html';
    }
}

// ============================================
// Navigation Helpers
// ============================================

/**
 * Update sidebar/navbar active state based on current page
 */
function updateActiveNavState() {
    const currentPage = getCurrentPage();
    
    // Map page names for active state
    const pageMap = {
        'product-detail': 'catalog',
        'admin-dashboard': 'login',
        'checkout-success': 'home'
    };
    
    const activePage = pageMap[currentPage] || currentPage;
    
    // Remove active class from all sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to matching links
    document.querySelectorAll(`[data-page="${activePage}"]`).forEach(link => {
        link.classList.add('active');
    });
}

/**
 * Navigate back - uses history.back() or fallback to catalog
 */
function goBack() {
    if (document.referrer && 
        (document.referrer.includes('catalog.html') || 
         document.referrer.includes('index.html') ||
         document.referrer.includes(window.location.host))) {
        window.history.back();
    } else {
        window.location.href = 'catalog.html';
    }
}

// ============================================
// Product Card Rendering
// ============================================

/**
 * Create HTML for a product card with link to detail page
 * @param {Object} product - Product object
 * @returns {string} HTML string for product card
 */
function createProductCardHTML(product) {
    // Validate product.id is a safe integer
    const productId = parseInt(product.id, 10);
    if (isNaN(productId) || productId < 0) {
        console.error('Invalid product ID:', product.id);
        return '';
    }
    
    // Escape HTML entities in text content
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    
    const safeName = escapeHtml(product.name);
    const safeCategory = escapeHtml(product.category);
    
    return `
        <div class="col-12 col-sm-6 col-md-4 col-xl-3">
            <div class="product-card" onclick="window.location.href='product-detail.html?id=${productId}'">
                <div class="position-relative">
                    <img src="${escapeHtml(product.image)}" alt="${safeName}" class="product-card-img" loading="lazy">
                    <span class="stock-badge">Stok: ${parseInt(product.stock, 10)}</span>
                </div>
                <div class="product-card-body">
                    <small class="text-muted">${safeCategory}</small>
                    <h5 class="text-white fs-6 fw-medium mt-1 mb-1 text-truncate" title="${safeName}">
                        ${safeName}
                    </h5>
                    <div class="text-its-cyan fw-semibold fs-5 mb-3">
                        ${formatRupiah(product.price)}
                    </div>
                    <button class="btn btn-outline-secondary btn-add-cart w-100 d-flex align-items-center justify-content-center gap-2" 
                            onclick="event.stopPropagation(); addToCart(${productId})">
                        <i class="bi bi-cart-plus"></i>
                        Tambah
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// Shared Initialization
// ============================================

/**
 * Initialize shared components (cart, badges, nav state)
 */
function initShared() {
    // Update cart badges
    updateCartBadges();
    
    // Render cart items
    renderCartItems();
    
    // Update active nav state
    updateActiveNavState();
    
    console.log('myITS Merchandise - Shared components initialized');
}

// Run shared initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initShared);
