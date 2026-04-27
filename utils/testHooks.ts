import { test as base } from '../fixtures/user.fixture'; // 🔥 important
import fs from 'fs';
import { runClineFix } from '../ia/clineAgent';

export const test = base.extend({});

test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {

    const error = testInfo.error?.message || "Unknown error";
    const filePath = testInfo.file;

    const testCode = fs.readFileSync(filePath, 'utf-8');

    console.log("❌ Test échoué → analyse Cline");

    runClineFix({
      error,
      testCode,
      filePath
    });
  }
});

export { expect } from '@playwright/test';