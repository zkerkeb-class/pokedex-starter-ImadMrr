import React, { useState, useEffect } from 'react';
import { pokelist } from './getlist';
import { fetchPokemonById } from './getbyId';
import './update.css';

function UpdatePokemon() {

  const token = localStorage.getItem('token');

  console.log("TOKEN", token);

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: ['', ''],
    base: {
      HP: 0,
      Attack: 0,
      Defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      Speed: 0,
    },
    image: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await pokelist();
        setPokemons(data);
        const types = [...new Set(data.flatMap(p => p.type))].sort();
        setUniqueTypes(types);
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon :', error);
      }
    };
    fetchPokemons();
  }, []);

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

  const handleSelectPokemon = async (pokemon) => {
    setSearchTerm(pokemon.name.french);
    setSuggestions([]);

    try {
      const fullPokemon = await fetchPokemonById(pokemon.id);
      setSelectedPokemon(fullPokemon);

      setFormData({
        name: fullPokemon.name.french,
        type: fullPokemon.type.length === 1 ? [fullPokemon.type[0], ''] : fullPokemon.type,
        base: {
          HP: fullPokemon.base.HP,
          Attack: fullPokemon.base.Attack,
          Defense: fullPokemon.base.Defense,
          specialAttack: fullPokemon.base['Sp. Attack'],
          specialDefense: fullPokemon.base['Sp. Defense'],
          Speed: fullPokemon.base.Speed,
        },
        image: fullPokemon.image || '',
      });
    } catch (error) {
      console.error('Erreur lors de la récupération du Pokémon :', error);
    }
  };

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

  const handleTypeChange = (index, value) => {
    const newTypes = [...formData.type];
    newTypes[index] = value;
    setFormData({
      ...formData,
      type: newTypes[0] === newTypes[1] ? [newTypes[0]] : newTypes,
    });
  };

  const updatePokemon = async (id, updatedData) => {
    const API_URL = `http://localhost:3000/api/update`;

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Authorization': token,},
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur lors de la mise à jour du Pokémon :', errorText);
        throw new Error(errorText);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du Pokémon :', error);
      throw error;
    }
  };

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
        'Sp. Attack': formData.base.specialAttack,
        'Sp. Defense': formData.base.specialDefense,
        Speed: formData.base.Speed,
      };

      const updatedData = {
        id: selectedPokemon.id,
        name: { french: formData.name },
        type: formData.type.filter((t) => t), // supprime les vides
        base: base,
        image: formData.image,
      };

      await updatePokemon(selectedPokemon.id, updatedData);
      setMessage('Pokémon mis à jour avec succès !');
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du Pokémon.');
    }
  };

  return (
    <div className="update-container">
      <h1>Mettre à jour un Pokémon</h1>

      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((pokemon) => (
            <li key={pokemon.id} onClick={() => handleSelectPokemon(pokemon)}>
              {pokemon.name.french}
            </li>
          ))}
        </ul>
      )}

      {selectedPokemon && (
        <div className="update-form">
          <label>Nom :</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')}
          />

          <label>Type 1 :</label>
          <select
            value={formData.type[0]}
            onChange={(e) => handleTypeChange(0, e.target.value)}
          >
            <option value="">-- Sélectionner un type --</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <label>Type 2 :</label>
          <select
            value={formData.type[1]}
            onChange={(e) => handleTypeChange(1, e.target.value)}
          >
            <option value="">-- Aucun --</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

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
