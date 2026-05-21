class signupPage {
    constructor(page) {
        this.page = page
        this.signuplink = page.locator('#signin2')
        this.usernamefield=page.locator('#sign-username')
        this.passwordfield = page.locator('#sign-password')
        this.signupbutton=page.locator('#signInModal button:has-text("Sign up")')
        this.closebutton=page.locator('#signInModal button:has-text("Close")')
    }

    async accessurl() {
        await this.page.goto('https://www.demoblaze.com');
        return this;
    }

    async signupopen() {
        await this.signuplink.click();
          return this;
    }

    async enterusername() {
        await this.usernamefield.fill('test123sdgfsertyr');
          return this;
    }
    async enterpassword() {
        await this.passwordfield.fill('pass12ye56uyr763');
          return this;

    }

    async clicksignup() {
        await this.signupbutton.click();
          return this;
    }

    async closesignup() {
        await this.closebutton.click();
           return this;

    }
}

module.exports = signupPage




// await page.locator('#signin2').click();

// await page.locator('#sign-username')
//     .fill('test123sdgfsertyr');

// await page.locator('#sign-password')
//     .fill('pass12ye56uyr763');

// await page.locator('#signInModal button:has-text("Close")').click();






