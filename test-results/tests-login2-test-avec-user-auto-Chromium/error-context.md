# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\login2.spec.ts >> test avec user auto
- Location: tests\login2.spec.ts:3:5

# Error details

```
SyntaxError: Unexpected token < in JSON at position 0
```

# Test source

```ts
  1  | import { test as base } from '@playwright/test';
  2  | import { createApiClient } from '../client/apiClients';
  3  | import { UserAPI } from '../services/user.api';
  4  | import { createUserPayload } from '../../data/user.factory';
  5  | 
  6  | type Fixtures = {
  7  |   user: any;
  8  |   userApi: UserAPI;
  9  | };
  10 | 
  11 | export const test = base.extend<Fixtures>({
  12 |   userApi: async ({}, use: (r: UserAPI) => Promise<void>) => {
  13 |     const client = await createApiClient();
  14 |     await use(new UserAPI(client));
  15 |     await client.dispose();
  16 |   },
  17 | 
  18 |   user: async ({ userApi }: { userApi: UserAPI }, use: (r: any) => Promise<void>) => {
  19 |     // 🔥 beforeEach (création)
  20 |     const res = await userApi.create(createUserPayload());
> 21 |     const user = await res.json();
     |                  ^ SyntaxError: Unexpected token < in JSON at position 0
  22 | 
  23 |     await use(user);
  24 | 
  25 |     // 🔥 afterEach (cleanup)
  26 |     await userApi.delete(user.id);
  27 |   }
  28 | });
  29 | 
  30 | export { expect } from '@playwright/test';
```