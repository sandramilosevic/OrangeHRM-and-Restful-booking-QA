import { test, expect } from '@playwright/test';
import { EmployeeApi } from '../../utils/UI/createEmployeeApi';
import { LeavePage } from '../../pages/UI/AssignLeavePage';
import leaveData from '../../data/UI/assignLeaveData.json';
import { daysFromToday } from '../../utils/UI/dateUtils';

test.describe('Assign Leave', () => {
    let leavePage;
    let api;

    test.beforeEach(async ({ page }) => {
        api = new EmployeeApi(page);
        leavePage = new LeavePage(page);
        await api.login();
        await api.createEmployee('Amelia', 'Brown');
    });

    test.afterEach(async () => {
        await api.cleanup();
    });

    for (const item of leaveData) {
        test(`Assign leave - ${item.testcase}`, async ({ page }) => {
            await test.step('Assigning leave', async () => {
                await leavePage.goToAssignLeave();
                await leavePage.assignLeave(item.employeeName, item.type,item.from ?? daysFromToday(item.fromOffset),daysFromToday(item.toOffset),item.partial,item.startDay);
            });

            await test.step('Check success message', async () => {
                if (item.valid) {
                    await expect(page.getByText('Successfully Saved')).toBeVisible();
                } else {
                    await expect(page.getByText('Successfully Saved')).not.toBeVisible();
                }
            });
        });
    }
});