import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from './assets/Pages/Menu/main';
import List from './assets/Pages/Pokemons/listPokemons';
import PokemonCard from './assets/components/PokemonCard/card';
import Fight from './assets/Pages/Fight/fight';
import Search from './assets/Pages/PokemonSearch/search';
import Create from './assets/APIcall/create';
import { getFirstId } from './assets/APIcall/getFirstId';
import UpdatePokemon from './assets/APIcall/update';
import DeletePokemon from './assets/APIcall/delete';


function App() {

    const [id, setCurrentId] = useState(null);

    useEffect(() => {
        const fetchFirstId = async () => {
            const firstId = await getFirstId();
            setCurrentId(firstId.firstID);
        };

        fetchFirstId();
    }, []);

    if (id === null) {
        return <div>Chargement...</div>;
    }
    

    return (
      <Router>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/listPokemon" element={<List />} />
              <Route path="/card" element={<PokemonCard id={id} />} />
              <Route path="/fight" element={<Fight />} />
              <Route path="/search" element={<Search />} />
              <Route path="/create" element={<Create />} />
              <Route path="/update" element={<UpdatePokemon />} />
              <Route path="/delete" element={<DeletePokemon />} />
          </Routes>
      </Router>
    );

}export default App;















/*
 // -------------------BACKGROUND COLOR FUNCTIONS--------------------
 function getCardBackground(types) {
  if (types.length === 1) {
    return `linear-gradient(135deg, ${mapColorsTypes[types[0]]}, ${mapColorsTypes[types[0]]})`; // Un seul type
  } else if (types.length === 2) {
    return `linear-gradient(135deg, ${mapColorsTypes[types[0]]}, ${mapColorsTypes[types[1]]})`; // Deux types
  }
}


function App() {

  // -------------------POKEMON INFO-------------------

  // état de l'id 
  const [id, setCurrentId] = useState(0); //Premier pokemon commence à 0
  console.log("ID : ", id);

  const pokemon = pokemons[String(id)] 
  const pokemonId = pokemon.id
  
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

  // const image = pokemonImages[pokemonId];
  const shiny = imageShiny[pokemonId];

  // état de l'image du Pokemon
  const [image, setImage] = useState(pokemonImages[pokemonId]); 

  // état du clique
  const [clicked, setClicked] = useState(false);


  const backgroundStyle = getCardBackground(types); // Couleur de fond en fonction du type
  console.log("COLORS  : ", backgroundStyle);

  // -------------------BUTTON FUNCTIONS-------------------------------

   
  const incrementId = () => {
    setCurrentId((prevId) => {
      console.log("Avant incrémentation:", prevId); 
      const newId = (prevId === 150 ? 0 : prevId + 1); // Si ID == 150 et incrémente => 0
      console.log("Après incrémentation:", newId); 
      return newId;
    });
  };

  const decrementId = () => {
    setCurrentId((prevId) => {
      console.log("Avant décrémentation:", prevId); 
      const newId = (prevId === 0 ? 150 : prevId - 1); // Si ID == 0 et décrémente => 150
      console.log("Après décrémentation:", newId);
      return newId;
    });
  };


  // -------------------SWITCH IMAGE FUNCTIONS--------------------------

  const changeImage = () => {
      setClicked(!clicked); 
      setImage(clicked ? pokemonImages[pokemonId] : shiny); //On passe à l'image shiny
  };

  // useEffect nous permet de changer l'image et de sortir du mode shiny lorsque react dtecte un changement d'id
  useEffect(() => {
    setClicked(false);
    setImage(pokemonImages[pokemonId]);
  }, [id]);


  return (
    <>
      
      
      <div className="pokemon-card" style={{ background: backgroundStyle }}>
        
        <div className="types">
            {imageTypes.map((image) => (
              <img src={image} />
            ))}
        </div>
        
        <div className="name-hp">
          <h2 className="pokemon-name">{name}</h2>
          <h3 className="hp">{hp} HP</h3>
          </div>


        <img src={image} className="pokemon-img"  onClick={changeImage} style={{ cursor: 'pointer' }} />
        
        <div className="stats">
          <h3>Attack: {attack}</h3>
          <h3>Defense: {def}</h3>
          <h3>Attack Spe: {attackSpe}</h3>
          <h3>Defense Spe: {defSpe}</h3>
          <h3>Speed: {speed}</h3>
        </div>
        
      </div>





    
      <div style={{ position: 'fixed', bottom: '20px', left: '20px' }}>
          
          <button onClick={decrementId}>-</button>

      </div>

      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
         
          <button onClick={incrementId}>+</button>

      </div>
      
    
      
    </>
  )
}

}export default App
*/