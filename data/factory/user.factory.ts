export function createUserPayload() {
  return {
    email: `test_${Date.now()}@mail.com`,
    name: `user_${Date.now()}`,
    password: '12345678'
  };
}