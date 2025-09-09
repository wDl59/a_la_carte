const { expect } = require('@playwright/test');

async function expectCount(locator, expected, description) {
    const actual = await locator.count();
    console.log(`⧗ ${description}: ожидается ${expected}, найдено ${actual}`);
    await expect(actual, description).toBe(expected);
}

module.exports = { expectCount };