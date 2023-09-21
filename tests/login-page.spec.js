import {test, expect} from '@playwright/test';

const LoginPage = require('../pages/login-page');
import config from "../config/config.js";

const { username, password, fakeUsername, fakePassword  } = config;

test('Successful login with valid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillLoginForm(username, password);
    await loginPage.clickLoginBtn();
    await expect(page.url()).toMatch('#appointment');
});

test('Login with wrong password', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillLoginForm(username, fakePassword);
    await loginPage.clickLoginBtn();
    await expect(page.locator('//p[contains(text(),"Login failed! Please ensure the username and passw")]')).toBeVisible();
});


test('Login with wrong username', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillLoginForm(fakeUsername, password);
    await loginPage.clickLoginBtn();
    await expect(page.locator('//p[contains(text(),"Login failed! Please ensure the username and passw")]')).toBeVisible();
});

test('Login with empty username and password', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillLoginForm('', '');
    await loginPage.clickLoginBtn();
    await expect(page.locator('//p[contains(text(),"Login failed! Please ensure the username and passw")]')).toBeVisible();
});


