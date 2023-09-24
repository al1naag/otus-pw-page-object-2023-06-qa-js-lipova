import {test, expect} from '@playwright/test';

const HomePage = require('../pages/home-page');


test('Open the Main Page', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(page.locator('//h1[normalize-space()="CURA Healthcare Service"]')).toBeVisible();
});

test('Burger menu can be opened', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.toggleSidebarMenu();
    await homePage.checkSidebarOpened();
});

test('Burger menu can be closed', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.toggleSidebarMenu();
    await homePage.toggleSidebarMenu();
    await homePage.checkSidebarClosed();
});


test('Open the login form', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.clickMakeAppointmentBtn();
    await expect(page.url()).toMatch('#login');
    await expect(page.locator('//h2[normalize-space()="Login"]')).toBeVisible();
});


