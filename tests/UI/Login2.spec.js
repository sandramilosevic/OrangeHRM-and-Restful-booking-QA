import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/UI/LoginPage';
import urls from '../../data/UI/urls.json';
import loginData from '../../data/UI/loginData.json';

test.describe('Login', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        await page.goto(urls.orangeLogin);
        loginPage = new LoginPage(page);
    });

    for (const item of loginData) {
        test(`Login test - ${item.testcase}`, async ({ page }) => {

            await test.step('Login', async () => {
                await loginPage.loginUser(item.username, item.password);
            });

            await test.step('Assertion', async () => {
                if (item.valid) {
                    await expect(page).toHaveURL(urls.orangeDashboard);
                } else {
                    await expect(page).toHaveURL(urls.orangeLogin);
                }
            });
        });
    }
});