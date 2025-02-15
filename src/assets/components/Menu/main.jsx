import { Link } from 'react-router-dom';
  
  
function Main() {
  
  
    return (
      <>

        <h1> POKE WORLD </h1>

        <div className="Choices" >
          
            <div className="Choice1">
                <Link to="/listPokemon">
                    <button>All pokemon</button>
                </Link>
            </div>
          
            <div className="Choice2">
                <Link to="/card">
                    <button>Pokedex</button>
                </Link>
            </div>
  
  
            <div className="Choice3">
                <Link to="/fight">
                    <button>Fight</button>
                </Link>
            </div>

            <div className="Choice4">
                <Link to="/search">
                    <button>Search</button>
                </Link>
            </div>
  
        </div>
      
      </>
    )
  };
  export default Main;
  