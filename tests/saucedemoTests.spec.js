import { test, expect } from '@playwright/test';

test('locked out user login', async ({page}) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    await expect(page.locator('.error-message-container.error')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
    await expect(page).toHaveScreenshot('locked-out-error.png', {fullPage: true, animations: 'disabled', maxDiffPixelRatio: 0.01});
});

test('check options in filter', async ({page}) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

    const locator = page.locator('[data-test="product-sort-container"]');
    await expect(locator).toBeVisible();
    await expect(locator.locator('option')).toHaveCount(4);
    await expect(locator.locator('option').nth(0)).toHaveAttribute('value', 'az');
    await expect(locator.locator('option').nth(1)).toHaveAttribute('value', 'za');
    await expect(locator.locator('option').nth(2)).toHaveAttribute('value', 'lohi');
    await expect(locator.locator('option').nth(3)).toHaveAttribute('value', 'hilo');
    await expect(locator.locator('option')).toHaveText(['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)']);
    await expect(page).toHaveScreenshot('inventory-filter-options.png', {fullPage: true, animations: 'disabled', maxDiffPixelRatio: 0.01});
});

test('checking the selected item in the filter and filtration', async ({page}) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

    const locator = page.locator('[data-test="product-sort-container"]');

    await expect(locator).toBeVisible();

    await locator.selectOption('za');

    await expect(locator).toHaveValue('za');
    await expect(page.locator('[data-test="active-option"]')).toHaveText('Name (Z to A)');
    await expect(page.locator('[data-test="inventory-item-name"]').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
    await expect(page).toHaveScreenshot('inventory-sorted-za.png', {fullPage: true, animations: 'disabled', maxDiffPixelRatio: 0.01});
});
