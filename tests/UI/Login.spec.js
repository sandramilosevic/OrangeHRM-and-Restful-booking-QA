import { test, expect } from '@playwright/test';
import {LoginPage} from '../../pages/UI/LoginPage';
import urls from '../../data/UI/urls.json'
import userData from '../../data/UI/loginData.json'

test("TC01 - Login page loads successfully", async({page}) => {
    await page.goto(urls.orangeLogin);
    await expect(page).toHaveURL(urls.orangeLogin);
});

test("TC02 - User can login with valid credentials", async({page}) =>{
    const login = new LoginPage(page);
    await login.loginUser(userData.admin.username, userData.admin.password);

    // user is redirected to dashboard
    await expect(page).toHaveURL(urls.orangeDashboard);
});
test("TC 03 - User can't login with invalid credentials", async({page}) => {
    const login = new LoginPage(page);
    await login.loginUser(userData.invalid.username, userData.invalid.password);

    // user is not redirected
    await expect (page).toHaveURL(urls.orangeLogin);
});

test("TC 04 -User can't login without password", async({page}) => {
    const login = new LoginPage(page);
    await login.loginUser(userData.loginWithoutPassword.username, userData.loginWithoutPassword.password)
    // user is not redirected
    await expect (page).toHaveURL(urls.orangeLogin);
});

