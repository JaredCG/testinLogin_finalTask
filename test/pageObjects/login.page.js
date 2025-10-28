export default class LoginPage {
    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }
    get btnLogin() { return $('#login-button'); }
    get errorMsg() { return $('h3[data-test="error"]'); }

    async open() {
        await browser.url('/');
    }

    async login(username, password) {
        if (username) await this.inputUsername.setValue(username);
        if (password) await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }
}
