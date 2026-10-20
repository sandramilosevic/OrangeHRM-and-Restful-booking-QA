import { expect } from "@playwright/test";
import { Base } from "../../utils/UI/base";

export class PIMPage {
    constructor(page) {
        this.page = page;
        this.base = new Base(this.page);

        this.searchEmployeeName = this.page.getByLabel("Employee Name");
        this.tableRows = this.page.locator(".oxd-table-body .oxd-table-card");
        this.recordFound = this.page.getByText(/\(\d+\) Records? Found/);
        this.options = this.page
            .locator(".oxd-autocomplete-option")
            .filter({ hasNotText: /Searching|No Records Found/ });
    }

    async createNew(name, lastName, id) {
        await this.base.clickBtn("Add");
        await this.base.fillByPlaceholder("First Name", name);
        await this.base.fillByPlaceholder("Last Name", lastName);
        await this.base.fillInput("Employee Id", id);
        await this.base.clickBtn("Save");
    }

    async searchName(employeeName) {
        await this.base.fillByLabel("Employee Name", employeeName);
        await this.base.clickBtn("Search");
    }

    async verifyRecordsFound() {
        await expect(this.recordFound).toHaveText(/\(\d+\)/);
        const text = await this.recordFound.textContent();
        const total = Number(text.match(/\((\d+)\)/)[1]);
        await expect(this.tableRows).toHaveCount(Math.min(total, 50));
    }

    async autocompleteSuggestion(letter) {
        await this.searchEmployeeName.clear();
        await this.searchEmployeeName.pressSequentially(letter);
        await expect(this.options.first()).toBeVisible();
        await expect
            .poll(async () => {
                const texts = await this.options.allTextContents();
                return texts.every((t) => new RegExp(letter, "i").test(t));
            })
            .toBe(true);
    }
}