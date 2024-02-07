import React from "react";
import { useTraits } from "../Information/TraitsContext";
import { useState } from "react";
import { Button } from "@mui/material";
import "../PagesStyle/InitTrait.css";
import { useNavigate } from "react-router-dom";

function InitTrait() {
  const [points, setPoints] = useState(20);
  const { traits, updateTraits } = useTraits();
  const [initialTraits] = useState({ ...traits });

  const handleDecrement = (trait) => {
    if (traits[trait] > 0) {
      updateTraits({ [trait]: traits[trait] - 1 });
      setPoints(points + 1);
    }
  };

  const handleIncrement = (trait) => {
    if (points > 0) {
      updateTraits({ [trait]: traits[trait] + 1 });
      setPoints(points - 1);
    }
  };

  const handleRandom = () => {
    let pointsToDistribute = 20; // Use a local variable to track points to distribute
    const traitsToUpdate = { ...initialTraits };

    while (pointsToDistribute > 0) {
      const whichTrait = Object.keys(traitsToUpdate);
      const traitKeys = whichTrait.slice(0, -1);
      const randomTrait =
        traitKeys[Math.floor(Math.random() * traitKeys.length)];
      const pointAllocation = 1; // Allocate one point at a time
      traitsToUpdate[randomTrait] += pointAllocation;
      pointsToDistribute -= pointAllocation;
    }

    // Apply the random distribution to the state
    updateTraits(traitsToUpdate, false);
    setPoints(0);
  };

  const navigate = useNavigate();
  const startGame = () => {
    navigate("/game");
  };
  return (
    <div className="in-container">
      <h1>Adjust initial stats</h1>
      <p>Available attribute points: {points}</p>
      <div>
        {Object.keys(traits)
          .slice(0, -1)
          .map((trait) => (
            <div key={trait}>
              <Button
                onClick={() => handleDecrement(trait)}
                disabled={traits[trait] <= 0}
                className="minus"
              >
                ➖
              </Button>
              <span className="traits">
                {trait} : {traits[trait]}
              </span>

              <Button
                onClick={() => handleIncrement(trait)}
                disabled={points <= 0}
                className="plus"
              >
                ➕
              </Button>
            </div>
          ))}
      </div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleRandom}
          className="btn"
        >
          Rondomly assigned
        </Button>
      </div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          className="btn"
          onClick={startGame}
        >
          Begin your life
        </Button>
      </div>
      <div>Strength : {traits.strength}</div>
      <div>intelligence : {traits.intelligence}</div>
      <div>wealth : {traits.wealth}</div>
    </div>
  );
}

export default InitTrait;
