import { test as base } from "@playwright/test";
import { App } from "../../src/app";

export const mytest = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
});
