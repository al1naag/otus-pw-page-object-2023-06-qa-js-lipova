const BasePage = require("./base-page");
const {expect} = require("@playwright/test");

class AppointmentPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this._facilitySelect = page.locator('#combo_facility');
        this._hospotalReadmissionCheckbox = page.locator('#chk_hospotal_readmission');
        this._visitDatePicker = page.locator('#txt_visit_date');
        this._commentField = page.locator('#txt_comment');
        this._bookAppointmentBtn = page.locator('#btn-book-appointment');
        this._facility = page.locator('#facility');
        this._hospotalReadmission = page.locator('#hospital_readmission');
        this._program = page.locator('#program');
        this._visitDate = page.locator('#visit_date');
        this._comment = page.locator('#comment');
    }

    async bookAppointment(facility, program, check, day, comment) {
        await this._facilitySelect.selectOption(facility);
        check === 'Yes' ? await this._hospotalReadmissionCheckbox.check() : await this._hospotalReadmissionCheckbox.uncheck();
        await this.page.locator(program).check();
        await this._visitDatePicker.click();
        await this.page.locator(`//td[contains(text(),'${day}')]`).click();
        await this._commentField.fill(comment);
        await this._bookAppointmentBtn.click();
    }

    async verifyAppointment(facility, program, check, date, comment) {
        await expect(await this._facility.textContent()).toContain(facility);
        check === 'Yes' ? await expect(await this._hospotalReadmission.textContent()).toContain('Yes') : await expect(await this._hospotalReadmission.textContent()).toContain('No');
        await expect(await this._program.textContent()).toContain(program);
        await expect(await this._visitDate.textContent()).toContain(date);
        await expect(await this._comment.textContent()).toContain(comment);
    }
}

module.exports = AppointmentPage;
