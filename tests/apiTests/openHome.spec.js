const { test, expect } = require('@playwright/test');

test.describe('API тесты', () => {
    
    test('Проверка статус кода 200 для главной страницы', async ({ request }) => {
        console.log('Начинаем проверку статус кода 200 для главной страницы...');
        const response = await request.get('https://alacarte.world/');
        console.log('Получен ответ. Статус код:', response.status());
        console.log('URL:', response.url());
        expect(response.status()).toBe(200);
        console.log('Проверка статус кода 200 пройдена успешно!');
    });

    test('Проверка статус кода 404 для несуществующего ресурса', async ({ request }) => {
        console.log('Начинаем проверку статус кода 404...');
        const testUrl = 'https://alacarte.world/no_page_status_404';
        console.log('Запрашиваем URL:', testUrl);
        const response = await request.get(testUrl);
        console.log('Получен ответ. Статус код:', response.status());
        expect(response.status()).toBe(404);
        console.log('Проверка статус кода 404 пройдена успешно!');
    });

    test('Проверка корректных заголовков ответа', async ({ request }) => {
        console.log('Начинаем проверку заголовков ответа...');
        const response = await request.get('https://alacarte.world/');
        
        console.log('Статус код:', response.status());
        expect(response.status()).toBe(200);
        
        const contentType = response.headers()['content-type'];
        console.log('Content-Type:', contentType);
        expect(contentType).toContain('text/html');

        const headers = response.headers();
        console.log('Все заголовки ответа:', JSON.stringify(headers, null, 2));

        console.log('Проверяем наличие обязательных заголовков...');
        expect(headers).toHaveProperty('content-type');
        console.log('Content-Type: OK');
        expect(headers).toHaveProperty('date');
        console.log('Date: OK');
        expect(headers).toHaveProperty('server');
        console.log('Server: OK');

        console.log('Проверяем Cloudflare заголовки...');
        expect(headers).toHaveProperty('cf-ray');
        console.log('CF-Ray: OK');
        expect(headers).toHaveProperty('cf-cache-status');
        console.log('CF-Cache-Status: OK');

        console.log('Все проверки заголовков пройдены успешно!');
    });

    test('Проверка структуры HTML ответа', async ({ request }) => {
        console.log('Начинаем проверку структуры HTML...');
        const response = await request.get('https://alacarte.world/');
        expect(response.status()).toBe(200);
        console.log('Статус код 200 подтвержден');
        
        const responseText = await response.text();
        console.log('Длина HTML ответа:', responseText.length, 'символов');
        console.log('Первые 200 символов ответа:', responseText.substring(0, 200));

        console.log('Проверяем основные HTML теги...');
        expect(responseText).toContain('<!DOCTYPE html>');
        console.log('DOCTYPE: найден');
        expect(responseText).toContain('<html');
        console.log('HTML tag: найден');
        expect(responseText).toContain('<head');
        console.log('Head tag: найден');
        expect(responseText).toContain('<body');
        console.log('Body tag: найден');

        console.log('Проверяем содержание страницы...');
        expect(responseText).toContain('alacarte');
        console.log('Содержание "alacarte": найдено');

        console.log('Выполняем дополнительные проверки...');
        expect(responseText.length).toBeGreaterThan(1000);
        console.log('Длина HTML достаточная:', responseText.length, 'символов');

        console.log('Проверка структуры HTML пройдена успешно!');
    });
});