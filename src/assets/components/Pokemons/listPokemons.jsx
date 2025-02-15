import pokemons from '../../pokemons'
import PokemonCard from '../PokemonCard/card';
import './list.css'
  

function List() {
    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon) => (
                console.log("POKEMON ID : ", pokemon.id),
                <div key={pokemon.id} className="pokemon-card-container">
                        {/* <h2 > {pokemon.name.french} </h2> 
                        <img src={pokemon.image} />
                        <h2>  {pokemon.type}  </h2>
                        <h2>  {pokemon.base.Attack} </h2>
                        <h2>  {pokemon.base.Defense} </h2>
                        <h2>  {pokemon.base.HP} </h2> */}
                        <PokemonCard id={parseInt(pokemon.id)-1} />
                </div>
            ))}
        </div>
    );
}
export default List;
  