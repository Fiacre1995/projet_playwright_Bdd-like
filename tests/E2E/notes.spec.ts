import { expect } from '@playwright/test';
import { createNotePayload } from '../../data/notes.factory';
import { test } from '../../fixtures/create_user.fixture';
import { DashboardPage } from '../../pages/notes/DashboardNotePage';    

const payload = createNotePayload();

test.describe('Notes @E2E', () => {

    test('création avec succès', async ({ user, page }) => {
    const dashboardPage = new DashboardPage(page);
    console.log(user);

    // 🔥 injection token dans navigateur (login sans UI)
    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, user.token);

    // 🔥 navigation
    await dashboardPage.navigate();
    await dashboardPage.getWelcomeMessage();
    await dashboardPage.scroller();
    await dashboardPage.ajouterNote();
    await dashboardPage.creerNote(payload.category, payload.title, payload.description);
    await dashboardPage.verifierNote(payload.title);
    });

    test('création échouée', async ({ user, page }) => {
    const dashboardPage = new DashboardPage(page);
    console.log(user);

    // 🔥 injection token dans navigateur (login sans UI)
    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, user.token);

    // 🔥 navigation
    await dashboardPage.navigate();
    await dashboardPage.getWelcomeMessage();
    await dashboardPage.scroller();
    await dashboardPage.ajouterNote();
    await dashboardPage.creerNote(payload.category, '', '');
    await dashboardPage.messageChampTitleRequired('Title is required');
    await dashboardPage.messageChampDescriptionRequired('Description is required');
    });

});

