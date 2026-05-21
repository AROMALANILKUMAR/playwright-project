const { test, expect } = require('@playwright/test');
const cred = require('../utils/login-data.json')
const dataset = require('../utils/invalid-user.json')
const invalidpass = require('../utils/invalid-user.json')
const invalidcred = require('../utils/invalid-cred.json')

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com');
});



test('Sign Up', async ({ page }) => {

    await page.locator('#signin2').click();

    await page.locator('#sign-username')
        .fill('test123sdgfsertyr');

    await page.locator('#sign-password')
        .fill('pass12ye56uyr763');

    page.on('dialog', async dialog => {

        expect(dialog.message())
            .toBe('Sign up successful.');

        await dialog.accept();
    });

    await page.locator('#signInModal button:has-text("Sign up")').click();

});



test('Sign Up -close', async ({ page }) => {

    await page.locator('#signin2').click();

    await page.locator('#sign-username')
        .fill('test123sdgfsertyr');

    await page.locator('#sign-password')
        .fill('pass12ye56uyr763');

    await page.locator('#signInModal button:has-text("Close")').click();

    await expect(page.locator('#nava')).toHaveText('PRODUCT STORE');

});

test('login', async ({ page }) => {

    await page.locator('#login2').click();

    const Usernamevalue = cred.username;
    const passwordvalue = cred.password;


    await page.pause(); // 

    await page.locator('#loginusername').fill(Usernamevalue);
    await page.locator('#loginpassword').fill(passwordvalue);
    await page.locator('#logInModal button:has-text("Log in")').click();


    await page.waitForTimeout(5000);
    await expect(page.locator('#nameofuser')).toContainText(`Welcome ${Usernamevalue}`);
});


for (const creden of dataset) {

    test(`Invalid login for ${creden.username}`, async ({ page }) => {

        await page.goto('https://www.demoblaze.com/');

        await page.locator('#login2').click();

        await page.locator('#loginusername').fill(creden.username);
        await page.locator('#loginpassword').fill(creden.password);

        page.on('dialog', async dialog => {

            expect(dialog.message())
                .toBe('User does not exist.');

            await dialog.accept();
        });

        await page.locator('#logInModal button:has-text("Log in")').click();

    });

}

for (const invalid of invalidpass) {

    test(`Invalid login using wrong password with user ${invalid.username}`, async ({ page }) => {

        await page.goto('https://www.demoblaze.com/');

        await page.locator('#login2').click();

        await page.locator('#loginusername').fill(invalid.username);
        await page.locator('#loginpassword').fill(invalid.password);

        page.once('dialog', async dialog => {

            expect(dialog.message())
                .toBe('User does not exist.');

            await dialog.accept();
        });

        await page.locator('#logInModal button:has-text("Log in")').click();

    });

}

for (const invaliddata of invalidcred) {

    test(`Invalid login using wrong credentials ${invaliddata.username}`, async ({ page }) => {

        await page.goto('https://www.demoblaze.com/');

        await page.locator('#login2').click();

        await page.locator('#loginusername').fill(invaliddata.username);
        await page.locator('#loginpassword').fill(invaliddata.password);

        page.once('dialog', async dialog => {

            expect(dialog.message())
                .toBe('User does not exist.');

            await dialog.accept();
        });

        await page.locator('#logInModal button:has-text("Log in")').click();

    });

}

test('login-addproduct', async ({ page }) => {

    await page.locator('#login2').click();

    const Usernamevalue = cred.username;
    const passwordvalue = cred.password;


    await page.pause(); // 

    await page.locator('#loginusername').fill(Usernamevalue);
    await page.locator('#loginpassword').fill(passwordvalue);
    await page.locator('#logInModal button:has-text("Log in")').click();


    await page.waitForTimeout(5000);
    await expect(page.locator('#nameofuser')).toContainText(`Welcome ${Usernamevalue}`);

    await page.locator('a.hrefch', { hasText: 'Samsung galaxy s6' }).click()
    page.on('dialog', async dialog => {

        expect(dialog.message())
            .toBe('Product added.');

        await dialog.accept();
    });

    await page.locator('a.btn-success', { hasText: 'Add to cart' }).click();
});


test.only('login-purchaseconfirm', async ({ page }) => {

    await page.locator('#login2').click();

    const Usernamevalue = cred.username;
    const passwordvalue = cred.password;


    await page.pause();

    await page.locator('#loginusername').fill(Usernamevalue);
    await page.locator('#loginpassword').fill(passwordvalue);
    await page.locator('#logInModal button:has-text("Log in")').click();


    await page.waitForTimeout(5000);
    await expect(page.locator('#nameofuser')).toContainText(`Welcome ${Usernamevalue}`);

    await page.locator('#itemc', { hasText: 'Phones' }).click();

    await page.locator('a.hrefch', { hasText: 'Samsung galaxy s6' }).click()
    page.on('dialog', async dialog => {

        expect(dialog.message())
            .toBe('Product added.');

        await dialog.accept();
    });

    await page.locator('a.btn-success', { hasText: 'Add to cart' }).click();

    await page.locator('a:has-text("Home")').click()


    await page.locator('#itemc', { hasText: 'Monitors' }).click();

    await page.locator('a.hrefch', { hasText: 'Apple monitor 24' }).click()
    page.on('dialog', async dialog => {

        expect(dialog.message())
            .toBe('Product added.');

        await dialog.accept();
    });

    await page.locator('a.btn-success', { hasText: 'Add to cart' }).click();




    await page.locator('#cartur').click();
    await page.locator('//button[text()="Place Order"]').click();
    await expect(page.locator('#orderModalLabel')).toHaveText('Place order')
    await page.pause();

    await page.locator('#name').fill("Aromal");
    await page.locator('#country').fill("India");
    await page.locator('#city').fill("TVM");
    await page.locator('#card').fill("363464416");
    await page.locator('#month').fill("july");
    await page.locator('#year').fill("2026");
    await page.locator('button[onclick="purchaseOrder()"]').click();

    await expect(
        page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();

    await page.locator('.confirm', { hasText: 'OK' }).click();
    await expect(page.locator('#nameofuser')).toContainText(`Welcome ${Usernamevalue}`);
});



test('logout', async ({ page }) => {

    await page.locator('#login2').click();

    const Usernamevalue = cred.username;
    const passwordvalue = cred.password;


    await page.pause();

    await page.locator('#loginusername').fill(Usernamevalue);
    await page.locator('#loginpassword').fill(passwordvalue);
    await page.locator('#logInModal button:has-text("Log in")').click();

    await page.waitForTimeout(5000);
    await expect(page.locator('#nameofuser')).toContainText(`Welcome ${Usernamevalue}`);
    await page.locator('#logout2').click()
    await expect(page.locator('#nava')).toHaveText('PRODUCT STORE');

});
