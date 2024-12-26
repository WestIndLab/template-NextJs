'use client';

import { useEffect } from 'react';

export default function Home(): React.JSX.Element {
  useEffect(() => {
    // Variables publiques (accessibles côté client)
    console.log('Variable publique:', process.env.NEXT_PUBLIC_ENV_VARIABLE);

    // Les variables privées ne sont PAS accessibles ici
    console.log('Variable privée (undefined):', process.env.ENV_VARIABLE);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Exemple de variables d'environnement</h1>
        <p>Variable publique: {process.env.NEXT_PUBLIC_ENV_VARIABLE}</p>

        {/* Les variables privées ne sont pas accessibles dans le rendu */}
        <p>Variable privée: {process.env.ENV_VARIABLE || 'Non accessible côté client'}</p>
      </div>
    </main>
  );
}
