import { test, expect } from '@playwright/test';
import { EmployeeApi } from '../../utils/createEmployeeApi';
import { AdminPage } from '../../pages/UI/AdminPage';
import { LoginPage } from '../../pages/UI/LoginPage';
import urls from '../../data/UI/urls.json';
import userData from '../../data/UI/adminAddUser.json';

let api;

test('TC12 - Add user from Admin page', async ({ page }) => {
    const api = new EmployeeApi(page);
    try {
        await api.setup();
        await api.createEmployee('Amelia', 'Brown');

        const adminPage = new AdminPage(page);
        await adminPage.goToAdmin();
        await adminPage.addUser('ESS', 'Amelia Brown', 'Enabled', 'ameliabr', 'Ameliabrown1');

        await expect(page).toHaveURL(new RegExp(urls.adminPage));
    } finally {
      await api.deleteUserByUsername('ameliabr');  
      await api.cleanup();
    }
});

test('TC13 - Add user with existing username, but different Employee name', async ({ page }) => {
    const api = new EmployeeApi(page);
    try {
        await api.setup();
        const emp = await api.createEmployee('Amelia', 'Brown');
        await api.createUser('ameliabr', 'Ameliabrown1', emp);
        await api.createEmployee('Urmila', 'Bagul', 'Sagar');

        const adminPage = new AdminPage(page);
        await adminPage.goToAdmin();
        await adminPage.addUser('ESS', 'Urmila Sagar Bagul', 'Enabled', 'ameliabr', 'Ameliabrown1');

        await expect(page.locator('.oxd-input-field-error-message')).toContainText('Already exists');
    } finally {
        await api.cleanup();
    }
});

test('TC14 - Add user with admin role from Admin page', async ({ page }) => {
    const api = new EmployeeApi(page);
    try {
        await api.login();
        await api.deleteUserByUsername(userData.adminRole.username);
        await api.createEmployee('Amelia', 'Brown');

        const adminPage = new AdminPage(page);
        await adminPage.goToAdmin();
        await adminPage.addUser(
            userData.adminRole.userRole,
            'Amelia Brown',
            userData.adminRole.status,
            userData.adminRole.username,
            userData.adminRole.password
        );

        await expect(page).toHaveURL(new RegExp(urls.adminPage));
        await expect(page.getByText(userData.adminRole.username)).toBeVisible();
    } finally {
        await api.deleteUserByUsername(userData.adminRole.username);
        await api.cleanup();
    }
});

test('TC15 - Login as created user', async ({ page, browser }) => {
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const api = new EmployeeApi(adminPage);

    try {
        await api.login();
        const emp = await api.createEmployee('Amelia', 'Brown');
        await api.createUser('ameliabr', 'Ameliabrown1', emp);

        const login = new LoginPage(page);
        await login.loginUser('ameliabr', 'Ameliabrown1');
        await expect(page).toHaveURL(/dashboard/);
    } finally {

        await api.cleanup();
        await adminContext.close();
    }
});

test('TC16 - Login as created admin', async ({ page, browser }) => {
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const api = new EmployeeApi(adminPage);

    try {
        await api.login();
        await api.deleteUserByUsername(userData.adminRole.username);
        const emp = await api.createEmployee('Amelia', 'Brown');
        await api.createUser(userData.adminRole.username, userData.adminRole.password, emp, 1);   // 1 = Admin

        const login = new LoginPage(page);
        await login.loginUser(userData.adminRole.username, userData.adminRole.password);
        await expect(page).toHaveURL(urls.orangeDashboard);
    } finally {
        try {
            await api.cleanup();
        } finally {
            await adminContext.close();
        }
    }
});