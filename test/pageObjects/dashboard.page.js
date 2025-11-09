class DashboardPage {
    //Selectors for dashboard page elements
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

    //Wait for dashboard to load
    async waitForPageLoad() {
        await this.inventoryContainer.waitForDisplayed({ 
            timeout: 15000,
            timeoutMsg: 'Dashboard did not load properly'
        });
        await this.title.waitForDisplayed({ 
            timeout: 10000,
            timeoutMsg: 'Dashboard title did not appear'
         });
    
        // Pausa adicional de seguridad
        await browser.pause(1000);
    }

    /**
     * Get header/title text
     * @returns {string} Title text
     */
    async getHeaderText() {
        await this.title.waitForDisplayed({ timeout: 5000 });
        return await this.title.getText();
    }

    /**
     * Check if dashboard is displayed
     * @returns {boolean}
     */
    async isDashboardDisplayed() {
        return await this.inventoryContainer.isDisplayed();
    }

    /**
     * Get current page URL
     * @returns {string} Current URL
     */
    async getCurrentUrl() {
        return await browser.getUrl();
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
    async isOnInventoryPage() {
        const url = await this.getCurrentUrl();
        return url.includes('inventory.html');
    }
}

module.exports = new DashboardPage();