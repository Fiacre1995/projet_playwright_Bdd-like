# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\login.spec.ts >> Login unsuccessful >> Login test - Admin
- Location: tests\login.spec.ts:39:9

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Test source

```ts
  1  | import { expect, Page } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  |   constructor(private page: Page) {}
  5  | 
  6  |   async navigate() {
> 7  |     await this.page.goto('');
     |                     ^ Error: page.goto: Target page, context or browser has been closed
  8  |   }
  9  | 
  10 |   async fillUsername(username: string) {
  11 |     await this.page.fill('input[name="username"]', username);
  12 |   }
  13 | 
  14 |   async fillPassword(password: string) {
  15 |     await this.page.fill('input[name="password"]', password);
  16 |   }
  17 | 
  18 |   async submit() {
  19 |     await this.page.click('.orangehrm-login-button');
  20 |   }
  21 | 
  22 |   async login(username: string, password: string) {
  23 |     await this.fillUsername(username);
  24 |     await this.fillPassword(password);
  25 |     await this.submit();
  26 |   }
  27 | 
  28 |   async messageErreur() {
  29 |     await expect(this.page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
  30 |   }
  31 | 
  32 |   async urlLogin() {
  33 |     await expect(this.page).toHaveURL(/auth\/login/);
  34 |   }
  35 | }
```