import { expect, test } from '../../fixtures/create_user.fixture';
import { DashboardPage } from '../../pages/notes/DashboardNotePage';    
import { Given, Then, When } from '../../utils/bdd';


test.describe('Deconnexion @E2E', () => {

    test('Utilisateur ui @Deconnexion', async ({ user, page }) => {
        const dashboardPage = new DashboardPage(page);
        console.log(user);

        await Given("Authentification de l'utilisateur", async () => {
                // 🔥 injection token dans navigateur (login sans UI)
                await page.addInitScript((token) => {
                    localStorage.setItem('token', token);
                }, user.token);
        });

        await When("Clique sur le bouton de déconnexion", async () => {
              // 🔥 navigation
            await dashboardPage.navigate();
            await dashboardPage.boutonDeconnexion();
        });

        await Then('Vérifieer redirection vers la page de login', async () => {
            await expect(page.getByText('Welcome to Notes App')).toBeVisible();
        });
        
    });

});

