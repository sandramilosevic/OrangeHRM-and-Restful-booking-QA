import { test, expect } from '@playwright/test';
import {ResetPasswordPage} from '../../pages/UI/ResetPasswordPage';

test('TC20 - User can reset password', async ({ page }) => {
    const resetPassword = new ResetPasswordPage(page);

    // entering username in 'Username' field and clicking button to reset password
    await resetPassword.resetingPassword('ameliabr');

    // successfull message should appear
    await expect(page.getByText('Reset Password link sent successfully')).toBeVisible();
});