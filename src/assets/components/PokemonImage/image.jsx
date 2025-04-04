import '../../../App.css';
import { pokemonImages } from '../../imageLibrary';

function ImgPokemon({pokemonId}) {

  const img = pokemonImages[pokemonId]

  return (
        <div>
            <img src={img} />
        </div>
  );

}export default ImgPokemon;
