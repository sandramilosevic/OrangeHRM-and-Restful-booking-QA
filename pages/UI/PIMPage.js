const { expect } = require('@playwright/test');

export class PIMPage {
    constructor(page) {
        this.page = page;
        this.liPIM = page.getByRole('link', { name: 'PIM' });
        this.addBtn = page.getByRole('button', { name: 'Add' });
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.employeeId = page.locator('div.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
        this.saveBtn = page.getByRole('button', { name: 'Save' });
        this.searchEmployeeName = page.getByPlaceholder('Type for hints...').first();
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.tableRows = page.locator('.oxd-table-body [role="row"]');
        this.recordFound = page.getByText(/\(\d+\) Records? Found/);
        this.autocompleteAfter = page.locator('.oxd-autocomplete-dropdown');
    }

    async goToPIM() {
        await this.liPIM.click();
    }

    async createNewEmployee(name, lastName, id) {
        await this.goToPIM();
        await this.addBtn.click();
        await this.firstName.fill(name);
        await this.lastName.fill(lastName);
        await this.employeeId.fill(id);
        await this.saveBtn.click();
    }

    async searchName(employeeName) {
        await this.goToPIM();
        await this.searchEmployeeName.fill(employeeName);
        await this.searchBtn.click();
    }

async verifyRecordsFound() {
    // wait for the result counter to appear
    await expect(this.recordFound).toBeVisible();

    // retry until the number in the counter matches the number of rows
    await expect(async () => {
        const text = await this.recordFound.textContent();
        const total = parseInt(text.match(/\((\d+)\)/)[1], 10);
        const rowCount = await this.tableRows.count();
        expect(rowCount).toBe(total);
    }).toPass({ timeout: 10000 });
}
    async autocompleteSuggestion(letter) {
        await this.goToPIM();
        await this.searchEmployeeName.pressSequentially(letter);

        // only real suggestions, not the "Searching...." or "No Records Found" placeholders
        const options = this.page.locator('.oxd-autocomplete-option')
            .filter({ hasNotText: /Searching|No Records Found/ });
        await expect(options.first()).toBeVisible();

        // every suggested name must contain the typed letter (case-insensitive)
        const names = await options.allTextContents();
        for (const name of names) {
            expect(name.toLowerCase()).toContain(letter.toLowerCase());
    }
}}