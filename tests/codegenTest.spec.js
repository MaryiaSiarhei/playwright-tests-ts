import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-credentials"]').click();
  await page.locator('body').press('ControlOrMeta+c');
  await page.getByRole('form', { name: 'Login' }).click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').press('ControlOrMeta+v');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-password"]').click();
  await page.locator('body').press('ControlOrMeta+c');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').press('ControlOrMeta+v');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="continue-shopping"]').click();
});