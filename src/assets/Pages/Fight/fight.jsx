import React, { useState, useEffect } from 'react';
import { pokelist } from '../../APIcall/getlist';
import { fetchPokemonById } from '../../APIcall/getbyId';
import { saveCombat } from '../../APIcall/saveCombat';
import { updateHP } from '../../APIcall/updateHP';
import { getVersusImage } from '../../APIcall/getVersusImage';
import './fight.css';

function Fight() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [versusImage, setVersusImage] = useState(null);
  const [message, setMessage] = useState('');
  const [winner, setWinner] = useState(null);
  const [actions, setActions] = useState({ player1: null, player2: null });
  const [awaiting, setAwaiting] = useState(1);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await pokelist();
        setPokemons(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon :', error);
      }
    };
    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchVersusImage = async () => {
      try {
        const image = await getVersusImage();
        setVersusImage(image);
      } catch (error) {
        console.error("Erreur image 'versus' :", error);
      }
    };
    fetchVersusImage();
  }, []);

  const handleSelectPokemon = async (id, player) => {
    try {
      const pokemon = await fetchPokemonById(id);
      if (player === 1) {
        setPokemon1({ ...pokemon, currentHP: pokemon.base.HP });
      } else {
        setPokemon2({ ...pokemon, currentHP: pokemon.base.HP });
      }
    } catch (error) {
      console.error('Erreur chargement Pokémon :', error);
    }
  };

  useEffect(() => {
    if (pokemon1 && pokemon2) {
      saveCombat(pokemon1, pokemon2);
      setAwaiting(1);
    }
  }, [pokemon1, pokemon2]);

  useEffect(() => {
    if (pokemon1 && pokemon1.currentHP <= 0) {
      setWinner(pokemon2);
    } else if (pokemon2 && pokemon2.currentHP <= 0) {
      setWinner(pokemon1);
    }
  }, [pokemon1, pokemon2]);

  const handleAction = (player, action) => {
    if (processing || winner) return;

    setActions((prev) => {
      const newActions = { ...prev, [player]: action };
      if (newActions.player1 && newActions.player2) {
        resolveTurn(newActions);
      } else {
        setAwaiting(player === 'player1' ? 2 : 1);
      }
      return newActions;
    });
  };

  const resolveTurn = async ({ player1, player2 }) => {
    setProcessing(true);

    const p1 = pokemon1;
    const p2 = pokemon2;
    const messages = [];

    const first = p1.base.Speed >= p2.base.Speed ? 'player1' : 'player2';
    const second = first === 'player1' ? 'player2' : 'player1';

    const getAction = (player) => player === 'player1' ? player1 : player2;
    const getPokemon = (player) => player === 'player1' ? pokemon1 : pokemon2;
    const getTarget = (player) => player === 'player1' ? pokemon2 : pokemon1;
    const getSetTarget = (player) => player === 'player1' ? setPokemon2 : setPokemon1;

    const doAttack = async (attacker, defender, setDefender, defenderAction) => {
      if (defenderAction === 'dodge') {
        const dodgeSuccess = Math.random() >= 0.33;
        if (dodgeSuccess) {
          return `${defender.name.french} a esquivé l'attaque de ${attacker.name.french} avec agilité !`;
        } else {
          messages.push(`${defender.name.french} a tenté d’esquiver mais a échoué.`);
          // On inflige quand même les dégâts
        }
      }

      const damage = attacker.base.Attack;
      const newHP = Math.max(defender.currentHP - damage, 0);
      setDefender({ ...defender, currentHP: newHP });
      await updateHP(defender.id, newHP);
      return `${attacker.name.french} a infligé ${damage} dégâts à ${defender.name.french}`;
    };

    if (player1 === 'dodge' && player2 === 'dodge') {
      messages.push("Les deux Pokémon sont sur la défensive. Aucun dégât ce tour.");
    } else {
      for (const player of [first, second]) {
        const action = player === 'player1' ? player1 : player2;
        const actor = getPokemon(player);
        const target = getTarget(player);
        const targetAction = player === 'player1' ? player2 : player1;
        const setTarget = getSetTarget(player);

        if (actor.currentHP <= 0) continue;

        if (action === 'attack') {
          const attackMsg = await doAttack(actor, target, setTarget, targetAction);
          if (attackMsg) {
            if (player1 === 'attack' && player2 === 'attack') {
              if (player === first) {
                messages.push(`${attackMsg} (attaque prioritaire)`);
              } else {
                messages.push(attackMsg);
              }
            } else {
              messages.push(attackMsg);
            }
          }

        } else if (action === 'dodge') {
          const wasTargetedByAttack =
            (player === 'player1' && player2 === 'attack') ||
            (player === 'player2' && player1 === 'attack');

          if (!wasTargetedByAttack) {
            messages.push(`${actor.name.french} se met en position défensive.`);
          }
        }
      }
    }

    let index = 0;
    const showNextMessage = () => {
      if (index < messages.length) {
        setMessage(messages[index]);
        index++;
        setTimeout(showNextMessage, 1800);
      } else {
        setMessage('');
        setActions({ player1: null, player2: null });
        setAwaiting(1);
        setProcessing(false);
      }
    };

    showNextMessage();
  };

  const resetFight = () => {
    setPokemon1(null);
    setPokemon2(null);
    setWinner(null);
    setMessage('');
    setActions({ player1: null, player2: null });
    setAwaiting(1);
    setProcessing(false);
  };

  return (
    <div className="fight-container">
      <h1>Combat Pokémon</h1>

      {/* Sélection des Pokémon */}
      {!pokemon1 || !pokemon2 ? (
        <div className="selection">
          <div>
            <h2>Choisir Pokémon 1</h2>
            <select onChange={(e) => handleSelectPokemon(e.target.value, 1)}>
              <option value="">-- Sélectionner --</option>
              {pokemons.map((pokemon) => (
                <option key={pokemon.id} value={pokemon.id}>
                  {pokemon.name.french}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2>Choisir Pokémon 2</h2>
            <select onChange={(e) => handleSelectPokemon(e.target.value, 2)}>
              <option value="">-- Sélectionner --</option>
              {pokemons.map((pokemon) => (
                <option key={pokemon.id} value={pokemon.id}>
                  {pokemon.name.french}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      {/* Affichage des Pokémon */}
      {pokemon1 && pokemon2 && !winner && (
        <>
          <div className="battlefield">
            <div className="pokemon">
              <h3>{pokemon1.name.french}</h3>
              <img src={pokemon1.image} alt={pokemon1.name.french} />
              <p>PV : {pokemon1.currentHP}</p>
            </div>

            <div className="versus">
              {versusImage ? (
                <img src={versusImage} alt="Versus" />
              ) : (
                <p>Chargement de l'image...</p>
              )}
            </div>

            <div className="pokemon">
              <h3>{pokemon2.name.french}</h3>
              <img src={pokemon2.image} alt={pokemon2.name.french} />
              <p>PV : {pokemon2.currentHP}</p>
            </div>
          </div>

          <div className="actions">
            <h2>{awaiting === 1 ? pokemon1.name.french : pokemon2.name.french} choisit une action</h2>
            <button
              onClick={() => handleAction(awaiting === 1 ? 'player1' : 'player2', 'attack')}
              disabled={processing}
            >
              Attaquer
            </button>
            <button
              onClick={() => handleAction(awaiting === 1 ? 'player1' : 'player2', 'dodge')}
              disabled={processing}
            >
              Esquiver
            </button>
          </div>
        </>
      )}

      {/* Message */}
      {message && <p className="message">{message}</p>}

      {/* Gagnant */}
      {winner && (
        <div className="winner">
          <h1>{winner.name.french} est le gagnant !</h1>
          <img src={winner.image} alt={winner.name.french} className="winner-image" />
          <button onClick={resetFight}>Recommencer</button>
        </div>
      )}
    </div>
  );
}

export default Fight;
