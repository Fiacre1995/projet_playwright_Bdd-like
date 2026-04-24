export function createNotePayload() {

const prefixes = ['Home', 'Work', 'Personal'];
const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  return {
    category: randomPrefix,
    title: `Note_${Date.now()}`,
    description: `description_${Date.now()}`,
  };
}