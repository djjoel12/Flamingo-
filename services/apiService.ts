import type { Trip } from '../types';

/**
 * Interroge un backend externe pour trouver des voyages.
 * @param from - Ville de départ
 * @param to - Ville d'arrivée
 * @param date - Date du voyage
 * @returns Une promesse qui résout en un tableau de voyages (Trip[]).
 */
export const findTrips = async (from: string, to: string, date: string): Promise<Trip[]> => {
  // L'URL du backend Node.js que vous exécuterez localement ou sur Codespaces.
  const API_BASE_URL = 'http://localhost:5001';
  
  // Construit l'URL complète avec les paramètres de recherche
  const queryParams = new URLSearchParams({ from, to, date });
  const requestUrl = `${API_BASE_URL}/api/trips?${queryParams}`;

  console.log(`Interrogation du backend réel à l'adresse : ${requestUrl}`);

  try {
    const response = await fetch(requestUrl);

    if (!response.ok) {
      // Gère les erreurs HTTP comme 404 ou 500
      const errorData = await response.text();
      console.error('Erreur du serveur backend:', response.status, errorData);
      throw new Error(`Erreur du serveur backend: ${response.status}`);
    }

    const trips: Trip[] = await response.json();
    return trips;

  } catch (error) {
    // Gère les erreurs réseau (ex: le backend n'est pas lancé)
    console.error('Erreur lors de la communication avec le backend:', error);
    throw new Error('Impossible de se connecter à nos services. Veuillez réessayer plus tard.');
  }
};