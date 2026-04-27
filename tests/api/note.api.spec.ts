// tests/api/notes.spec.ts
import { createNotePayload } from '../../data/factory/notes.factory';
import { test, expect } from '../../utils/testHooks';
import { Given, Then, When } from '../../utils/bdd';



test.describe('CRUD Notes', () => {

    test('Lister les notes', async ({ notesApi, user }) => {
          let res: any; // ✅ Déclaré au niveau du test pour être accessible partout

          await Given("Authentification de l'utilisateur", async () => {
            console.log(user);
          });

          await When('Envoie requete liste des notes', async () => {
            res = await notesApi.getAll(); // ✅ Assigné sans `const`
          });

          await Then('La réponse status doit être 200', async () => {
            expect(res.status()).toBe(200);
          });

          await Then("Vérifier que la réponse contient l'objet data", async () => {
            const body = await res.json();
            expect(body).toHaveProperty('data');
          });
    });

    test('Voir une note', async ({ notesApi, user }) => {

      let res_create: any;
      let res_one: any;

      await Given("Authentification de l'utilisateur", async () => {
            console.log(user);
          });

      await When("Création d'une note", async () => {
            const payload = createNotePayload();
            res_create = await notesApi.create(payload);
          });

      await When("Envoie requete pour voir une note", async () => {
            const res_liste = await notesApi.getAll();
            const body = await res_liste.json();
            const noteId = body.data[0].id;
            res_one = await notesApi.getOne(noteId);
          });

       await Then('La réponse status doit être 200', async () => {
            console.log(await res_one.json());
            expect(res_one.status()).toBe(200);
          });
      
    });

    test('Supprimer une note', async ({ notesApi, user }) => {

      let res_create: any;
      let res_one: any;

      await Given("Authentification de l'utilisateur", async () => {
            console.log(user);
          });

      await When("Création d'une note", async () => {
            const payload = createNotePayload();
            res_create = await notesApi.create(payload);
          });

      await When("Envoie requete pour supprimer une note", async () => {
            const res_liste = await notesApi.getAll();
            const body = await res_liste.json();
            const noteId = body.data[0].id;
            res_one = await notesApi.delete(noteId);
          });

       await Then('La réponse status doit être 200', async () => {
            console.log(await res_one.json());
            expect(res_one.status()).toBe(200);
          });
      
    });

});