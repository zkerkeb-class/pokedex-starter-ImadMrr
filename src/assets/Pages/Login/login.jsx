import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Réponse API :', data);

      // ✅ Vérifie que le token est bien présent
      if (!response.ok || !data.token) {
        setError(data.message || 'Nom d’utilisateur ou mot de passe incorrect');
        return;
      }

      // ✅ Connexion réussie
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setError('');

      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: 'Vous êtes connecté avec succès !',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/'); // Redirection vers la page principale
      });
    } catch (error) {
      console.error('Erreur de login :', error);
      setError('Erreur serveur. Veuillez réessayer.');
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Cacher' : 'Voir'}
          </button>
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
