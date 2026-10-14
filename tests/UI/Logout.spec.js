import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/UI/LoginPage';
import { LogoutPage } from '../../pages/UI/LogoutPage';
import urls from '../../data/UI/urls.json';
import userData from '../../data/UI/loginData.json';

test('TC19 - User can successfully logout', async ({ page }) => {
    // login
    const loginPage = new LoginPage(page);
    await loginPage.loginUser(userData.admin.username, userData.admin.password);
    await expect(page).toHaveURL(/dashboard/);

    const logoutPage = new LogoutPage(page);
    await logoutPage.logout();

    // redirected to login page
    await expect(page).toHaveURL(urls.orangeLogin);
});