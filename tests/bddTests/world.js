const { setDefaultTimeout, setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }
}

setDefaultTimeout(60 * 1000);
setWorldConstructor(CustomWorld);

Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function () {
    await this.page.close();
    await this.browser.close();
});
