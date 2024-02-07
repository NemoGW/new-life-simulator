import React, { useState, useEffect } from "react";
import { useTraits } from "../Information/TraitsContext";
import talentData from "../Information/traitCards.json";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../PagesStyle/TalentCard.css";

function TalentCard() {
  const [availableTalents, setAvailableTalents] = useState([]);
  const [selectedTalents, setSelectedTalents] = useState(new Set());
  const { updateTraits, traits } = useTraits();
  const KNOWN_TRAITS = ["strength", "intelligence", "wealth", "appearance"];

  const navigate = useNavigate();

  useEffect(() => {
    const shuffledTalents = [...talentData].sort(() => 0.5 - Math.random());

    setAvailableTalents(shuffledTalents.slice(0, 10));
  }, []);

  const handleSelectTalents = (talent) => {
    const newSelection = new Set(selectedTalents);
    if (newSelection.has(talent.id)) {
      newSelection.delete(talent.id);
    } else {
      if (newSelection.size < 3) {
        newSelection.add(talent.id);
      } else {
        alert("You can only select up to 3 events.");
      }
    }
    setSelectedTalents(newSelection);
  };

  const handleSubmit = () => {
    // Object to accumulate the effects from all selected talents
    const totalEffects = {};

    selectedTalents.forEach((talentId) => {
      const talent = talentData.find((t) => t.id === talentId);

      // Check if talent.effects exists and has properties
      if (talent.effects && Object.keys(talent.effects).length > 0) {
        // Iterate over each effect in talent.effects
        Object.entries(talent.effects).forEach(([key, value]) => {
          // Convert the trait key to lowercase for case-insensitive comparison
          const traitKey = key.toLowerCase();

          // Check if the trait is one of the known traits and accumulate the effect
          if (KNOWN_TRAITS.includes(traitKey)) {
            if (!totalEffects[traitKey]) {
              totalEffects[traitKey] = 0; // Initialize if not already present
            }
            totalEffects[traitKey] += value; // Accumulate the value for this trait
          }
        });
      }
    });

    // After accumulating effects from all selected talents, update the traits
    updateTraits(totalEffects, true);

    navigate("/trait");
  };

  //navigate to next page

  return (
    <div>
      <h1>Initial Talent Tree</h1>
      <p>Please pick 3 talents</p>
      <div>
        {availableTalents.map((talent) => (
          <div
            key={talent.id}
            onClick={() => handleSelectTalents(talent)}
            className={`talent ${
              selectedTalents.has(talent.id) ? "selected" : ""
            }`}
          >
            {talent.description}
          </div>
        ))}
      </div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
        className="cfn-selection-btn"
      >
        Confirm Selection
      </Button>
    </div>
  );
}

export default TalentCard;
