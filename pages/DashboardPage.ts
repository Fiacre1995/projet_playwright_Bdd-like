import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async isLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async getWelcomeMessage() {
    return await this.page.textContent('.oxd-topbar-header-breadcrumb-module');
  }
}