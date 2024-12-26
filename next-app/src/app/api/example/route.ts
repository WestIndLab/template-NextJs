// Exemple d'utilisation côté serveur (API Route)
import { NextResponse } from 'next/server';

export async function GET() {
  // Variables privées (côté serveur uniquement)
  const privateApiKey = process.env.ENV_VARIABLE;
  
  return NextResponse.json({ 
    message: "Cette route a accès aux variables privées",
    // Ne jamais exposer de variables privées dans la réponse ! 
    // Ceci est juste pour la démonstration
    serverEnvValue: privateApiKey 
  });
}
