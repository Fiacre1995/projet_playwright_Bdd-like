import { test, expect } from '../api/fixtures/user.fixture';

test('test avec user auto', async ({ page, user }) => {
  console.log(user.email);

  expect(user.id).toBeDefined();
});