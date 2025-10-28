import { Given, When, Then, expect } from '@wdio/globals';
import LoginPage from '../pageObjects/login.page.js';
import DashboardPage from '../pageObjects/dashboard.page.js';
import creds from '../data/credentials.json' with { type: 'json' };

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

Given('I open the SauceDemo login page', async () => {
    await loginPage.open();
});

When('I click the Login button', async () => {
    await loginPage.btnLogin.click();
});

When(/^I enter "([^"]*)" in the Username field$/, async (username) => {
    await loginPage.inputUsername.setValue(username);
});

When('I enter valid credentials', async () => {
    await loginPage.login(creds.validUser.username, creds.validUser.password);
});

Then(/^I should see the error message "([^"]*)"$/, async (msg) => {
    await loginPage.errorMsg.waitForDisplayed({ timeout: 5000 });
    await expect(loginPage.errorMsg).toHaveTextContaining(msg);
});

Then(/^I should see the dashboard with title "([^"]*)"$/, async (title) => {
    await dashboardPage.title.waitForDisplayed({ timeout: 5000 });
    await expect(dashboardPage.title).toHaveTextContaining(title);
});
