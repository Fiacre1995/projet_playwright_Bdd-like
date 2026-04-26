export function createNotePayload() {

const prefixes = ['Home', 'Work', 'Personal'];
const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  return {
    category: randomPrefix,
    completed: true,
    title: `Note_${Date.now()}`,
    description: `description_${Date.now()}`,
  };
}