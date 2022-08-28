import { useState } from "react";
import { QuestionCard } from "./Components/QuestionCards";

import { Difficulty, fetchQuizQuestions, QuestionsState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  questions: string;
  answer: string;
  correct: boolean;
  correctAnswers: string;

};
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);


  const begin = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  const nextQuestion = async () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }

  }

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        questions: questions[number].question,
        answer,
        correct,
        correctAnswers: questions[number].correct_answer,

      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const TOTAL_QUESTIONS = 10;

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="App">
          <h2>Quiz</h2>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className='start' onClick={begin}>
              Start
            </button>
          ) : null}
          {!gameOver ? <p className='score'>Score: {score}</p> : null}
          {loading ? <p>Loading Questions...</p> : null}
          {!loading && !gameOver && (
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              // userAnswer={""}
              callback={checkAnswer}
            />
          )}
          {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
            <button className='next' onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
        </div>
      </Wrapper >
    </>
  );
}

export default App;
