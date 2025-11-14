import { GoogleGenAI, Type } from "@google/genai";
import type { Trip } from '../types';

// Initialise le client Gemini. La clé API est gérée par l'environnement.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Définit le schéma de données attendu de l'API Gemini.
// Cela garantit que la réponse de l'IA sera toujours dans un format structuré et prévisible,
// correspondant parfaitement à notre interface `Trip`.
const tripSchema = {
  type: Type.OBJECT,
  properties: {
    companyName: {
      type: Type.STRING,
      description: 'Le nom de la compagnie de transport (ex: UTB, AVS, CTE).',
    },
    departureTime: {
      type: Type.STRING,
      description: 'Heure de départ au format HH:MM.',
    },
    arrivalTime: {
      type: Type.STRING,
      description: 'Heure d\'arrivée au format HH:MM.',
    },
    price: {
      type: Type.INTEGER,
      description: 'Le prix du billet en Francs CFA (XOF).',
    },
    vehicleType: {
      type: Type.STRING,
      description: 'Le type de véhicule: "Bus", "Minibus", ou "VTC".',
    },
    stops: {
      type: Type.INTEGER,
      description: 'Le nombre d\'arrêts directs durant le trajet.',
    },
    amenities: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: 'Liste des commodités disponibles (ex: "Climatisation", "WiFi", "Prise USB").',
    },
  },
  required: ['companyName', 'departureTime', 'arrivalTime', 'price', 'vehicleType', 'stops', 'amenities'],
};

/**
 * Génère une liste de voyages en utilisant l'API Gemini.
 * @param from - Ville de départ
 * @param to - Ville d'arrivée
 * @param date - Date du voyage
 * @returns Une promesse qui résout en un tableau de voyages (Trip[]).
 */
export const generateTrips = async (from: string, to: string, date: string): Promise<Trip[]> => {
  const prompt = `Génère une liste de 4 à 6 trajets en bus ou minibus pour un voyage de ${from} à ${to} le ${date}. Sois réaliste en ce qui concerne les compagnies de transport, les horaires, les prix (en XOF) et les commodités disponibles en Côte d'Ivoire. Assure-toi que les horaires de départ et d'arrivée sont cohérents et réalistes pour la distance entre les villes. Fournis la réponse au format JSON en respectant le schéma spécifié.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: tripSchema,
        },
      },
    });

    const jsonStr = response.text.trim();
    const result = JSON.parse(jsonStr);
    
    // Valide que la réponse est bien un tableau
    if (!Array.isArray(result)) {
        console.error("La réponse de Gemini n'est pas un tableau:", result);
        throw new Error("Le format des données reçues de l'IA est incorrect.");
    }

    return result as Trip[];

  } catch (error) {
    console.error("Erreur lors de la génération des trajets avec Gemini:", error);
    throw new Error("Impossible de générer les options de voyage pour le moment. Veuillez réessayer.");
  }
};
