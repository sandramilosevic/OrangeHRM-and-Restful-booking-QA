import { test, expect } from '@playwright/test';
import urls from '../../data/API/urls.json';
import loginData from '../../data/API/loginData.json';

test('TC01 - User login as admin successfully with valid credentials', async ({ request }) => {
    // url - /auth, method - POST
    const response = await request.post(urls.login, { data: loginData, headers:{"Content-Type":"application/json"} });

    // response status should be 200 OK
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});