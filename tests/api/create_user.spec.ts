import {  APIRequestContext, expect } from '@playwright/test';
import { createUserPayload } from '../../data/user.factory';
import { test } from '../../fixtures/create_user.fixture';

const payload = createUserPayload();

test('test creation d\'un utilisateur', async ({ request }: { request: APIRequestContext }) => {

  const response = await request.post('https://practice.expandtesting.com/notes/api/users/register',
   {
    data: payload
   }
  );

  console.log(await response.json());

  expect(response.status()).toBe(201);
  expect(await response.json()).toHaveProperty('message', 'User account created successfully');
});

test('test avec user auto', async ({ user, page }) => {
  console.log(user);

  // 🔥 injection token dans navigateur (login sans UI)
  await page.addInitScript((token) => {
    localStorage.setItem('token', token);
  }, user.token);

  // 🔥 navigation
  await page.goto('https://practice.expandtesting.com/notes/app/login');
  await expect(page.getByTestId('home')).toContainText('MyNotes');
});