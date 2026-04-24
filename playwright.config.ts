import { defineConfig } from '@playwright/test';

// Chargement de la configuration en fonction de l'environnement
const ENV = process.env.ENV || 'local';
const envConfig = require(`./env/${ENV}`).config;

export default defineConfig({
  use: {
    baseURL: envConfig.baseURL,
    headless: envConfig.headless,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',   // Enregistre une trace uniquement lors de la première relance après un échec
  },

  workers: 3, // Nombre de workers pour exécuter les tests en parallèle

  //  Définition des projets pour différents navigateurs
  projects: [
    {
      name: 'Chromium',     // Test sur Chromium
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',      // Test sur Firefox
      use: { browserName: 'firefox' },
    },
    //{
      ////use: { browserName: 'webkit' },
    //}
  ],

  // Relance le test 1 fois en cas d'échec
  retries: 1,

  // Augmentation du timeout global pour les tests
  timeout: 60000,
  
  // Configuration du reporter pour générer un rapport HTML
  reporter: [['html', { open: 'always' }]],
});