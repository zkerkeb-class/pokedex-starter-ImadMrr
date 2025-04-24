import React, { useState, useEffect } from 'react';
import { pokelist } from './getlist';
import { fetchPokemonById } from './getbyId';
import './update.css';

function UpdatePokemon() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: ['', ''],
    base: {
      HP: 0,
      Attack: 0,
      Defense: 0,
      SpAttack: 0,
      SpDefense: 0,
      Speed: 0,
    },
    image: '', // Ajout de la propriété image
  });
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
  const handleSelectPokemon = async (pokemon) => {
    setSearchTerm(pokemon.name.french);
    setSuggestions([]);

    try {
      const fullPokemon = await fetchPokemonById(pokemon.id);
      setSelectedPokemon(fullPokemon);

      // Pré-remplir le formulaire
      setFormData({
        name: fullPokemon.name.french,
        type: fullPokemon.type.length === 1 ? [fullPokemon.type[0], ''] : fullPokemon.type,
        base: {
          HP: fullPokemon.base.HP,
          Attack: fullPokemon.base.Attack,
          Defense: fullPokemon.base.Defense,
          specialAttack: fullPokemon.base['Sp. Attack'], // Mappez ici
          specialDefense: fullPokemon.base['Sp. Defense'], // Mappez ici
          Speed: fullPokemon.base.Speed,
        },
        image: fullPokemon.image || '', // Pré-remplir l'image si elle existe
      });
    } catch (error) {
      console.error('Erreur lors de la récupération du Pokémon :', error);
    }
  };

  // Mettre à jour le formulaire
  const handleChange = (e, field, isBase = false) => {
    if (isBase) {
      setFormData({
        ...formData,
        base: {
          ...formData.base,
          [field]: parseInt(e.target.value, 10) || 0,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  // Mettre à jour un type
  const handleTypeChange = (index, value) => {
    const newTypes = [...formData.type];
    newTypes[index] = value;
    setFormData({
      ...formData,
      type: newTypes[0] === newTypes[1] ? [newTypes[0]] : newTypes,
    });
  };

  // Fonction pour envoyer la mise à jour du Pokémon à l'API
  const updatePokemon = async (id, updatedData) => {
    const API_URL = `http://localhost:3000/api/update`; // URL correcte de l'API

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur lors de la mise à jour du Pokémon :', errorText);
        throw new Error(errorText); // Lève une vraie erreur lisible
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du Pokémon :', error);
      throw error;
    }
  };

  // Soumettre les modifications
  const handleSubmit = async () => {
    if (!selectedPokemon) {
      alert('Veuillez sélectionner un Pokémon');
      return;
    }

    try {
      
      const base = {
        HP: formData.base.HP,
        Attack: formData.base.Attack,
        Defense: formData.base.Defense,
        'Sp. Attack': formData.base.specialAttack, // Mappez ici
        'Sp. Defense': formData.base.specialDefense, // Mappez ici
        Speed: formData.base.Speed,
      };

      const updatedData = {
        id: selectedPokemon.id, // Inclure l'ID du Pokémon
        name: { french: formData.name }, // Assurer que 'name' est sous forme d'objet
        type: formData.type.filter((t) => t), // Enlever les types vides
        base: base,
        image: formData.image, // Inclure l'image dans les données mises à jour
      };

      await updatePokemon(selectedPokemon.id, updatedData);
      setMessage('Pokémon mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du Pokémon :', error);
      setMessage('Erreur lors de la mise à jour du Pokémon.');
    }
  };

  return (
    <div className="update-container">
      <h1>Mettre à jour un Pokémon</h1>

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

      {/* Formulaire de mise à jour */}
      {selectedPokemon && (
        <div className="update-form">
          <label>Nom :</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')}
          />

          <label>Type 1 :</label>
          <input
            type="text"
            value={formData.type[0]}
            onChange={(e) => handleTypeChange(0, e.target.value)}
          />

          <label>Type 2 :</label>
          <input
            type="text"
            value={formData.type[1]}
            onChange={(e) => handleTypeChange(1, e.target.value)}
          />

          <label>Image :</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => handleChange(e, 'image')}
          />

          {Object.entries(formData.base).map(([key, value]) => (
            <div key={key}>
              <label>{key} :</label>
              <input
                type="number"
                value={value}
                onChange={(e) => handleChange(e, key, true)}
              />
            </div>
          ))}

          <button onClick={handleSubmit}>Mettre à jour</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default UpdatePokemon;