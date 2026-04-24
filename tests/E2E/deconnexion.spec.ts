import { expect, test } from '../../fixtures/create_user.fixture';
import { DashboardPage } from '../../pages/notes/DashboardNotePage';    


test.describe('Deconnexion @E2E', () => {

    test('Utilisateur ui @Deconnexion', async ({ user, page }) => {
    const dashboardPage = new DashboardPage(page);
    console.log(user);

    // 🔥 injection token dans navigateur (login sans UI)
    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, user.token);

    // 🔥 navigation
    await dashboardPage.navigate();
    await dashboardPage.boutonDeconnexion();
    await expect(page.getByText('Welcome to Notes App')).toBeVisible();
    });

});

