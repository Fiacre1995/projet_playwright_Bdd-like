// fixtures/api.fixture.ts
import { test as base } from '@playwright/test';
import { createApiClient } from '../api/client/apiClients';
import { UserAPI } from '../api/services/user.api';
import { NotesAPI } from '../api/services/note.api';

type Fixtures = {
  userApi: UserAPI;
  notesApi: NotesAPI;
};

export const test = base.extend<Fixtures>({
  userApi: async ({}, use) => {
    const client = await createApiClient();
    await use(new UserAPI(client));
    await client.dispose();
  },
});

export const test_notes = base.extend<Fixtures>({
  notesApi: async ({}, use) => {
    const client = await createApiClient();
    await use(new NotesAPI(client));
    await client.dispose();
  },
});


export { expect } from '@playwright/test';