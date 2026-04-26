import { expect, test } from '../../fixtures/create_user.fixture';
import { DashboardPage } from '../../pages/notes/DashboardNotePage';    
import notesMock from '../../data/notesMock.json';
import erreurMock from '../../data/erreurMock.json';
import { mockApi } from '../../utils/mockApi';

test.describe('Mock @E2E', () => {

    test('réseau - liste des notes', async ({ user, page }) => {
    const dashboardPage = new DashboardPage(page);
    console.log(user);

    // 🔥 injection token dans navigateur (login sans UI)
    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, user.token);

    await mockApi(page, '**/notes/api/notes', notesMock, 200);

    // 🔥 navigation
    await dashboardPage.navigate();
    await expect(page.getByText('Note mockée A')).toBeVisible();
    await expect(page.getByText('Note mockée B')).toBeVisible();
    });


    test('Erreur', async ({ user, page }) => {
    const dashboardPage = new DashboardPage(page);
    console.log(user);

    // 🔥 injection token dans navigateur (login sans UI)
    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, user.token);

    await mockApi(page, '**/notes/api/notes', erreurMock, 500);

    // 🔥 navigation
    await dashboardPage.navigate();
    await expect(page.locator('[data-testid="category-all"]')).toBeVisible();
    });

});
