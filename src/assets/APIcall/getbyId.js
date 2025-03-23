// Fonction pour récupérer un Pokémon par ID depuis l'API
export const fetchPokemonById = async (id) => {
    const API_URL = `http://localhost:3000/api/pokemons/${id}`;
    
    try {
      const response = await fetch(API_URL);
  
      if (!response.ok) {
        throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Retourne l'objet Pokémon récupéré
    } catch (error) {
      console.error("Erreur lors de la récupération du Pokémon :", error);
      return null; // Si une erreur se produit, retourne null
    }
  };
  