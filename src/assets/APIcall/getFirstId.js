export const getFirstId = async () => {

      // Appel de l'API pour récupérer la liste des Pokémon
      const API_URL  = 'http://localhost:3000/api/firstId';
      
      try {
        const response = await fetch(API_URL);
    
        if (!response.ok) {
          throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json();

        return data; // Retourne l'objet Pokémon récupéré
      } catch (error) {
        console.error("Erreur lors de la récupération du first ID :", error);
        return null; // Si une erreur se produit, retourne null
      }
};