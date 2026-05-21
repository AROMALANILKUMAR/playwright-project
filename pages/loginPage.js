import { expect } from '@playwright/test';

export class LoginPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.loginlink = page.locator('#login2');
        this.usernamefield = page.locator('#loginusername');
        this.passwordfield = page.locator('#loginpassword');
        this.loginbutton = page.locator('#logInModal button:has-text("Log in")');
        this.welcometext = page.locator('#nameofuser');

        this.dialogMessage = null;
    }


    async goto() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    async openLogin() {
        await this.loginlink.click();
    }


    async enterUsername(username) {
        await this.usernamefield.fill(username);
    }


    async enterPassword(password) {
        await this.passwordfield.fill(password);
    }


    async clickLogin() {
        await this.loginbutton.click();
    }


    async verifyLogin(username) {
        await expect(this.welcometext)
            .toContainText(`Welcome ${username}`);
    }


    async handleInvalidLogin(expectedMessage) {

        this.page.once('dialog', async dialog => {

            this.dialogMessage = dialog.message();

            expect(dialog.message()).toBe(expectedMessage);

            await dialog.accept();
        });
    }
}