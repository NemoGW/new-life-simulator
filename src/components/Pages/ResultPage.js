import React from "react";
import { useTraits } from "../Information/TraitsContext";
import "../PagesStyle/ResultPage.css";

function ResultPage() {
  const { traits } = useTraits();

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

  return (
    <div>
      {Object.keys(traits).map((trait) => (
        <div className="traits-result">
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultPage;
