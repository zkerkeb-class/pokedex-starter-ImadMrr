import { useState, useEffect } from 'react';
import '../../../App.css';
import { fetchPokemonById } from '../../APIcall/getbyId';
import { getShinyImageById } from '../../APIcall/getShiny';

function ShinyChanges({ id }) {
  const [image, setImage] = useState('');
  const [originalImage, setOriginalImage] = useState('');
  const [isShiny, setIsShiny] = useState(false);

  // Récupérer l'image normale au début
  useEffect(() => {
    const fetchImage = async () => {
      const pokemon = await fetchPokemonById(id);
      setOriginalImage(pokemon.image);
      setImage(pokemon.image);
      setIsShiny(false);
    };
    fetchImage();
  }, [id]);

  // Gestion du clic
  const handleImageClick = async () => {
    if (!isShiny) {
      const shinyImage = await getShinyImageById(id);
      if (shinyImage) {
        setImage(shinyImage);
        setIsShiny(true);
      }
    } else {
      setImage(originalImage);
      setIsShiny(false);
    }
  };

  return (
    <div>
      <img 
        src={image} 
        className="pokemon-img" 
        alt="Pokemon" 
        style={{ cursor: 'pointer' }} 
        onClick={handleImageClick}
      />
    </div>
  );
}

export default ShinyChanges;
