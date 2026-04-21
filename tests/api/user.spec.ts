import { test } from '../../api/fixtures/api.fixture';
import { expect } from '@playwright/test';
import { Given, When, Then } from '../../utils/bdd';

test('User API', async ({ userApi }) => {
  //const payload = createUserPayload();

  await Given('I am on login page', async () => {

    const listeRes = await userApi.getAll();
    expect(listeRes.status()).toBe(200);
    const user = await listeRes.json();
    console.log(user);
          
   });

  //await userApi.delete(user.id);
});


