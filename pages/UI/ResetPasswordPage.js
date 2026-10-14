import urls from '../../data/UI/urls.json';

export class ResetPasswordPage {
    constructor(page) {
        this.page = page;
        this.forgotPassword = page.getByText("Forgot your password?");
        this.usernameField = page.getByRole('textbox', {name:'Username'})
        this.resetBtn = page.getByRole('button', { name: 'Reset Password' });
    }

    async resetingPassword(username) {
        await this.page.goto(urls.orangeLogin);
        await this.forgotPassword.click();
        await this.usernameField.fill(username);
        await this.resetBtn.click();
    }
}

