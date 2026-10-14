import {test, expect} from '@playwright/test';
import employeeData from '../../data/UI/employeeData.json'
import {PIMPage} from '../../pages/UI/PIMPage';
import { generateEmployeeId } from '../../utils/generateEmployeeId';
import urls from '../../data/UI/urls.json';
import {LoginPage} from '../../pages/UI/LoginPage';
import loginData from '../../data/UI/loginData.json';

// function for generating unique id
const employeeId = generateEmployeeId();

let pimPage;

// TC06 uses the employee created in TC05, so tests must run in order
test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginUser(loginData.admin.username, loginData.admin.password);
    pimPage = new PIMPage(page);
});

test('TC05 - Add employee from PIM page', async({page}) => {
    // Precondition - user is logged as admin
    await pimPage.goToPIM();

    // user is redirected to PIM page
    await expect(page).toHaveURL(urls.PIM);

    // enter employee data
    await pimPage.createNewEmployee(employeeData.validEmployee.name, employeeData.validEmployee.lastName, employeeId);

    // redirected to 'Personal Details' of employee
    await expect(page).toHaveURL(/viewPersonalDetails/);
    // name and id should match name of created user
    await expect(page.locator('input[name="firstName"]')).toHaveValue(employeeData.validEmployee.name);
    await expect(page.locator('input[name="lastName"]')).toHaveValue(employeeData.validEmployee.lastName);
    await expect(page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input')).toHaveValue(employeeId);
});

test("TC06 - New employee can't have same id as an existing employee", async({page}) => {
    // Precondition - user is logged as admin
    await pimPage.goToPIM();

    // user is redirected to PIM page
    await expect(page).toHaveURL(urls.PIM);

    // enter employee data with already existing id
    await pimPage.createNewEmployee(employeeData.validEmployee.name, employeeData.validEmployee.lastName, employeeId);

    // user is not redirected
    await expect(page).toHaveURL(urls.PIMAdd);
});

test("TC07 - New employee can't have numbers only name", async({page}) => {
    // Precondition - user is logged as admin
    await pimPage.goToPIM();

    // user is redirected to PIM page
    await expect(page).toHaveURL(urls.PIM);

    // enter employee data (numeric)
    await pimPage.createNewEmployee(employeeData.numeric.name, employeeData.numeric.lastName, generateEmployeeId());

    // user is not redirected
    await expect(page).toHaveURL(urls.PIMAdd);
});

test("TC08 - Search for existing employee in PIM page by name", async({page}) => {
    // Precondition - user is logged as admin
    await pimPage.searchName(employeeData.validEmployee.name);

    // searched user is shown
    await expect(page.locator('.oxd-table-body')).toContainText(employeeData.validEmployee.name);
});

test("TC09 - Search for employee name in PIM page by number", async({page}) => {
    test.fail(true, 'B02: search by number in Employee Name returns records whose ID contains that number');
    // Precondition - user is logged as admin
    await pimPage.searchName(employeeData.numeric.name);
    await expect(page.locator('body')).toContainText('No Records Found');
})

test("TC-10 - Number of 'Record Found' should match number of records that has been founded", async({page}) => {
    // Precondition - user is logged as admin
    await pimPage.searchName(employeeData.validEmployee.name);

    // checking if number of records match 
    await pimPage.verifyRecordsFound();
});

test("TC11 - 'Employee Name' search should show suggestions for name by searched letters", async({page}) => {
    // employee name with searched letter should appear in suggestions 
    await pimPage.autocompleteSuggestion(employeeData.letter);
});