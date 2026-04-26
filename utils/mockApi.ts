import { test, expect, Page } from '@playwright/test';

export async function mockApi(page: Page, url: string, response: any, status: number) {
  await page.route(url, route =>
    route.fulfill({
      status: status,
      contentType: 'application/json',
      body: JSON.stringify(response)
    })
  );
}