const AppointmentPage = require('../pages/appointment-page');

class LoginPage {
    constructor(page) {
        this.page = page;
        this._inputUserName = page.locator('#txt-username');
        this._inputPassword = page.locator('#txt-password');
        this._loginBtn = page.locator('#btn-login');
    }

    async open() {
        await this.page.goto('/profile.php#login')
    }

    async fillLoginForm(username, password) {
        await this._inputUserName.fill(username);
        await this._inputPassword.fill(password);
    };

    async clickLoginBtn() {
        await this._loginBtn.click();
        return new AppointmentPage(this.page);
    };

    async login(username, password) {
        await this.open();
        await this.fillLoginForm(username, password);
        await this.clickLoginBtn();
        return new AppointmentPage(this.page);
    };

}

module.exports = LoginPage;
