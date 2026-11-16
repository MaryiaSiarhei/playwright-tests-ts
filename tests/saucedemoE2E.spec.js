// @ts-check
import { test, expect } from '@playwright/test';


test('E2E script', async ({page}) => {
//Aauthorization step
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

//Add item step
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');

//Shopping cart step
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('[data-test="inventory-item"]')).not.toBeEmpty();
    await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');

//Checkout step 1
    await page.locator('#checkout').click();
    await page.locator('#first-name').fill('test');
    await page.locator('#last-name').fill('test');
    await page.locator('#postal-code').fill('123456');

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

 //Checkout step 2   
    await page.locator('#continue').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('[data-test="payment-info-value"]')).toContainText('SauceCard #');
    await expect(page.locator('[data-test="shipping-info-value"]')).toContainText('Free Pony Express Delivery!');
    await expect(page.locator('[data-test="subtotal-label"]')).toContainText('$29.99');
    await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax: $');
    await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $');

//Finish step
    await page.locator('#finish').click();
    
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
    await expect(page.locator('#back-to-products')).toBeVisible();
    await expect(page.locator('#generate-pdf-order')).toBeVisible();
});