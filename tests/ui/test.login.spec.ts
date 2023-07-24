import { expect } from "@playwright/test";
import { mytest } from "./base";

mytest("login with valid cred", async ({ app }) => {
  await app.loginPage.open();
  await app.loginPage.login("admin", "123456");

  await expect(app.mainPage.logoutBtn).toBeVisible();
});

mytest("login with invalid cred", async ({ app }) => {
  await app.loginPage.open();
  await app.loginPage.login("admin", "4444");

  // no need because of the screenshot check
  // await expect(app.loginPage.errorMessages).toHaveText("Bad credentials");

  await expect(app.page).toHaveScreenshot("bad_login.png");
});
