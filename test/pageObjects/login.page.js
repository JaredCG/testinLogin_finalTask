class LoginPage {
    //Selectors for login page elements
    get inputUsername() { 
        return $('#user-name'); 
    }
    
    get inputPassword() { 
        return $('#password'); 
    }
    
    get btnLogin() { 
        return $('#login-button'); 
    }
    
    get errorMsg() { 
        return $('h3[data-test="error"]'); 
    }

    get errorButton() {
        return $('.error-button');
    }

    get loginContainer() {
        return $('.login_container');
    }

    //Navigate to login page
    open() {
        browser.url('/');
        browser.waitUntil(() => this.loginContainer.isDisplayed(), {
            timeout: 10000,
            timeoutMsg: 'Login page did not load'
        });
    }

    /**
     * Perform login action
     * @param {string} username - Username to enter
     * @param {string} password - Password to enter
     */
    login(username, password) {
        if (username) {
            this.inputUsername.waitForDisplayed({ timeout: 5000 });
            this.inputUsername.clearValue(); // Limpiar primero
            this.inputUsername.setValue(username);
        }
        if (password) {
            this.inputPassword.waitForDisplayed({ timeout: 5000 });
            this.inputPassword.clearValue(); // Limpiar primero
            this.inputPassword.setValue(password);
        }
        
        // Pequeña pausa para asegurar que los valores están listos
        browser.pause(500);
    }

    /**
     * Click login button
     */
    clickLogin() {
        this.btnLogin.waitForClickable({ timeout: 5000 });
        this.btnLogin.click();
        browser.pause(1000);
    }

    /**
     * Clear username field
     */
    clearUsername() {
        this.inputUsername.waitForDisplayed({ timeout: 5000 });
        this.inputUsername.clearValue();
        /* this.inputUsername.click();
        browser.keys(['Control', 'a']); // Seleccionar todo (Cmd+a en Mac)
        browser.keys('Backspace'); */
    }

    /**
     * Clear password field
     */
    clearPassword() {
        this.inputPassword.waitForDisplayed({ timeout: 5000 });
        this.inputPassword.clearValue();
        /* this.inputPassword.click();
        browser.keys(['Control', 'a']); // Seleccionar todo
        browser.keys('Backspace'); */
    }

    /**
     * Get error message text
     * @returns {string} Error message
     */
    getErrorMessage() {
        this.errorMsg.waitForDisplayed({ timeout: 5000 });
        return this.errorMsg.getText();
    }

    /**
     * Check if error message is displayed
     * @returns {boolean}
     */
    isErrorDisplayed() {
        return this.errorMsg.isDisplayed();
    }
}
module.exports = new LoginPage();