// api/client/apiClient.ts
import { request } from '@playwright/test';

export async function createApiClient(token?: string) {
  return await request.newContext({
    baseURL: 'https://practice.expandtesting.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'x-auth-token': token || '' // Vous pouvez ajouter un token d'authentification ici si nécessaire
    }
  }); 
}