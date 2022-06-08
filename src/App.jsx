import React, { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

const App = () => {
  const [solution, setSolution] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/solutions")
      .then((res) => res.json())
      .then((data) => {
        //random int betweeen 0 - 14
        const rendomSolution = data[Math.floor(Math.random() * data.length)];
        setSolution(rendomSolution.word);
      });
  }, [setSolution]);
  return (
    <div className="App">
      <h1>Wordle Game</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
};

export default App;
