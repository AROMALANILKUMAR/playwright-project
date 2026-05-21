import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

const cred = require('../utils/login-data.json');
const dataset = require('../utils/invalid-user.json');
const invalidpass = require('../utils/invalid-pass.json');
const invalidcred = require('../utils/invalid-cred.json');

test('login - valid user', async ({ page }) => {

    const login = new LoginPage(page);

    await login.goto();
    await login.openLogin();

    await login.enterUsername(cred.username);
    await login.enterPassword(cred.password);

    await login.clickLogin();

    await login.verifyLogin(cred.username);
});

for (const data of dataset) {

    test(`invalid login - user ${data.username}`, async ({ page }) => {

        const login = new LoginPage(page);

        await login.goto();
        await login.openLogin();

        await login.handleInvalidLogin('User does not exist.');

        await login.enterUsername(data.username);
        await login.enterPassword(data.password);

        await login.clickLogin();
    });
}

for (const data of invalidpass) {

    test(`invalid login - user ${data.password}`, async ({ page }) => {

        const login = new LoginPage(page);

        await login.goto();
        await login.openLogin();

        await login.handleInvalidLogin('User does not exist.');

        await login.enterUsername(data.username);
        await login.enterPassword(data.password);

        await login.clickLogin();
    });
}

for (const data of invalidcred) {

    test(`invalid login - wrong credentials ${data.username}`, async ({ page }) => {

        const login = new LoginPage(page);

        await login.goto();
        await login.openLogin();

        await login.handleInvalidLogin('User does not exist.');

        await login.enterUsername(data.username);
        await login.enterPassword(data.password);

        await login.clickLogin();
    });
}