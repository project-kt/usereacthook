import { siteConfig } from "@/config/site";
import test, { expect } from "@playwright/test";

test.describe("E2E Index page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should have a title", async ({ page }) => {
    await expect(page).toHaveTitle(`${siteConfig.title} | ${siteConfig.description}`);
  });

  test.describe("Navbar", () => {
    test("should have a navbar", async ({ page }) => {
      await expect(page.getByRole("navigation")).toBeVisible();
    });

    test("should have a logo", async ({ page }) => {
      const navbar = page.getByRole("navigation");
      const logo = navbar.getByTestId("logo");

      await expect(logo.first()).toBeVisible();
    });

    test("should have a title link that goes to /", async ({ page }) => {
      const navbar = page.getByRole("navigation");
      const titleLink = navbar.getByRole("link", { name: /usereacthook/i });

      await expect(titleLink).toBeVisible();
      await titleLink.click();
      await expect(page).toHaveURL(/\//);
    });

    test("should have a homepage link that goes to /", async ({ page }) => {
      const navbar = page.getByRole("navigation");
      const homepageLink = navbar.getByRole("link", { name: /homepage/i });

      await expect(homepageLink).toBeVisible();
      await homepageLink.click();
      await expect(page).toHaveURL(/\//);
    });

    test("should have a contact link that goes to /contact", async ({ page }) => {
      const navbar = page.getByRole("navigation");
      const contactLink = navbar.getByRole("link", { name: /contact/i });

      await expect(contactLink).toBeVisible();
      await contactLink.click();
      await expect(page).toHaveURL(/\/contact/);
    });

    test("should have a documentation link that goes to /docs", async ({ page }) => {
      const navbar = page.getByRole("navigation");
      const docsLink = navbar.getByRole("link", { name: /documentation/i });

      await expect(docsLink).toBeVisible();
      await docsLink.click();
      await expect(page).toHaveURL(/\/docs/);
    });

    test("should have a theme button that changes the themes between dark and light", async ({ page }) => {
      const heroSection = page.getByRole("navigation");
      const modetoggleButton = heroSection.getByRole("button", { name: /mode-toggle/i });

      await expect(modetoggleButton).toBeVisible();
      //TODO: add test for changing theme
    });

    test("should have a github button that goes to the github repo", async ({ page }) => {
      const heroSection = page.getByRole("navigation");
      const githubButton = heroSection.getByRole("link", { name: /github/i });

      await expect(githubButton).toBeVisible();
      await githubButton.click();
      await expect(page).toHaveURL(siteConfig.links.github);
    });
  });

  test.describe("Hero", () => {
    test("should have a hero section", async ({ page }) => {
      await expect(page.getByTestId("hero")).toBeVisible();
    });

    test("should have a hero title", async ({ page }) => {
      const heroSection = page.getByTestId("hero");

      await expect(heroSection.getByRole("heading", { level: 1, name: siteConfig.description })).toBeVisible();
    });

    test("should have a hero subtitle", async ({ page }) => {
      const heroSection = page.getByTestId("hero");

      await expect(heroSection.getByRole("heading", { level: 2, name: /clear documentation/i })).toBeVisible();
    });

    test("should have a documentation button that goes to /docs", async ({ page }) => {
      const heroSection = page.getByTestId("hero");
      const docButton = heroSection.getByRole("link", { name: /documentation/i });

      await expect(docButton).toBeVisible();
      await expect(docButton.getByTestId("docs")).toBeVisible();
      await docButton.click();
      await expect(page).toHaveURL(/\/docs/);
      await expect(page).toHaveTitle(/documentation/i);
    });

    test("should have a github button that goes to the github repo", async ({ page }) => {
      const heroSection = page.getByTestId("hero");
      const githubButton = heroSection.getByRole("link", { name: /github/i });

      await expect(githubButton).toBeVisible();
      await expect(githubButton.getByTestId("github")).toBeVisible();
      await githubButton.click();
      await expect(page).toHaveURL(siteConfig.links.github);
    });
  });
});
