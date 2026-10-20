import { test, expect } from '@playwright/test';
import { EmployeeApi } from '../../utils/UI/createEmployeeApi';
import { AdminPage } from '../../pages/UI/AdminPage';
import { LoginPage } from '../../pages/UI/LoginPage';
import urls from '../../data/UI/urls.json';
import userData from '../../data/UI/adminAddUser.json';
import addUser from '../../data/UI/adminAddUser.json';

let api;

test.beforeEach('Create Employee', async({page}) => {
    const api = new EmployeeApi(page);
    await api.setup();
    await api.createEmployee('Amelia', 'Brown');
    const adminPage = new AdminPage(page);
});

test.afterAll('Clear', async({page}) => {
    await api.deleteUserByUsername(userData.adminRole.username);
    await api.cleanup();
})

test('TC12 - Add user from Admin page', async ({ page }) => {
    // Precondition - user is logged as admin, employee should be already created throught 'PIM'page

        await adminPage.goToAdmin();

        // adding user from admin page
        await adminPage.addUser(addUser.validUser.userRole, addUser.validUser.employeeName, addUser.validUser.status, addUser.validUser.username, addUser.validUser.password);

        await expect(page).toHaveURL(new RegExp(urls.adminPage));
});

test('TC13 - Add user with existing username, but different Employee name', async ({ page }) => {
    // Preconditon - user is logged in as admin, username is already in the system
    const api = new EmployeeApi(page);

        await api.createUser('ameliabr', 'Ameliabrown1', emp);
        await api.createEmployee('Urmila', 'Bagul', 'Sagar');

        // creating user throught admin page with existing username, but new name
        const adminPage = new AdminPage(page);
        await adminPage.goToAdmin();
        await adminPage.addUser('ESS', 'Urmila Sagar Bagul', 'Enabled', 'ameliabr', 'Ameliabrown1');

        await expect(page.locator('.oxd-input-field-error-message')).toContainText('Already exists');
    }
);

test('TC14 - Add user with admin role from Admin page', async ({ page }) => {
    // Precondition - user is logged in as admin, employee should be already created through 'PIM'page

        await api.createEmployee('Amelia', 'Brown');

        // creating new user with admin role throught 'Admin' page
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
    });

test('TC15 - Login as created user', async ({ page, browser }) => {
    // Precondition - user is created by admin
    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const api = new EmployeeApi(adminPage);

    try {
        // before - creating user with api request
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

        // login as created admin user
        const emp = await api.createEmployee('Amelia', 'Brown');
        await api.createUser(userData.adminRole.username, userData.adminRole.password, emp, 1);   // 1 = Admin

        const login = new LoginPage(page);
        await login.loginUser(userData.adminRole.username, userData.adminRole.password);
        await expect(page).toHaveURL(urls.orangeDashboard);

        await adminContext.close(); 
});