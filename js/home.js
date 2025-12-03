/**
 * myITS Merchandise - Home Page Logic
 * Handles home page specific functionality
 */

/**
 * Render recent products (first 4) on home page
 */
function renderRecentProducts() {
    const container = document.getElementById('recentProducts');
    if (!container) return;
    
    const recentProducts = Products.getRecent();
    container.innerHTML = recentProducts.map(createProductCardHTML).join('');
}

/**
 * Initialize home page
 */
function initHomePage() {
    renderRecentProducts();
    console.log('Home page initialized');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initHomePage);
