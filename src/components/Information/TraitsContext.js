import React, { createContext, useState, useContext, useCallback } from "react";

// Create a context for the traits
const TraitsContext = createContext();

// Hook to use the traits context
export const useTraits = () => useContext(TraitsContext);

// Provider component that wraps your app and makes the traits context available everywhere
export const TraitsProvider = ({ children }) => {
  const [traits, setTraits] = useState({
    appearance: 0,
    intelligence: 0,
    strength: 0,
    wealth: 0,
    happiness: 0,
  });

  // Function to update traits
  // const updateTraits = useCallback((traitChanges) => {
  //   setTraits((prevTraits) => {
  //     const updatedTraits = { ...prevTraits }; // Start with a copy of the previous traits
  //     Object.entries(traitChanges).forEach(([key, value]) => {
  //       // Add the change to the existing value for each trait
  //       const currentTraitValue = prevTraits[key] || 0;
  //       updatedTraits[key] = currentTraitValue + value;
  //     });
  //     return updatedTraits;
  //   });
  // }, []);

  // Function to update traits
  const updateTraits = useCallback(
    (traitChanges, shouldAdd) => {
      setTraits((prevTraits) => {
        if (!shouldAdd) {
          // If shouldAdd is false, just return the previous traits without changes
          return { ...prevTraits, ...traitChanges };
        }

        // If shouldAdd is true, add the changes to the existing traits
        const updatedTraits = { ...prevTraits }; // Start with a copy of the previous traits
        Object.entries(traitChanges).forEach(([key, value]) => {
          // Add the change to the existing value for each trait
          const currentTraitValue = prevTraits[key] || 0;
          updatedTraits[key] = currentTraitValue + value;
        });
        return updatedTraits;
      });
    },
    [setTraits]
  ); // setTraits should be a dependency if it's coming from useState

  return (
    <TraitsContext.Provider value={{ traits, updateTraits }}>
      {children}
    </TraitsContext.Provider>
  );
};
