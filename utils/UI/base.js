
// add user klasa iz admin page mozda moze

// get by role.fill
// locator.getbyText.click


/*     async resetingPassword(username) {
        await this.page.goto(urls.orangeLogin);
        await this.forgotPassword.click();
        await this.usernameField.fill(username);
        await this.resetBtn.click();*/ 

// before each
// after each

// locatore izvcu u clase 

// test za login u jedan
// asertacije u base

// await expect (page).toHaveURL(urls.orangeLogin);

// dropdownovi
// select options


export class Base{
    constructor(page){
        this.page = page;
    }
    group(label) {
        return this.page.locator('div.oxd-input-group').filter({has:this.page.getByText(label, {exact:true})})
    }
    async navigation(url){
        await this.page.goto(url);
    }
    async clickBtn(nameBtn)  {
        await this.page.getByRole('button',{ name: nameBtn, exact: true}).click();
    }
    async fillByPlaceholder(placeholder, data) {
        await this.page.getByPlaceholder(placeholder).fill(data);
    }
    async filterFill(loc1, filterText, loc2, data) {
        await this.page.locator(loc1).filter({hasText:filterText}).locator(loc2).fill(data);
    }
    async fillRole(role, field, data) {
        await this.page.getByRole(role, {name: field}).fill(data);
    }
    async fillByLabel(label, data) {
        await this.page.getByLabel(label).fill(data);
    }
    async fillInput(label, data) {
        await this.group(label).locator('input').fill(data);
    }
    async dropdown(label, optionText) {
        await this.group(label).locator('.oxd-select-text').click();
        await this.page.locator('.oxd-select-option').getByText(optionText, {exact: true}).click();
    }
    async dateInput(label, date) {
        const input = this.group(label).locator('input');
        await input.fill(date);
        await input.press('Tab');
    }
    async confirmDialog(buttonName = 'OK') {
        const dialog = this.page.getByRole('dialog');
        await dialog.waitFor({state:'visible'})
        await dialog.getByRole('button', {name:buttonName}).click()
    }
    async select(label){
        await this.page.getByLabel(label).click();
    }
}

