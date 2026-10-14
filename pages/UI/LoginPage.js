import urls from '../../data/UI/urls.json';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginBtn = page.getByRole('button', {name: 'Login'});
    }
    async loginUser(username, password) {
        await this.page.goto(urls.orangeLogin);
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click()
    }
}

