# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\api\note.api.spec.ts >> CRUD Notes >> Lister les notes
- Location: tests\api\note.api.spec.ts:10:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 202
Received: 200
```

```
Error: Command failed: cline ai_prompt.txt
```

# Test source

```ts
  1  | import fs from "fs";
  2  | import { execSync } from "child_process";
  3  | 
  4  | type FixParams = {
  5  |   error: string;
  6  |   testCode: string;
  7  |   filePath: string;
  8  | };
  9  | 
  10 | export function runClineFix({ error, testCode, filePath }: FixParams): void {
  11 |   const prompt = `
  12 | Tu es un expert Playwright avec TypeScript.
  13 | 
  14 | Un test a échoué.
  15 | 
  16 | RÈGLE IMPORTANTE :
  17 | - La réponse API est considérée comme correcte
  18 | - Tu dois corriger UNIQUEMENT le test
  19 | - Tu dois appliquer la correction directement dans le code
  20 | 
  21 | Erreur:
  22 | ${error}
  23 | 
  24 | Code:
  25 | ${testCode}
  26 | 
  27 | Tâche obligatoire :
  28 | 1. Identifier l’erreur
  29 | 2. Corriger le test
  30 | 3. Retourner UNIQUEMENT le code corrigé (pas d'explication)
  31 | 
  32 | Le code doit être complet et prêt à être copié.
  33 | `;
  34 | 
  35 |   fs.writeFileSync("ai_prompt.txt", prompt);
  36 | 
> 37 |   execSync(`cline ai_prompt.txt`, { stdio: "inherit" });
     |           ^ Error: Command failed: cline ai_prompt.txt
  38 | }
```