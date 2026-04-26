# Commande d'exécution des tests
npx playwright test

# Installer process pour avoir multi environnement
npm install -D @types/node

# Exécution par environnement
$env:ENV="local"; npx playwright test

# Exécuté des tests provenat de package.json


# Liste de touts les tests du projet
npx playwright test --list

# Liste des installations 
npx playwright install --list

# Commande pour générer mon test 
npx playwright codegen url

# Exécution avec l'interface de débogage
npx playwright test --ui

# Exécuté mes tests en mode debug 
npx playwright test --debug
npx playwright test example.spec.ts --debug