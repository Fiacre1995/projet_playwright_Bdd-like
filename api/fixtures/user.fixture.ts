import { test as base } from '@playwright/test';
import { createApiClient } from '../client/apiClients';
import { UserAPI } from '../services/user.api';
import { createUserPayload } from '../../data/user.factory';

type Fixtures = {
  user: any;
  userApi: UserAPI;
};

export const test = base.extend<Fixtures>({
  userApi: async ({}, use: (r: UserAPI) => Promise<void>) => {
    const client = await createApiClient();
    await use(new UserAPI(client));
    await client.dispose();
  },

  user: async ({ userApi }: { userApi: UserAPI }, use: (r: any) => Promise<void>) => {
    // 🔥 beforeEach (création)
    const res = await userApi.create(createUserPayload());
    const user = await res.json();

    await use(user);

    // 🔥 afterEach (cleanup)
    await userApi.delete(user.id);
  }
});

export { expect } from '@playwright/test';