import { APIRequestContext } from '@playwright/test';

export class UserAPI {
  constructor(private request: APIRequestContext) {}

  async getAll() {
    return this.request.get('/products');
  }

  async create(payload: any) {
    return this.request.post('/users/register', { data: payload });
  }

  async delete(id: string) {
    return this.request.delete(`/users/${id}`);
  }
}