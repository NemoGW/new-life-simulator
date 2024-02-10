import React, { createContext, useState, useContext, useCallback } from "react";

const TalentContext = createContext();

export const useTalents = () => useContext(TalentContext);

export const TalentProvider = ({ children }) => {
  const [selectedTalents, setSelectedTalents] = useState(new Set());

  const addTalent = (talents) => {
    setSelectedTalents(new Set([...selectedTalents, ...talents]));
  };

  return (
    <TalentContext.Provider value={{ selectedTalents, addTalent }}>
      {children}
    </TalentContext.Provider>
  );
};
