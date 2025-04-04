import React, { useState } from 'react';

// Liste des types de Pokémon
const pokemonTypes = [
  "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", 
  "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", 
  "Steel", "Fairy"
];

const API_URL = "http://localhost:3000/api/create"; // Assure-toi que ton API accepte cette route

function CreatePokemon() {
  // États pour gérer les valeurs des champs du formulaire
  const [name, setName] = useState('');
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [hp, setHp] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [spAttack, setSpAttack] = useState('');
  const [spDefense, setSpDefense] = useState('');
  const [speed, setSpeed] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fonction pour remplir automatiquement les champs
  const handleAutoFill = () => {
    setHp(50); // Valeurs fictives pour l'exemple
    setAttack(55);
    setDefense(40);
    setSpAttack(60);
    setSpDefense(50);
    setSpeed(50);
  };

  // Fonction pour gérer le changement du premier type
  const handleType1Change = (event) => {
    setType1(event.target.value);
  };

  // Fonction pour gérer le changement du deuxième type
  const handleType2Change = (event) => {
    setType2(event.target.value);
  };

  // Fonction pour envoyer les données du formulaire à l'API
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Si aucun type n'est sélectionné pour type1, on affiche un message d'erreur.
    if (!type1) {
      setSuccessMessage("Veuillez sélectionner au moins un type.");
      return;
    }

    // Si un seul type est sélectionné, type2 est vide. On envoie seulement type1 dans ce cas.
    const typesToSend = type2 ? [type1, type2] : [type1]; // Si type2 est sélectionné, on ajoute le type2, sinon on envoie juste type1

    const newPokemon = {
      name,
      type: typesToSend,  // Tableau des types (1 ou 2 types)
      HP: hp,
      Attack: attack,
      Defense: defense,
      "Sp. Attack": spAttack,
      "Sp. Defense": spDefense,
      Speed: speed,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPokemon),
      });

      if (response.ok) {
        setSuccessMessage("Pokémon créé avec succès !");
      } else {
        setSuccessMessage("Erreur lors de la création du Pokémon.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      setSuccessMessage("Erreur lors de la création du Pokémon.");
    }
  };

  return (
    <div>
      <h2>Créer un Nouveau Pokémon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Type 1 :</label>
          <select value={type1} onChange={handleType1Change} required>
            <option value="">Sélectionnez un type</option>
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Type 2 :</label>
          <select value={type2} onChange={handleType2Change}>
            <option value="">Sélectionnez un type (facultatif)</option>
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>HP :</label>
          <input
            type="number"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Attack :</label>
          <input
            type="number"
            value={attack}
            onChange={(e) => setAttack(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Defense :</label>
          <input
            type="number"
            value={defense}
            onChange={(e) => setDefense(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sp. Attack :</label>
          <input
            type="number"
            value={spAttack}
            onChange={(e) => setSpAttack(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sp. Defense :</label>
          <input
            type="number"
            value={spDefense}
            onChange={(e) => setSpDefense(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Speed :</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
          />
        </div>

        {/* Bouton pour remplir automatiquement les champs */}
        <button type="button" onClick={handleAutoFill}>
          Remplir automatiquement
        </button>
        {/* Bouton pour soumettre le formulaire */}
        <button type="submit">Valider</button>
      </form>

      {/* Affichage du message de succès ou d'erreur */}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CreatePokemon;
