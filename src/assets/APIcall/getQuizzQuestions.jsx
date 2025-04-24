export const fetchQuizzQuestions = async () => {
    const API_URL = 'http://localhost:3000/api/getQuizzQuestions';
  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Retourne les questions
    } catch (error) {
      console.error('Erreur lors de la récupération des questions :', error);
      throw error;
    }
  };