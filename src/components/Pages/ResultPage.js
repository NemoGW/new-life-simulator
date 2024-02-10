import React, { useState } from "react";
import { useTraits } from "../Information/TraitsContext";
import "../PagesStyle/ResultPage.css";

function ResultPage() {
  const { traits } = useTraits();
  const { livedAge, setLivedAge } = useState();

  function getStrengthMessage(value) {
    if (value < 0) return "You have the weakest body.";
    if (value < 20) return "You can barely walk";
    if (value >= 20 && value <= 40) return "You are among the most people";
    if (value > 40) return "You are a super man, super strong";
    return "";
  }

  function getIntelligenceMessage(value) {
    if (value < 0) return "You have no brain";
    if (value < 20) return "You are as smart as a 12 year old kid";
    if (value >= 20 && value <= 40) return "You are among the most people";
    if (value > 40) return "You are the next Albert Einstein";
    return "";
  }

  function getApperanceMessage(value) {
    if (value < 0) return "Sad";
    return "";
  }
  function getWealthMessage(value) {
    if (value < 0) return "Sad";
    return "";
  }
  function getHappinessMessage(value) {
    if (value < 0) return "Sad";
    return "";
  }
  const age = (props) => {
    setLivedAge(props.livedAge);
  };

  return (
    <div>
      {Object.keys(traits).map((trait) => (
        <div key={trait} className="traits-result">
          <div className="trait-name-result">{trait}</div>
          <div className="trait-value-result">
            {traits[trait]}
            {trait.toLowerCase() === "strength" && (
              <span className="trait-result-description">
                {getStrengthMessage(traits[trait])}
              </span>
            )}
            {trait.toLowerCase() === "intelligence" && (
              <span className="trait-result-description">
                {getIntelligenceMessage(traits[trait])}
              </span>
            )}
            {trait.toLowerCase() === "apperance" && (
              <span className="trait-result-description">
                {getApperanceMessage(traits[trait])}
              </span>
            )}
            {trait.toLowerCase() === "wealth" && (
              <span className="trait-result-description">
                {getWealthMessage(traits[trait])}
              </span>
            )}
            {trait.toLowerCase() === "happiness" && (
              <span className="trait-result-description">
                {getHappinessMessage(traits[trait])}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultPage;
