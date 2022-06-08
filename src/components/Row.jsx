import React from "react";

const Row = ({ guess, currentGuess }) => {
  //   console.log(guess);
  if (guess) {
    return (
      <div className="row past">
        {guess.map((g, i) => (
          <div key={i} className={g.color}>
            {g.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className="row current">
        {letters.map((l, i) => (
          <div key={i} className="filled">
            {l}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((l, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
