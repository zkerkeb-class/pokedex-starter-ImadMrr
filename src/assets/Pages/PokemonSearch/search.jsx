import React, { useState, useEffect } from 'react';
import { pokelist } from '../../APIcall/getlist'; // Récupération des Pokémon depuis l'API
import PokemonCard from '../../components/PokemonCard/card';
import './search.css';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType1, setSelectedType1] = useState('');
    const [selectedType2, setSelectedType2] = useState('');
    const [pokemons, setPokemons] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleType1Change = (event) => {
        setSelectedType1(event.target.value);
    };

    const handleType2Change = (event) => {
        setSelectedType2(event.target.value);
    };

    // Fonction pour récupérer les Pokémon depuis l'API
    const fetchPokemons = async () => {
        try {
            const data = await pokelist(); // Appel à l'API
            setPokemons(data); // Mettre à jour la liste des Pokémon avec les données renvoyées par l'API
        } catch (error) {
            console.error("Erreur lors de la récupération des Pokémons :", error);
        }
    };

    // Appel de la fonction au chargement du composant
    useEffect(() => {
        fetchPokemons();
    }, []);

    // Filtrer les Pokémon en fonction du nom et des types sélectionnés
    const filteredPokemons = pokemons.filter((pokemon) => {
        const matchesName = pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedType1 && selectedType2) {
            if (selectedType1 === selectedType2) {
                // Si même type sélectionné deux fois → uniquement les Pokémon monotype
                return (
                    matchesName &&
                    pokemon.type.length === 1 &&
                    pokemon.type[0] === selectedType1
                );
            } else {
                // Deux types différents → Pokémon qui a les deux
                return (
                    matchesName &&
                    pokemon.type.includes(selectedType1) &&
                    pokemon.type.includes(selectedType2)
                );
            }
        } else if (selectedType1) {
            return matchesName && pokemon.type.includes(selectedType1);
        } else if (selectedType2) {
            return matchesName && pokemon.type.includes(selectedType2);
        }

        return matchesName;
    });

    // Créer une liste des types uniques pour les options de filtrage
    const uniqueTypes = [...new Set(pokemons.flatMap(pokemon => pokemon.type))];

    return (
        <div className="search-and-filter">
            <input
                type="text"
                placeholder="Search a Pokemon..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <select value={selectedType1} onChange={handleType1Change}>
                <option value="">All types</option>
                {uniqueTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            <select value={selectedType2} onChange={handleType2Change}>
                <option value="">All types</option>
                {uniqueTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            <div className="pokemon-list">
                {filteredPokemons.map((pokemon) => (
                    <div key={pokemon.id} className="pokemon-card-container">
                        <PokemonCard id={pokemon.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
