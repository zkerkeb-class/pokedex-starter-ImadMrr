export const toggleFavorite = async (pokemonId) => {
    try {
      const response = await fetch('http://localhost:3000/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pokemonId }),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour des favoris');
      }
  
      const data = await response.json();
      return data.isFavorite; // Retourne le statut mis à jour (favori ou non)
    } catch (error) {
      console.error('Erreur lors de la mise à jour des favoris :', error);
      throw error;
    }
  };
  
  export const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/favorites');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des favoris');
      }
  
      const data = await response.json();
      console.log('Liste des favoris récupérée :', data.favorites);
      return data.favorites; // Retourne la liste des favoris
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris :', error);
      throw error;
    }
  };