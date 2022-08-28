import { QuestionCards } from "./Components/QuestionCards";



function App() {
  const begin = () =>{

  }
  const nextQuestion = () =>{

  }
  return (
    <div className="App">
      <h2>Quiz</h2>
      <button className="start" onClick={begin}>
        Begin Quiz
      </button>
      <button className="start" onClick={nextQuestion}>
        Next Quiz
      </button>
     <QuestionCards />
    </div>
  );
}

export default App;
