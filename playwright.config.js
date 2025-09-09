const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: 2,
    workers: 2,
    reporter: [['html', { outputFolder: 'test-results' }]],
    use: {
        actionTimeout: 40 * 1000,
        navigationTimeout: 60 * 1000,
        headless: true,
        viewport: { width: 1920, height: 1080 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        launchOptions: {
            slowMo: 500,
        },
    }
});