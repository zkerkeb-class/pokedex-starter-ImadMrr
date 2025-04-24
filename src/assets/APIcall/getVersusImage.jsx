export const getVersusImage = async () => {
    const API_URL = 'http://localhost:3000/api/getVersusImage';
  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.versus; // Retourne l'URL de l'image "versus"
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'image "versus" :', error);
      throw error;
    }
  };