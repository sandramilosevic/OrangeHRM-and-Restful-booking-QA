import { LoginPage } from "./LoginPage";
import loginData from "../../data/UI/loginData.json";

export class AdminPage {
  constructor(page) {
    this.page = page;
    this.liAdmin = page.getByRole("link", { name: "Admin", exact: true });
    this.addBtn = page.getByRole("button", { name: "Add" });
    this.userRole = page.locator(".oxd-select-wrapper").nth(0);
    this.statusDropdown = page.locator(".oxd-select-wrapper").nth(1);
    this.employeeNameField = page.getByPlaceholder("Type for hints...");
    this.username = page.locator(".oxd-input-group").filter({ hasText: "Username" }).locator("input");
    this.password = page.locator('input[type="password"]').nth(0);
    this.confirmPassword = page.locator('input[type="password"]').nth(1);
    this.saveBtn = page.getByRole("button", { name: "Save" });
  }

  async goToAdmin() {
    await this.liAdmin.click();
  }

  async selectUserRole(role) {
    await this.userRole.click();
    await this.page
      .locator(".oxd-select-option")
      .getByText(role, { exact: true })
      .click();
  }

  async selectStatus(status) {
    await this.statusDropdown.click();
    await this.page
      .locator(".oxd-select-option")
      .getByText(status, { exact: true })
      .click();
  }

  async selectEmployee(employeeName) {
    await this.employeeNameField.fill(employeeName);
    await this.page
      .locator(".oxd-autocomplete-option")
      .filter({ hasText: employeeName })
      .first()
      .click();
  }

  async addUser(userRole, employeeName, status, username, password) {
      await this.addBtn.click();
      await this.selectUserRole(userRole);
      await this.selectEmployee(employeeName);
      await this.selectStatus(status);
      await this.username.fill(username);
      await this.password.fill(password);
      await this.confirmPassword.fill(password);
      await this.saveBtn.click();
  }

  async newUserLogin(username, password) {
    const login = new LoginPage(this.page);
    await login.loginUser(username, password);
  }
}
