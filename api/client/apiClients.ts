import { request } from '@playwright/test';

export async function createApiClient() {
  return await request.newContext({
    baseURL: 'https://dummyjson.com',
    extraHTTPHeaders: {
      Authorization: `Bearer TOKEN`,
      'Content-Type': 'application/json'
    }
  });
}