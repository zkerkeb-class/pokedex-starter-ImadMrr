export const saveCombat = async (firstPokemon, secondPokemon) => {
    const API_URL = 'http://localhost:3000/api/saveCombat';
  
    const combatData = {
      first: {
        id: firstPokemon.id,
        name: firstPokemon.name.french,
        base: firstPokemon.base,
        image: firstPokemon.image,
        type: firstPokemon.type,
      },
      second: {
        id: secondPokemon.id,
        name: secondPokemon.name.french,
        base: secondPokemon.base,
        image: secondPokemon.image,
        type: secondPokemon.type,
      },
    };
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combatData),
      });
  
      if (!response.ok) {
        throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
      }
  
      console.log('Combat enregistré avec succès !');
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du combat :', error);
      throw error;
    }
  };