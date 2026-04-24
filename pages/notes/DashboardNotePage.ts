import { Page, expect } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  // Partie de URL
  async isLoaded() {
    await expect(this.page).toHaveURL(/notes\/app/);
  }

  async navigate() {
    await this.page.goto('https://practice.expandtesting.com/notes/app/login');
  }

  async scroller() {
    await this.page.locator('button[data-testid="add-new-note"]').scrollIntoViewIfNeeded();
  }

  // Vérifier Texte dans la page
  async getWelcomeMessage() {
    return await this.page.getByTestId('home');
  }

  async verifierNote(note: string) {
    await expect(this.page.locator('[data-testid="note-card-title"]')).toContainText(note);
  }

  async messageChampTitleRequired(messageErreur: string) {
    const modal = await this.selectionneModale();
    return await expect(modal.getByText('Title is required')).toContainText(messageErreur);
  }

  async messageChampDescriptionRequired(messageErreur: string) {
    const modal = await this.selectionneModale();
    return await expect(modal.getByText('Description is required')).toContainText(messageErreur);
  }


  // Boutons 
  async ajouterNote() {
    await this.page.getByTestId('add-new-note').click();
  }

  async validerAjouterNote() {
  await this.page.locator('[data-testid="note-submit"]').click();
  }

  async boutonDeconnexion() {
  await this.page.locator('[data-testid="logout"]').click();
  }


  // Champs du formulaire
  async selectionneModale() {
    const modal = this.page.locator('.modal-dialog');
    await expect(modal).toBeVisible();
    return modal;
  }

 async champCategory(category: string) {
  const modal = await this.selectionneModale();
  const dropdown = modal.locator('[data-testid="note-category"]');
  await expect(dropdown).toBeVisible();
  await dropdown.selectOption({ label: category });
}

 async champCompleted() {
  const modal = await this.selectionneModale();
  const input = await modal.locator('.form-check-input').check();
}

 async champTitle(title: string) {
  const modal = await this.selectionneModale();
  const input = await modal.locator('[data-testid="note-title"]').fill(title);
}

 async champDescription(description: string) {
  const modal = await this.selectionneModale();
  const input = await modal.locator('#description').fill(description);
}


// Fonction qui regroupe les étapes de création de note

 async creerNote(category: string, titre_note: string, description: string) {
    await this.champCategory(category);
    //await this.page.pause();
    await this.champCompleted();
    await this.champTitle(titre_note);
    await this.champDescription(description);
    await this.validerAjouterNote();
  } 



}