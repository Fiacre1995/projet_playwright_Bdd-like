// api/services/user.api.ts
import { APIRequestContext } from '@playwright/test';

export class UserAPI {
  constructor(private request: APIRequestContext) {}

  async register(payload: any) {
    return this.request.post('/notes/api/users/register', { data: payload });
  }

  async login(payload: any) {
    return this.request.post('/notes/api/users/login', { data: payload });
  }

  async delete(token: string) {
    return this.request.delete('/notes/api/users/delete-account', {
      headers: {
        'x-auth-token': `${token}`
      }
    });
  }
}