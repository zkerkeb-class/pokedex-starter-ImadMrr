import { useState } from 'react'
import '../../../App.css';
import pokemons from '../../pokemons'
import { mapTypes } from '../../mapTypes';
import { mapColorsTypes } from '../../mapColorsTypes';
import ShinyChanges from '../PokemonImage/imageShiny';
import ChangePokemon from '../PokemonChanges/change';


 // -------------------BACKGROUND COLOR FUNCTIONS--------------------
 function getCardBackground(types) {
  if (types.length === 1) {
    return `linear-gradient(135deg, ${mapColorsTypes[types[0]]}, ${mapColorsTypes[types[0]]})`; // Un seul type
  } else if (types.length === 2) {
    return `linear-gradient(135deg, ${mapColorsTypes[types[0]]}, ${mapColorsTypes[types[1]]})`; // Deux types
  }
}


function PokemonCard() {

  // -------------------POKEMON INFO-------------------

  // état de l'id 
  const [id, setCurrentId] = useState(0); //Premier pokemon commence à 0
  console.log("ID : ", id);

  const pokemon = pokemons[String(id)] 
  // const [pokemonId, setPokemonId] = useState(pokemon.id)
  
  const name = pokemon.name["french"]
  const types = pokemon.type
  const imageTypes = types.map((type) => mapTypes[type]); // mappage des types
  const stats = pokemon.base
  const hp = stats["HP"]
  const attack = stats["Attack"]
  const def = stats["Defense"]
  const attackSpe = stats["Sp. Attack"]
  const defSpe = stats["Sp. Defense"]
  const speed = stats["Speed"]

  const backgroundStyle = getCardBackground(types); // Couleur de fond en fonction du type
  console.log("COLORS  : ", backgroundStyle);


  return (
    <>

      <div className="pokemon-card" style={{ background: backgroundStyle }}>
        
        <div className="types">
            {imageTypes.map((image, index) => (
              <img key={index} src={image} />
            ))}
        </div>
        
        <div className="name-hp">
          <h2 className="pokemon-name">{name}</h2>
          <h3 className="hp">{hp} HP</h3>
          </div>

        <ShinyChanges id={id} />   

        <div className="stats">
          <h3>Attack: {attack}</h3>
          <h3>Defense: {def}</h3>
          <h3>Attack Spe: {attackSpe}</h3>
          <h3>Defense Spe: {defSpe}</h3>
          <h3>Speed: {speed}</h3>
        </div>

        <ChangePokemon prevId={id} setCurrentId={setCurrentId}/>  
        
      </div>
    
    </>
  )
};
export default PokemonCard;
