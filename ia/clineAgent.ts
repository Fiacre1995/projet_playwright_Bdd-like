import fs from "fs";
import { execSync } from "child_process";

type FixParams = {
  error: string;
  testCode: string;
  filePath: string;
};

export function runClineFix({ error, testCode, filePath }: FixParams): void {
  const prompt = `
Tu es un expert Playwright avec TypeScript.

Un test a échoué.

RÈGLE IMPORTANTE :
- La réponse API est considérée comme correcte
- Tu dois corriger UNIQUEMENT le test
- Tu dois appliquer la correction directement dans le code

Erreur:
${error}

Code:
${testCode}

Tâche obligatoire :
1. Identifier l'erreur
2. Corriger le test
3. Retourner UNIQUEMENT le code corrigé (pas d'explication)

Le code doit être complet et prêt à être copié.
`;

  fs.writeFileSync("ai_prompt.txt", prompt);

  // 🔥 Récupération de la réponse de Cline dans une variable
  const result = execSync(`cline ai_prompt.txt`, { encoding: "utf-8" });

  // 🔥 Nettoyage des balises markdown si Cline les ajoute
  const cleaned = result
    .replace(/^```(?:typescript|ts)?\n?/m, "")
    .replace(/```$/m, "")
    .trim();

  // 🔥 Écriture du code corrigé dans le fichier de test
  if (cleaned && cleaned.length > 0) {
    fs.writeFileSync(filePath, cleaned, "utf-8");
    console.log(`✅ Correction appliquée dans : ${filePath}`);
  } else {
    console.error("❌ Réponse vide ou invalide de Cline. Aucune correction appliquée.");
  }
}