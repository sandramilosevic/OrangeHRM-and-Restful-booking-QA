import { test } from "@playwright/test";
import { PIMPage } from "../../pages/UI/PIMPage";
import data from "../../data/UI/searchEmployee.json";
import { EmployeeApi } from "../../utils/UI/createEmployeeApi";
import { Navigation } from "../../utils/UI/navigation";

test.describe("PIM page searching", () => {
  let pm;
  let createEmployee;
  let pimPage;

  test.beforeEach(async ({ page }) => {
    pimPage = new PIMPage(page);
    pm = new Navigation(page);
    createEmployee = await new EmployeeApi(page).setup();

    await pm.goLink("PIM");
  });

  test.afterEach(async () => {
    await createEmployee.cleanup();
  });

  for (const name of data.searchNames) {
    test(`Search for employee ${name}`, async () => {
      await pimPage.searchName(name);
      await pimPage.verifyRecordsFound();
    });
  }

  test("Employee name search shows suggestion", async () => {
    await pimPage.autocompleteSuggestion(data.letter);
  });
});