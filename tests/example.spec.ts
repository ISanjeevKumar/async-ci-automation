import { test, expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');
import * as payments from "../data/payments.json"

test.describe('Journey 2 E2E Tests', () => {
  payments.forEach(payment => {
    test(`Test with Payment ID: ${payment.PaymentId}`, async ({ page }) => {
      console.log(payment)
    });
  });
});