export async function getShinyImageById(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/pokemons/${id}/shiny`);
      
      if (response.status === 204) {
        return null; // Pas d'image shiny
      }
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'image shiny');
      }
  
      const data = await response.json();
      return data.imageShiny;
    } catch (error) {
      console.error("Erreur API getShinyImageById :", error);
      return null;
    }
  }
  