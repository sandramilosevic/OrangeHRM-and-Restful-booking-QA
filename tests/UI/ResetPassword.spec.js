import { test, expect } from '@playwright/test';
import {ResetPasswordPage} from '../../pages/UI/ResetPasswordPage';

test('TC20 - User can reset password', async ({ page }) => {
    const resetPassword = new ResetPasswordPage(page);
    await resetPassword.resetingPassword('ameliabr');

    await expect(page.getByText('Reset Password link sent successfully')).toBeVisible();
});