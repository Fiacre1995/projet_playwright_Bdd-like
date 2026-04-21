import { test } from '@playwright/test';

export async function Given(step: string, fn: () => Promise<void>) {
  await test.step(`Given ${step}`, fn);
}

export async function When(step: string, fn: () => Promise<void>) {
  await test.step(`When ${step}`, fn);
}

export async function Then(step: string, fn: () => Promise<void>) {
  await test.step(`Then ${step}`, fn);
}