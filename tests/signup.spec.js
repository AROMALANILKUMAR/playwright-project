const { test, expect } = require('@playwright/test');
const signupPage = require('../pages/signupPage')

test.only('signupfunction', async ({ page }) => {

    let ob = new signupPage(page)
    await ob.accessurl()
    await ob.signupopen()
    await ob.enterusername()
    await ob.enterpassword()
    page.on('dialog', async dialog => {

        expect(dialog.message())
            .toBe('Sign up successful.');

        await dialog.accept();
    });
    await ob.clicksignup()

})

test('closesignup-popup', async ({ page }) => {

    let ob = new signupPage(page)
    await ob.accessurl()
    await ob.clicksignup()
    await ob.enterusername()
    await ob.enterpassword()
    await ob.closesignup()
    await expect(page.locator('#nava')).toHaveText('PRODUCT STORE');
})