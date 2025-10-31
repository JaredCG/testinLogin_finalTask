const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pageObjects/login.page');
const DashboardPage = require('../pageObjects/dashboard.page');
const testData = require('../data/credentials.json');

// GIVEN Steps
Given(/^I open the SauceDemo login page$/, () => {
    LoginPage.open();
});

// WHEN Steps
//UC-1
When(/^I enter "([^"]*)" in the Username field$/, (username) => {
    LoginPage.inputUsername.setValue(username);
});

When(/^I enter "([^"]*)" in the Password field$/, (password) => {
    LoginPage.inputPassword.setValue(password);
});

/**
 * UC-1: Clear both username and password fields
 */
/* When(/^I clear the inputs$/, () => {
    LoginPage.clearUsername();
    LoginPage.clearPassword();
}); */

When(/^I click the Login button$/, () => {
    LoginPage.clickLogin();
});

When(/^I clear the Password field$/, () => {
    LoginPage.clearPassword();
});

When(/^I clear the Username field$/, () => {
    LoginPage.clearUsername();
});
//UC-3
When(/^I enter valid credentials$/, () => {
    const { username, password } = testData.validUser;
    LoginPage.login(username, password);
});

When(/^I enter credentials from accepted username sections$/, (dataTable) => {
    const credentials = dataTable.hashes()[0];
    
    // Ingresar username
    LoginPage.inputUsername.waitForDisplayed({ timeout: 5000 });
    LoginPage.inputUsername.clearValue();
    LoginPage.inputUsername.setValue(credentials.username);
    
    // Ingresar password
    LoginPage.inputPassword.waitForDisplayed({ timeout: 5000 });
    LoginPage.inputPassword.clearValue();
    LoginPage.inputPassword.setValue(credentials.password);
    
    // Pausa pequeña para asegurar que se ingresaron los valores
    browser.pause(500);
});

// THEN Steps
//UC-1 | UC-2
Then(/^I should see the error message "([^"]*)"$/, async (expectedMessage) => {
    await expect(LoginPage.errorMsg).toBeDisplayed();
    await expect(LoginPage.errorMsg).toHaveTextContaining(expectedMessage);
});
//UC-3
Then(/^I should see the dashboard with title "([^"]*)"$/, async (expectedTitle) => {
    // Esperar a que la página cargue completamente
    DashboardPage.waitForPageLoad();    
    // Esperar explícitamente por el elemento del título
    await DashboardPage.title.waitForDisplayed({ timeout: 10000 });    
    // Obtener el texto y validar
    const actualTitle = await DashboardPage.title.getText();
    expect(actualTitle).toEqual(expectedTitle);
    // Primero verificar que la URL cambió
    await browser.waitUntil(
        async () => {
            const url = await browser.getUrl();
            console.log('URL actual:', url);
            return url.includes('inventory.html');
        },
        { 
            timeout: 15000, 
            timeoutMsg: 'La URL no cambió a inventory.html - el login puede haber fallado'
        }
    );
    
    console.log('✅ URL correcta: inventory.html');
    
    // Ahora esperar por el título con un selector más robusto
    const titleElement = await $('.app_logo');
    await titleElement.waitForDisplayed({ 
        timeout: 15000,
        timeoutMsg: 'El elemento .app_logo no apareció en el dashboard'
    });
});

Then(/^the page URL should contain "([^"]*)"$/, async (urlPart) => {
    // Esperar hasta que la URL cambie y contenga la parte esperada
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes(urlPart),
        /* async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes(urlPart);
        }, */
        {
            timeout: 15000,
            timeoutMsg: `Expected URL to contain "${urlPart}"`
        }
    );
    
    // Verificación adicional
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(urlPart);
});

Then(/^I should be on the inventory page$/, async () => {
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('inventory.html');
});