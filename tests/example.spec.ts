import { test, expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');

const paymentsFilePath = path.join(__dirname, '../../../data/payments.json');

// Read payment data from file
const payments = JSON.parse(fs.readFileSync(paymentsFilePath, 'utf8'));

test.describe('Journey 2 E2E Tests', () => {
  payments.forEach(payment => {
    test(`Test with Payment ID: ${payment.PaymentId}`, async ({ page }) => {
      console.log(payment)
    });
  });
});