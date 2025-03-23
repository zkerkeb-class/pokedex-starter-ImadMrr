import { useState, useEffect } from 'react'
import '../../../App.css';
import { pokemonImages } from '../../imageLibrary';
import { imageShiny } from '../../imageShiny';
import pokemons from '../../pokemons'


function ShinyChanges({id}) {

    const pokemon = pokemons[String(id)] 
    const pokemonId = pokemon.id

    // console.log("POKEMON ID : ", pokemonId);
    // console.log("MON ID : ", id);

    // état du clique
    const [clicked, setClicked] = useState(false);

    // const image = pokemonImages[pokemonId];
    const shiny = imageShiny[pokemonId];

    // état de l'image du Pokemon
    const [image, setImage] = useState(pokemonImages[pokemonId]); 
    // console.log("PokeID : ", pokemonId);
    // console.log("IMAGE : ", image);

    // -------------------SWITCH IMAGE FUNCTIONS--------------------------
    /*const changeImage = () => {
        setClicked(!clicked); 
        setImage(clicked ? pokemonImages[pokemonId] : shiny); //On passe à l'image shiny
    };

    // useEffect nous permet de changer l'image et de sortir du mode shiny lorsque react detecte un changement d'id
    useEffect(() => {
        setClicked(false);
        setImage(pokemonImages[pokemonId]);
    }, [id]);*/


    return (
        <div>
            <img src={image} className="pokemon-img" style={{ cursor: 'pointer' }} />
        </div>
    )};
    export default ShinyChanges;
