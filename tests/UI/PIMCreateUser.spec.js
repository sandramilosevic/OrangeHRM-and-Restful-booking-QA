import { test, expect } from "@playwright/test";
import { PIMPage } from "../../pages/UI/PIMPage";
import createCases from "../../data/UI/createEmployee.json";
import { urls } from "../../data/UI/urls";
import { EmployeeApi } from "../../utils/UI/createEmployeeApi";
import { Navigation } from "../../utils/UI/navigation";

test.describe("PIM page creating new user", () => {
  let pimPage;
  let pm;
  let employeeApi;

  test.beforeEach(async ({ page }) => {
    pimPage = new PIMPage(page);
    pm = new Navigation(page);
    employeeApi = await new EmployeeApi(page).setup();
    await pm.goLink("PIM");
  });

  test.afterEach(async () => {
    await employeeApi.cleanup();
  });

  for (const data of createCases) {
    test(`Create employee - ${data.testcase}`, async ({ page }) => {
      await pimPage.createNew(data.name, data.lastName, data.employeeId);

      if (data.valid) {
        await expect(page).toHaveURL(/viewPersonalDetails/);
      } else {
        await expect(page).toHaveURL(urls.PIMAdd);
      }
    });
  }
});