// fixtures/user.fixture.ts
import { test as base } from './api.fixture';
import { createUserPayload } from '../data/user.factory';
import { NotesAPI } from '../api/services/note.api';
import { createApiClient } from '../api/client/apiClients';

type Fixtures = {
  user: {
    email: string;
    password: string;
    token: string;
  };
  notesApi: NotesAPI;
};

export const test = base.extend<Fixtures>({
  user: async ({ userApi }, use) => {
    const payload = createUserPayload();

    await userApi.register(payload);

    const loginRes = await userApi.login(payload);
    const token = (await loginRes.json()).data.token;

    const user = {
      email: payload.email,
      password: payload.password,
      token
    };

    await use(user);

    // cleanup
    await userApi.delete(token);
  },

  notesApi: async ({ user }, use) => {
    const client = await createApiClient(user.token);
    await use(new NotesAPI(client));
    await client.dispose();
  },
});

export { expect } from '@playwright/test';