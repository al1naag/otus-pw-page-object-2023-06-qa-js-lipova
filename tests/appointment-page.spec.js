import { test } from '@playwright/test';
import LoginPage from "../pages/login-page";
import config from "../config/config.js";

const { username, password, comment } = config;

const facilities = [
    'Tokyo CURA Healthcare Center',
    'Hongkong CURA Healthcare Center',
    'Seoul CURA Healthcare Center',
];

const programs = [
    { selector: '#radio_program_medicare', name: 'Medicare' },
    { selector: '#radio_program_medicaid', name: 'Medicaid' },
    { selector: '#radio_program_none', name: 'None' },
];

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
const date = `${day}/${month}/${year}`;

for (const facility of facilities) {
    for (const program of programs) {
    test( `Make an Appointment in ${facility} Facility with ${program.name} program with hospital readmission`,
        async ({page}) => {
            const loginPage = new LoginPage(page);
            const appointmentPage = await loginPage.login(username, password);
            await appointmentPage.bookAppointment(facility, program.selector, 'Yes', day, comment);
            await appointmentPage.verifyAppointment(facility, program.name, 'Yes', date, comment);
            });
    };
};

for (const facility of facilities) {
    for (const program of programs) {
        test( `Make an Appointment in ${facility} Facility with ${program.name} program without hospital readmission`,
            async ({page}) => {
                const loginPage = new LoginPage(page);
                const appointmentPage = await loginPage.login(username, password);
                await appointmentPage.bookAppointment(facility, program.selector, 'No', day, comment);
                await appointmentPage.verifyAppointment(facility, program.name, 'No', date, comment);
            });
    };
};
