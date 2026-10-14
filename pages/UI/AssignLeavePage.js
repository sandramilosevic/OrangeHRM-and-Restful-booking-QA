export class LeavePage {
    constructor(page) {
        this.page = page;
        this.liLeave = page.getByRole("link", { name: "Leave", exact: true });
        this.assignLeaveLink = page.getByRole("link", { name: "Assign Leave" });

        this.employeeNameInput = page
            .locator("div.oxd-input-group")
            .filter({ hasText: "Employee Name" })
            .locator("input");
        this.leaveTypeDropdown = page
            .locator("div.oxd-input-group")
            .filter({ hasText: "Leave Type" })
            .locator(".oxd-select-text");

        this.fromDateInput = page.getByRole("textbox", { name: "yyyy-dd-mm" }).first();
        this.toDateInput = page.getByRole("textbox", { name: "yyyy-dd-mm" }).nth(1);

        this.partialDaysDropdown = page
            .locator("div.oxd-input-group")
            .filter({ has: page.getByText("Partial Days", { exact: true }) })
            .locator(".oxd-select-text");
        this.startDayDropdown = page
            .locator("div.oxd-input-group")
            .filter({ has: page.getByText("Start Day", { exact: true }) })
            .locator(".oxd-select-text");

        this.assignBtn = page.getByRole("button", { name: "Assign", exact: true });
        this.confirmDialog = page.getByRole("dialog");

        this.okBtn = page.getByRole("button", { name: "Ok" });
    }

    async goToAssignLeave() {
        await this.liLeave.click();
        await this.assignLeaveLink.click();
        await this.page.waitForURL(/assignLeave/);
    }

    async selectEmployee(employeeName) {
        await this.employeeNameInput.click();
        await this.employeeNameInput.pressSequentially(employeeName, { delay: 50 });
        const option = this.page
            .locator(".oxd-autocomplete-option")
            .filter({ hasText: employeeName })
            .first();
        await option.waitFor({ state: "visible", timeout: 10000 });
        await option.click();
    }

    async selectOption(dropdown, optionText) {
        await dropdown.click();
        await this.page
            .locator(".oxd-select-option")
            .getByText(optionText, { exact: true })
            .click();
    }

    async selectLeaveType(leaveTypeName) {
        await this.selectOption(this.leaveTypeDropdown, leaveTypeName);
    }

    async setFromDate(date) {
        await this.fromDateInput.fill(date);
        await this.page.locator(".oxd-text--h6").first().click();
    }

    async setToDate(date) {
        await this.toDateInput.fill(date);
        await this.page.locator(".oxd-text--h6").first().click();
    }

    async selectPartialDays(partialDays) {
        await this.selectOption(this.partialDaysDropdown, partialDays);
    }

    async selectStartDay(startDay) {
        await this.selectOption(this.startDayDropdown, startDay);
    }

    async confirmAssignment() {
        try {
            await this.confirmDialog.waitFor({ state: "visible", timeout: 5000 });
            await this.okBtn.click();
        } catch {
            // dialog didn't appear (validation error or server issue)
        }
    }

    async assignLeave(employeeName, leaveType, fromDate, toDate, partialDays, startDay) {
        await this.selectEmployee(employeeName);
        await this.selectLeaveType(leaveType);
        await this.setFromDate(fromDate);
        await this.setToDate(toDate);
        if (partialDays) {
            await this.selectPartialDays(partialDays);
        }
        if (startDay) {
            await this.selectStartDay(startDay);
        }
        await this.assignBtn.click();
        await this.confirmAssignment();
    }
}