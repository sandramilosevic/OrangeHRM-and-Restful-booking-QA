export class LogoutPage {
    constructor(page) {
        this.page = page;
        this.userDropdown = page.locator('.oxd-userdropdown-tab');
        this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
    }

    async logout() {
        await this.userDropdown.click();
        await this.logoutLink.click();
    }
}