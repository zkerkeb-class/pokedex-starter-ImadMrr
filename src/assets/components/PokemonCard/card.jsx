import React, { useState, useEffect } from 'react';
import '../../../App.css';
import pokemons from '../../pokemons';
import { mapTypes } from '../../mapTypes';
import { mapColorsTypes } from '../../mapColorsTypes';
import ShinyChanges from '../PokemonImage/imageShiny';
import { fetchPokemonById } from '../../APIcall/getbyId';
import { toggleFavorite, fetchFavorites } from '../../APIcall/favoritesAPI'; // ← AJOUT

function getCardBackground(types) {
  if (types.length === 1) {
    return `linear-gradient(135deg, ${mapColorsTypes[types[0]]}, ${mapColorsTypes[types[0]]})`;
  } else if (types.length === 2) {
    return `linear-gradient(135deg, ${mapColorsTypes[types[0]]}, ${mapColorsTypes[types[1]]})`;
  }
}

function PokemonCard({ id }) {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ← NOUVEAU

  // Vérifier connexion utilisateur
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true si token existe
  }, []);

  // Récupérer le Pokémon
  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true);
      const fetchedPokemon = await fetchPokemonById(id);
      setPokemon(fetchedPokemon);
      setIsLoading(false);
    };
    getPokemon();
  }, [id]);

  // Vérifier si c'est un favori
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favorites = await fetchFavorites();
        const isFav = favorites.some((fav) => fav.id === id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Erreur lors de la vérification des favoris :', error);
      }
    };
    checkFavorite();
  }, [id]);

  const handleFavoriteClick = async () => {
    try {
      const updatedFavorite = await toggleFavorite(id);
      setIsFavorite(updatedFavorite);
    } catch (error) {
      console.error('Erreur lors du changement de favori :', error);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!pokemon) {
    return <div>Pokémon introuvable.</div>;
  }

  const types = pokemon.type;
  const imageTypes = types.map((type) => mapTypes[type]);
  const backgroundStyle = getCardBackground(types);

  return (
    <>
      <div className="pokemon-card" style={{ background: backgroundStyle }}>
        
        {/* Bouton coeur */}
        {isLoggedIn && (
          <div className="favorite-icon" onClick={handleFavoriteClick}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={isFavorite ? 'red' : 'none'} 
              stroke="red" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            >
              <path d="M20.8 4.6c-1.7-1.8-4.5-1.8-6.2 0l-.6.6-.6-.6c-1.7-1.8-4.5-1.8-6.2 0-1.8 1.8-1.8 4.6 0 6.4l6.8 6.9 6.8-6.9c1.7-1.8 1.7-4.6 0-6.4z" />
            </svg>
          </div>
        )}

        {/* Types */}
        <div className="types">
          {imageTypes.map((image, index) => (
            <img key={index} src={image} alt="type" />
          ))}
        </div>

        {/* Nom et HP */}
        <div className="name-hp">
          <h2 className="pokemon-name">{pokemon.name.french}</h2>
          <h3 className="hp">{pokemon.base.HP} HP</h3>
        </div>

        {/* Image shiny */}
        {<ShinyChanges id={id} />}

        {/* Stats */}
        <div className="stats">
          <h3>Attack: {pokemon.base.Attack}</h3>
          <h3>Defense: {pokemon.base.Defense}</h3>
          <h3>Attack Spe: {pokemon.base["Sp. Attack"]}</h3>
          <h3>Defense Spe: {pokemon.base["Sp. Defense"]}</h3>
          <h3>Speed: {pokemon.base.Speed}</h3>
        </div>

      </div>
    </>
  );
}

export default PokemonCard;
