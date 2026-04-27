import { test, expect } from '@playwright/test';
import users from '../../data/json/users_valide.json';
import usersInvalide from '../../data/json/users_invalide.json';
import { Given, When, Then } from '../../utils/bdd';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Login successfull @E2E', () => {

  for (const user of users) {

    test(`Login test valide - ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);

      await Given('I am on login page', async () => {
        await loginPage.navigate();
      });

      await When(`I login with ${user.username}`, async () => {
        await loginPage.login(user.username, user.password);
      });

      await Then('I verify result', async () => {
        dashboardPage.isLoaded();
      });

    });

  }

});


test.describe('Login unsuccessful @E2E', () => {

  for (const user of usersInvalide) {

    test(`Login test - ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);

      await Given('I am on login page', async () => {
        await loginPage.navigate();
      });

      await When(`I login with ${user.username}`, async () => {
        await loginPage.login(user.username, user.password);
      });

      await Then('I verify result', async () => {
        await loginPage.messageErreur();
      });

    });

  }

});