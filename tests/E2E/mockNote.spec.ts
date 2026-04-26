import { expect, test } from '../../fixtures/create_user.fixture';
import { DashboardPage } from '../../pages/notes/DashboardNotePage';    
import notesMock from '../../data/notesMock.json';
import erreurMock from '../../data/erreurMock.json';
import { mockApi } from '../../utils/mockApi';
import { Given, Then, When } from '../../utils/bdd';

test.describe('Mock @E2E', () => {

    test('réseau - liste des notes', async ({ user, page }) => {
        const dashboardPage = new DashboardPage(page);
        console.log(user);

        await Given("Authentification de l'utilisateur", async () => {
            // 🔥 injection token dans navigateur (login sans UI)
            await page.addInitScript((token) => {
                localStorage.setItem('token', token);
            }, user.token);
        });

        await When("Mock de l'API pour la liste des notes", async () => {
            await mockApi(page, '**/notes/api/notes', notesMock, 200);
            await dashboardPage.navigate();
        });

        await Then('Vérifier que les notes mockées sont affichées', async () => {
            await expect(page.getByText('Note mockée A')).toBeVisible();
            await expect(page.getByText('Note mockée B')).toBeVisible();
        });
        
    });


    test('Erreur', async ({ user, page }) => {
    const dashboardPage = new DashboardPage(page);
    console.log(user);

    await Given("Authentification de l'utilisateur", async () => {
            // 🔥 injection token dans navigateur (login sans UI)
            await page.addInitScript((token) => {
                localStorage.setItem('token', token);
            }, user.token);
    });

    await When("Mock de l'API pour simuler une erreur", async () => {
        await mockApi(page, '**/notes/api/notes', erreurMock, 500);
        await dashboardPage.navigate();
    });    
    
    await Then('Vérifier que le message d\'erreur est affiché', async () => {
        await expect(page.locator('[data-testid="category-all"]')).toBeVisible();
    });
    
    });

});
