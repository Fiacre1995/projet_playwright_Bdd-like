import { expect } from '@playwright/test';
import { createNotePayload } from '../../data/factory/notes.factory';
import { test } from '../../fixtures/user.fixture';
import { DashboardPage } from '../../pages/notes/DashboardNotePage';    
import { Given, Then, When } from '../../utils/bdd';

const payload = createNotePayload();

test.describe('Notes @E2E', () => {

    test('création avec succès', async ({ user, page }) => {
        const dashboardPage = new DashboardPage(page);
        console.log(user);

        await Given("Authentification de l'utilisateur", async () => {
                    // 🔥 injection token dans navigateur (login sans UI)
                    await page.addInitScript((token) => {
                        localStorage.setItem('token', token);
                    }, user.token);
        });

        await When("Création d'une note", async () => {
            // 🔥 navigation
            await dashboardPage.navigate();
            await dashboardPage.getWelcomeMessage();
            await dashboardPage.scroller();
            await dashboardPage.ajouterNote();
            await dashboardPage.creerNote(payload.category, payload.title, payload.description);
        });

        await Then('Vérifier que la note est affichée dans la liste', async () => {
            await dashboardPage.verifierNote(payload.title);
        });

    });

    test('création échouée', async ({ user, page }) => {
        const dashboardPage = new DashboardPage(page);
        console.log(user);

        await Given("Authentification de l'utilisateur", async () => {
                    // 🔥 injection token dans navigateur (login sans UI)
                    await page.addInitScript((token) => {
                        localStorage.setItem('token', token);
                    }, user.token);
        });

        await When("Création d'une note avec des champs vides", async () => {
            // 🔥 navigation
            await dashboardPage.navigate();
            await dashboardPage.getWelcomeMessage();
            await dashboardPage.scroller();
            await dashboardPage.ajouterNote();
            await dashboardPage.creerNote(payload.category, '', '');
        });

        await Then('Vérifier que les messages d\'erreur sont affichés', async () => {
            await dashboardPage.messageChampTitleRequired('Title is required');
            await dashboardPage.messageChampDescriptionRequired('Description is required');
        });

    });

});

