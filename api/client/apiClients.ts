// api/client/apiClient.ts
import { request } from '@playwright/test';

export async function createApiClient() {
  return await request.newContext({
    baseURL: 'https://practice.expandtesting.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  });
}