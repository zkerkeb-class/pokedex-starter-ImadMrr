import React, { useState, useEffect } from 'react';
import { fetchFavorites } from '../../APIcall/favoritesAPI';
import PokemonCard from '../../components/PokemonCard/card';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favoriteIds = await fetchFavorites();
        setFavorites(favoriteIds);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des favoris :', error);
      }
    };

    getFavorites();
  }, []);

  if (isLoading) {
    return <div>Chargement des favoris...</div>;
  }

  if (favorites.length === 0) {
    return <div>Aucun favori pour le moment.</div>;
  }

  return (
    <div className="favorites-container">
      <h2>Mes Pokémon Favoris</h2>
      <div className="favorites-grid">
        {favorites.map((favorite) => (
          <PokemonCard key={favorite.id} id={favorite.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;