const BasePage = require("./base-page");
const {expect} = require("@playwright/test");

class HomePage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this._makeAppointmentBtn = page.locator('#btn-make-appointment');
        this._burgerMenuBtn = page.locator('#menu-toggle');
        this._sidebar = page.locator('#sidebar-wrapper');
    }

    async open() {
        await this.page.goto('/')
    }

    async clickMakeAppointmentBtn() {
        await this._makeAppointmentBtn.click()
    }

    async clickBurgerMenuBtn() {
        await this._burgerMenuBtn.click()
    }

    async checkSidebarOpened() {
        await expect(this._sidebar).toHaveClass('active');
    }

    async checkSidebarClosed() {
        await expect(this._sidebar).not.toHaveClass('active');
    }

}

module.exports = HomePage;
