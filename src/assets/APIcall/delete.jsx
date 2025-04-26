import React, { useState, useEffect } from 'react';
import { pokelist } from './getlist';
import { fetchPokemonById } from './getbyId';
import './update.css';

function DeletePokemon() {

  const token = localStorage.getItem('token');

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [message, setMessage] = useState('');

  // Charger tous les Pokémon à l'initialisation
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await pokelist();
        setPokemons(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon :', error);
      }
    };
    fetchPokemons();
  }, []);

  // Mettre à jour la liste des suggestions
  useEffect(() => {
    if (searchTerm) {
      const filtered = pokemons.filter((p) =>
        p.name.french.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, pokemons]);

  // Gérer la sélection d'un Pokémon dans l'auto-complétion
  const handleSelectPokemon = (pokemon) => {
    setSearchTerm(pokemon.name.french);
    setSuggestions([]);
    setSelectedPokemon(pokemon);
  };

  // Fonction pour envoyer la requête de suppression à l'API
  const deletePokemon = async (id) => {
    const API_URL = 'http://localhost:3000/api/delete'; // URL correcte pour la suppression

    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Erreur : ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression du Pokémon :', error);
      throw error;
    }
  };

  // Soumettre la demande de suppression
  const handleDelete = async () => {
    if (!selectedPokemon) {
      alert('Veuillez sélectionner un Pokémon');
      return;
    }

    try {
      await deletePokemon(selectedPokemon.id);
      setMessage('Pokémon bien supprimé');
      setSelectedPokemon(null); // Réinitialiser la sélection après suppression
      setSearchTerm(''); // Réinitialiser la barre de recherche
    } catch (error) {
      setMessage('Erreur lors de la suppression du Pokémon.');
    }
  };

  return (
    <div className="update-container">
      <h1>Supprimer un Pokémon</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((pokemon) => (
            <li key={pokemon.id} onClick={() => handleSelectPokemon(pokemon)}>
              {pokemon.name.french}
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation et bouton de suppression */}
      {selectedPokemon && (
        <div className="delete-confirmation">
          <p>Êtes-vous sûr de vouloir supprimer le Pokémon {selectedPokemon.name.french} ?</p>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default DeletePokemon;
