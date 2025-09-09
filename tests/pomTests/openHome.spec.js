const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/homePage');
const { HeaderMenu } = require('../../components/headerMenu');
const { FooterMenu } = require('../../components/footerMenu');

test.describe('Проверка отображения главной страницы', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    });

    test('Проверка видимости элементов страницы', async () => {
        await homePage.waitForLoad();
    });
});

test.describe('Проверка работы главной страницы', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
    });

    test('Проверка видимости всех элементов верхнего меню', async () => {
        const visibilityResults = await HeaderMenu.verifyHeaderElementsVisible(homePage.header);
        
        console.log('Видимость элементов верхнего меню:', visibilityResults);
        
        for (const [element, isVisible] of Object.entries(visibilityResults)) {
            expect(isVisible, `Элемент ${element} должен быть видим`).toBe(true);
        }
    });

    test('Проверка кликабельности всех ссылок верхнего меню', async () => {
        const clickResults = await HeaderMenu.clickAllHeaderLinks(homePage.header);
        
        console.log('Результаты кликов по ссылкам:', clickResults);
        
        for (const [link, result] of Object.entries(clickResults)) {
            expect(result, `Ссылка ${link} должна быть кликабельной`).toBe('success');
        }
    });

    test('Проверка видимости всех элементов нижнего меню', async () => {
        const visibilityResults = await FooterMenu.verifyFooterElementsVisible(homePage.footer);
        
        console.log('Видимость элементов нижнего меню:', visibilityResults);
        
        for (const [element, isVisible] of Object.entries(visibilityResults)) {
            expect(isVisible, `Элемент ${element} должен быть видим`).toBe(true);
        }
    });

    test('Проверка кликабельности всех ссылок нижнего меню', async () => {
        const clickResults = await FooterMenu.clickAllFooterLinks(homePage.footer);
        
        console.log('Результаты кликов по ссылкам:', clickResults);
        
        for (const [link, result] of Object.entries(clickResults)) {
            expect(result, `Ссылка ${link} должна быть кликабельной`).toBe('success');
        }
    });
});