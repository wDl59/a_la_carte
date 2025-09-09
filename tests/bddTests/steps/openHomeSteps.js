const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../../../pages/homePage');
const { HeaderMenu } = require('../../../components/headerMenu');
const { FooterMenu } = require('../../../components/footerMenu');

Given('Я нахожусь на главной странице', async function () {
    this.homePage = new HomePage(this.page);
    await this.homePage.navigate();
});

Then('Все элементы страницы должны быть видимы', async function () {
    await this.homePage.waitForLoad();
});

When('Я кликаю по всем ссылкам верхнего меню', async function () {
    this.clickResults = await HeaderMenu.clickAllHeaderLinks(this.homePage.header);
});

When('Я кликаю по всем ссылкам нижнего меню', async function () {
    this.clickResults = await FooterMenu.clickAllFooterLinks(this.homePage.footer);
});

Then('Все ссылки должны быть кликабельны', async function () {
    for (const [link, result] of Object.entries(this.clickResults)) {
        expect(result, `Ссылка ${link} должна быть кликабельной`).toBe('success');
    }
});