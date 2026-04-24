import { expect, test } from '../../fixtures/create_user.fixture';
import { DashboardPage } from '../../pages/notes/DashboardNotePage';    


test.describe('Mock @E2E', () => {

    test('Des données', async ({ user, page }) => {
    const dashboardPage = new DashboardPage(page);
    console.log(user);

    // 🔥 injection token dans navigateur (login sans UI)
    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, user.token);

    await page.route('**/notes/api/notes', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
            success: true,
            status: 200,
            message: 'Notes successfully retrieved',
            data: [
                {
                id: '69ea6400f34549029586b8b8',
                title: 'Note mockée A',
                description: 'Description A',
                category: 'Home',
                completed: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                user_id: 'mock-user-id'
                },
                {
                id: '69ea6400f34549029586b8b9',
                title: 'Note mockée B',
                description: 'Description B',
                category: 'Work',
                completed: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                user_id: 'mock-user-id'
                }
            ]
            })
        });
    });

    // 🔥 navigation
    await dashboardPage.navigate();
    await expect(page.getByText('Note mockée A')).toBeVisible();
    await expect(page.getByText('Note mockée B')).toBeVisible();
    });


    test('Réseau', async ({ user, page }) => {
    const dashboardPage = new DashboardPage(page);
    console.log(user);

    // 🔥 injection token dans navigateur (login sans UI)
    await page.addInitScript((token) => {
        localStorage.setItem('token', token);
    }, user.token);

    await page.route('**/notes/api/notes', async route => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
            success: false,
            status: 500,
            message: 'Internal Server Error'
            })
        });
    });

    // 🔥 navigation
    await dashboardPage.navigate();
    await expect(page.locator('[data-testid="category-all"]')).toBeVisible();
    });

});
