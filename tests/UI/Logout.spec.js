import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/UI/LoginPage';
import { LogoutPage } from '../../pages/UI/LogoutPage';
import urls from '../../data/UI/urls.json';

test('TC19 - User can successfully logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser('Admin', 'admin123');
    await expect(page).toHaveURL(/dashboard/);

    const logoutPage = new LogoutPage(page);
    await logoutPage.logout();

    await expect(page).toHaveURL(urls.orangeLogin);
});