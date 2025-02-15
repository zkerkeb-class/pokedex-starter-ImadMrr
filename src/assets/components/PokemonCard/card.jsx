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


function PokemonCard({id}) {

    // -------------------POKEMON INFO-------------------

    const pokemon = pokemons[String(id)] 
    
    // console.log("ID recup : ", id);
    // console.log("POKEMON : ", pokemon);

    const types = pokemon.type
    console.log("TYPES : ", types);
    const imageTypes = types.map((type) => mapTypes[type]); // mappage des types
    

    const backgroundStyle = getCardBackground(types); // Couleur de fond en fonction du type


    return (
        <>

        <div className="pokemon-card" style={{ background: backgroundStyle }}>
            
            <div className="types">
                {imageTypes.map((image, index) => (
                <img key={index} src={image} />
                ))}
            </div>
            
            <div className="name-hp">
                <h2 className="pokemon-name">{pokemon.name.french}</h2>
                <h3 className="hp">{pokemon.base.HP} HP</h3>
            </div>

            <ShinyChanges id={id} />   

            <div className="stats">
            <h3>Attack: {pokemon.base.Attack}</h3>
            <h3>Defense: {pokemon.base.Defense}</h3>
            <h3>Attack Spe: {pokemon.base["Sp. Attack"]}</h3>
            <h3>Defense Spe: {pokemon.base["Sp. Defense"]}</h3>
            <h3>Speed: {pokemon.base.Speed}</h3>
            </div>

            {/* <ChangePokemon prevId={id} setCurrentId={setCurrentId}/>   */}
            
        </div>
        
        </>
    )
};
export default PokemonCard;
