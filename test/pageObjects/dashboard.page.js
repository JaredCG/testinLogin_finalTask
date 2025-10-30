class DashboardPage {
    /**
     * Selectors for dashboard page elements
     */
    get title() { 
        return $('.app_logo'); 
    }

    get inventoryContainer() {
        return $('#inventory_container');
    }

    get inventoryList() {
        return $('.inventory_list');
    }

    get productItems() {
        return $$('.inventory_item');
    }

    get shoppingCartBadge() {
        return $('.shopping_cart_badge');
    }

    get menuButton() {
        return $('#react-burger-menu-btn');
    }

    /**
     * Wait for dashboard to load
     */
    waitForPageLoad() {
        this.inventoryContainer.waitForDisplayed({ 
            timeout: 10000,
            timeoutMsg: 'Dashboard did not load properly'
        });
    }

    /**
     * Get header/title text
     * @returns {string} Title text
     */
    getHeaderText() {
        this.title.waitForDisplayed({ timeout: 5000 });
        return this.title.getText();
    }

    /**
     * Check if dashboard is displayed
     * @returns {boolean}
     */
    isDashboardDisplayed() {
        return this.inventoryContainer.isDisplayed();
    }

    /**
     * Get current page URL
     * @returns {string} Current URL
     */
    getCurrentUrl() {
        return browser.getUrl();
    }

    /**
     * Get number of products displayed
     * @returns {number} Count of products
     */
    getProductCount() {
        return this.productItems.length;
    }

    /**
     * Verify user is on inventory page
     * @returns {boolean}
     */
    isOnInventoryPage() {
        const url = this.getCurrentUrl();
        return url.includes('inventory.html');
    }
}

module.exports = new DashboardPage();