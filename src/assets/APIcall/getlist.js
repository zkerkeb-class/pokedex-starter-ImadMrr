const API_URL = "http://localhost:3000/api/pokemons";

// Fonction pour récupérer la liste des Pokémons
export const pokelist = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.pokemons; // Retourne la liste des Pokémons
  } catch (error) {
    console.error("Erreur lors de la récupération des Pokémons :", error);
    return [];
  }
};