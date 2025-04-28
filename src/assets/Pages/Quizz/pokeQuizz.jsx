import React, { useState, useEffect } from 'react';
import { fetchQuizzQuestions } from '../../APIcall/getQuizzQuestions';
import './quizz.css';

function Quizz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuizzQuestions();
        const quizObj = Array.isArray(data) ? data[0] : data;

        // ✅ Filtrage des questions valides uniquement
        const questionsArray = Object.values(quizObj).filter(q =>
          q && q.question && q.A && q.B && q.C && q.awnser
        );

        setQuestions(questionsArray);
        console.log("✅ Questions valides chargées :", questionsArray);
      } catch (error) {
        console.error('Erreur chargement quiz :', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];

    if (selectedAnswer === currentQuestion.awnser.trim()) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedAnswer('');
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setQuizFinished(false);
  };

  const getTauntMessage = () => {
    if (score === questions.length) return "Tu es un maître Pokémon !";
    if (score >= Math.floor(questions.length / 2)) return "Pas mal ! Mais t’as encore des badges à gagner... ";
    return "Aïe… Va falloir revoir tes bases, jeune dresseur... ";
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <p>Chargement du quiz...</p>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="quiz-container">
        <h2>Résultat du Quiz</h2>
        <p>Ton score : {score} / {questions.length}</p>
        <p className="taunt">{getTauntMessage()}</p>
        <button onClick={handleRestart} className="restart-button">Recommencer le quiz</button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-container">
      <h2>Question {currentIndex + 1} / {questions.length}</h2>
      <p className="question-text">{currentQuestion.question}</p>
      <form className="answers">
        {['A', 'B', 'C'].map((key) => (
          <label key={key} className="answer-option">
            <input
              type="radio"
              name="answer"
              value={key}
              checked={selectedAnswer === key}
              onChange={() => setSelectedAnswer(key)}
            />
            {currentQuestion[key]}
          </label>
        ))}
      </form>
      <button
        className="next-button"
        onClick={handleNext}
        disabled={!selectedAnswer}
      >
        Suivant
      </button>
    </div>
  );
}

export default Quizz;
