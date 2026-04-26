// tests/api/notes.spec.ts
import { createNotePayload } from '../../data/notes.factory';
import { test_notes, expect } from '../../fixtures/api.fixture';
import { test } from '../../fixtures/create_user.fixture';



test.describe('CRUD Notes', () => {

    test('Lister les notes', async ({ notesApi, user }) => {
      console.log(user)
      const res = await notesApi.getAll();

      expect(res.status()).toBe(200);

      const body = await res.json();
      expect(body).toHaveProperty('data');
    });

    test('Voir une note', async ({ notesApi, user }) => {
      console.log(user)
      const payload = createNotePayload();
      const res_create = await notesApi.create(payload);

      const res_liste = await notesApi.getAll();
      const body = await res_liste.json();
      const noteId = body.data[0].id;

      const res_one = await notesApi.getOne(noteId);
      console.log(await res_one.json());
      expect(res_one.status()).toBe(200);
      
    });

      test('Supprimer une note', async ({ notesApi, user }) => {
      console.log(user)
      const payload = createNotePayload();
      const res_create = await notesApi.create(payload);

      const res_liste = await notesApi.getAll();
      const body = await res_liste.json();
      const noteId = body.data[0].id;

      const res_delete = await notesApi.delete(noteId);
      console.log(await res_delete.json());
      expect(res_delete.status()).toBe(200);
      
    });

});