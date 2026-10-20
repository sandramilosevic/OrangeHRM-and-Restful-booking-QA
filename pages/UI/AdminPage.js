import { Base } from '../../utils/UI/base';

export class AdminPage {
    constructor(page) {
        this.page = page;
        this.base = new Base(page);
    }

    async goToAdmin() {
        await this.page.getByRole('link', { name: 'Admin', exact: true }).click();
    }

    async addUser(userRole, employeeName, status, username, password) {
        await this.base.clickBtn('Add');
        await this.base.dropdown('User Role', userRole);
        await this.base.autocomplete('Employee Name', employeeName);
        await this.base.dropdown('Status', status);
        await this.base.fillInput('Username', username);
        await this.base.fillInput('Password', password);
        await this.base.fillInput('Confirm Password', password);
        await this.base.clickBtn('Save');
    }
}

  // async newUserLogin(username, password) {
  //   const login = new LoginPage(this.page);
  //   await login.loginUser(username, password);
  // }

