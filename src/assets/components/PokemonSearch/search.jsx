import React, { useState } from 'react';
import pokemons from '../../pokemons';
import PokemonCard from '../PokemonCard/card';
import './search.css';
  
function Search() {
  
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const filteredPokemons = pokemons.filter((pokemon) => {
        const matchesName = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType ? pokemon.type.includes(selectedType) : true;
        return matchesName && matchesType;
    });

    const uniqueTypes = [...new Set(pokemons.flatMap(pokemon => pokemon.type))];

    return (
        <div className="search-and-filter">
            <input type="text" placeholder="Search a Pokemon..." value={searchTerm} onChange={handleSearchChange} />
            <select value={selectedType} onChange={handleTypeChange}>
                <option value="">All types</option>
                {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
                ))}
            </select>
            
            <div className="pokemon-list">

                {filteredPokemons.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-card-container">
                    <PokemonCard id={parseInt(pokemon.id)-1} />
                </div>

                ))}
            </div>

        </div>
    );

  };
  export default Search;
  