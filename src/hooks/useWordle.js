import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]); //each guess is an array
  const [history, setHistory] = useState([]); //each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedkeys, setUsedkeys] = useState({});

  //format a guess into an array of letter object
  //eg : [{key: "a" , color: "yellow"} , {key: "b" , color: "gray"}]
  const formatGuess = () => {
    console.log("formatting the guess - ", currentGuess);
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => ({
      key: l,
      color: "gray",
    }));

    //find any green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    //find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  //add new guess to guesses state
  //update the isCorrect state if the guess is correct
  //add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prev) => [...prev, currentGuess]);
    setTurn((prev) => prev + 1);
    setUsedkeys((prev) => {
      let newKeys = { ...prev };
      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];
        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "gray" &&
          currentColor !== "yellow" &&
          currentColor !== "green"
        ) {
          newKeys[l.key] = "gray";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };

  //handle keyup event && track current guess
  //if the use press enter add the new guess
  const handleKeyup = ({ key }) => {
    //submitting the guess
    if (key === "Enter") {
      //only add guess if turn less than 5
      if (turn > 5) {
        console.log("you used all your guesses");
        return;
      }

      //do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log("you already tried this word");
        return;
      }

      //check word is 5 chars long
      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars long");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    //delete
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    //sure the word is abc
    if (/^[a-zA-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, guesses, currentGuess, isCorrect, usedkeys, handleKeyup };
};

export default useWordle;
