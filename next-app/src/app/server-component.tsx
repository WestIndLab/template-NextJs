// Composant serveur (pas de 'use client')
export default function ServerComponent() {
  // Dans un composant serveur, vous avez accès aux deux types de variables
  const privateVar = process.env.ENV_VARIABLE;
  const publicVar = process.env.NEXT_PUBLIC_ENV_VARIABLE;

  return (
    <div>
      <h2>Composant Serveur</h2>
      <p>Variable privée: {privateVar}</p>
      <p>Variable publique: {publicVar}</p>
    </div>
  );
}
