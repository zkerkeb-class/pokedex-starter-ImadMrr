import pokemons from '../../pokemons'
import ImgPokemon from '../../components/PokemonImage/image';
import './list.css'
  

function List() {
    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-card-container">
                        <h2 > {pokemon.name.french} </h2> 
                        <img src={pokemon.image} />
                        {/* <ImgPokemon id={pokemon.id} />   */}
                        <h2>  {pokemon.type}  </h2>
                        <h2>  {pokemon.image} </h2>
                        <h2>  {pokemon.base.Attack} </h2>
                        <h2>  {pokemon.base.Defense} </h2>
                        <h2>  {pokemon.base.HP} </h2>
                </div>
            ))}
        </div>
    );
}
export default List;
  