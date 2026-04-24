// fixtures/user.fixture.ts
import { test as base } from './api.fixture';
import { createUserPayload } from '../data/user.factory';

type Fixtures = {
  user: {
    email: string;
    password: string;
    token: string;
  };
};

export const test = base.extend<Fixtures>({
  user: async ({ userApi }, use) => {
    const payload = createUserPayload();

    // register
    await userApi.register(payload);

    // login
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
  }
});

export { expect } from '@playwright/test';