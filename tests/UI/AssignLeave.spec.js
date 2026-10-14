import { test, expect } from '@playwright/test';
import { EmployeeApi } from '../../utils/createEmployeeApi';
import { LeavePage } from '../../pages/UI/AssignLeavePage';
import leaveData from '../../data/UI/assignLeaveData.json';
import { daysFromToday } from '../../utils/dateUtils';

test('TC17 - Assign leave with valid date successfully creates new leave record', async ({ page }) => {
    const api = new EmployeeApi(page);
    try {
        await api.login();
        await api.createEmployee('Amelia', 'Brown');

        const leavePage = new LeavePage(page);
        await leavePage.goToAssignLeave();
        await leavePage.assignLeave(
            'Amelia Brown',
            leaveData.validDate.type,
            daysFromToday(0),
            daysFromToday(1),
            leaveData.validDate.partial,
            leaveData.validDate.startDay
        );

        await expect(page.getByText('Successfully Saved')).toBeVisible({ timeout: 15000 });
    } finally {
        await api.cleanup();
    }
});

test('TC18 - Assign leave with invalid date shows error', async ({ page }) => {
    const api = new EmployeeApi(page);
    try {
        await api.login();
        await api.createEmployee('Amelia', 'Brown');

        const leavePage = new LeavePage(page);
        await leavePage.goToAssignLeave();
        await leavePage.assignLeave(
            'Amelia Brown',
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