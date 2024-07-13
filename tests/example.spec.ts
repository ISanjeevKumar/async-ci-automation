import { test, expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');

const paymentIdsFilePath = path.join(__dirname, '../../../scripts/journey1_payment_ids.txt');

// Read payment IDs from file
const paymentIds = fs.readFileSync(paymentIdsFilePath, 'utf8').trim().split('\n');


test('has title', async ({ page }) => {

  console.log('Payment Ids:', paymentIds)
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
