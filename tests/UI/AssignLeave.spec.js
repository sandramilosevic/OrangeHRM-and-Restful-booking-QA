import { test, expect } from '@playwright/test';
import { EmployeeApi } from '../../utils/UI/createEmployeeApi';
import { LeavePage } from '../../pages/UI/AssignLeavePage';
import leaveData from '../../data/UI/assignLeaveData.json';
import { daysFromToday } from '../../utils/UI/dateUtils';

test('TC17 - Assign leave with valid date successfully creates new leave record', async ({ page }) => {
    // Precondition - logged in as admin, employee already exist in the system
    const api = new EmployeeApi(page);
    try {
        await api.login();
        // creating user with api request
        await api.createEmployee('Amelia', 'Brown');

        // assigning leave with valid date (from:today to: tommorow)
        const leavePage = new LeavePage(page);
        await leavePage.goToAssignLeave();
        await leavePage.assignLeave(
            leaveData.validDate.employeeName,
            leaveData.validDate.type,
            daysFromToday(0),
            daysFromToday(1),
            leaveData.validDate.partial,
            leaveData.validDate.startDay
        );
        // successfull message should appear
        await expect(page.getByText('Successfully Saved')).toBeVisible({ timeout: 15000 });
    } finally {
        await api.cleanup();
    }
});

test('TC18 - Assign leave with invalid date shows error', async ({ page }) => {
    // Precondition - logged in as admin, employee name already exist in the system
    const api = new EmployeeApi(page);
    try {
        await api.login();
        // creating user with api request
        await api.createEmployee('Amelia', 'Brown');

        // assinging leave with invalid date (from: 1976-01-01 to: today)
        const leavePage = new LeavePage(page);
        await leavePage.goToAssignLeave();
        await leavePage.assignLeave(
            leaveData.invalidDate.employeeName,
            leaveData.invalidDate.type,
            leaveData.invalidDate.from,
            daysFromToday(0),
            leaveData.invalidDate.partial,
            leaveData.invalidDate.startDay
        );

        await expect(page.getByText('Successfully Saved')).not.toBeVisible({ timeout: 15000 });
    } finally {
        await api.cleanup();
    }
});