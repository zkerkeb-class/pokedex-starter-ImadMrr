//import pokemons from '../../pokemons'
import {pokelist} from '../../APIcall/getlist';
import { useState, useEffect } from 'react';
import PokemonCard from '../../components/PokemonCard/card';
import './list.css'
  



function List() {

    const [pokemons, setPokemons] = useState([]);

    // Charger la liste des Pokémons depuis l'API
    useEffect(() => {
        const catchedList = async () => {
            try {
                const data = await pokelist(); // Appel de l'API
                setPokemons(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des Pokémons :", error);
            }
        };
        catchedList();
    }, []);

    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon) => (
                console.log("POKEMON ID : ", pokemon.id),
                <div key={pokemon.id} className="pokemon-card-container">
                        <PokemonCard id={parseInt(pokemon.id)} />
                </div>
            ))}
        </div>
    );
}
export default List;
  