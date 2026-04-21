import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('');
  }

  async fillUsername(username: string) {
    await this.page.fill('input[name="username"]', username);
  }

  async fillPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async submit() {
    await this.page.click('.orangehrm-login-button');
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  async messageErreur() {
    await expect(this.page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
  }

  async urlLogin() {
    await expect(this.page).toHaveURL(/auth\/login/);
  }
}