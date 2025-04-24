export const updateHP = async (pokemonId, newHP) => {
    const API_URL = 'http://localhost:3000/api/updateHP';
  
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: pokemonId, newHP }),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
      }
  
      console.log('PV mis à jour avec succès !');
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour des PV :', error);
      throw error;
    }
  };