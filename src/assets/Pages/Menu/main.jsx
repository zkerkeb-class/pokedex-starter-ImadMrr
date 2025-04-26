import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Vérifie si un token est présent
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token
    setIsLoggedIn(false);
  };

  const handleProtectedAction = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Accès refusé',
        text: 'Veuillez vous connecter pour accéder à cette fonctionnalité.',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        showCloseButton: true
      });
    }
  };
  

  return (
    <>
      <h1>POKE WORLD</h1>
      <div className="Choices">
        <div className="Choice1">
          <Link to="/listPokemon">
            <button>All pokemon</button>
          </Link>
        </div>
        <div className="Choice2">
          <Link to="/quizz">
            <button>Quizz</button>
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
        <div className="Choice5">
          <button onClick={() => handleProtectedAction('/create')}>Create</button>
        </div>
        <div className="Choice6">
          <button onClick={() => handleProtectedAction('/update')}>Update</button>
        </div>
        <div className="Choice7">
          <button onClick={() => handleProtectedAction('/delete')}>Delete</button>
        </div>
        {isLoggedIn && (
          <div className="Choice8">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!isLoggedIn && (
          <div className="Choice9">
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Main;