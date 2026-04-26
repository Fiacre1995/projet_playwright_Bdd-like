// api/services/notes.api.ts
import { APIRequestContext } from '@playwright/test';

export class NotesAPI {
  constructor(private request: APIRequestContext) {}

  async getAll() {
    return this.request.get('/notes/api/notes');
  }

  async getOne(id: string) {
    return this.request.get(`/notes/api/notes/${id}`);
  }

  async create(payload: any) {
    return this.request.post('/notes/api/notes', { data: payload });
  }

  async delete(id: string) {
    return this.request.delete(`/notes/api/notes/${id}`);
  }
}