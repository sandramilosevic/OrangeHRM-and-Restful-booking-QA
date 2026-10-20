import urls from '../../data/UI/urls.json';
import {Base} from '../../utils/UI/base'


export class ResetPasswordPage {
    constructor(page) {
        this.page = page;
        const base = new Base(page);
        this.forgotPassword = page.getByText("Forgot your password?");
    }

    async resetingPassword(username) {
        await this.page.goto(urls.orangeLogin);
        await this.forgotPassword.click();
        base.fillTextbox('Username', username)
        base.clickBtn('Reset Password');
    }
}

