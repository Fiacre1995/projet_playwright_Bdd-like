import { test as base } from '@playwright/test';
import { createApiClient } from '../client/apiClients';
import { UserAPI } from '../services/user.api';

// 👇 on définit le type des fixtures
type MyFixtures = {
  userApi: UserAPI;
};


// 👇 on étend avec le type
export const test = base.extend<MyFixtures>({
  userApi: async ({}, use) => {
    const client = await createApiClient();
    await use(new UserAPI(client));
    await client.dispose();
  }
});