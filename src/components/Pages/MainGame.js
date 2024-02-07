import React, { useState, useEffect, useRef } from "react";
import lifeEvents from "../Information/events.json";
import { useTraits } from "../Information/TraitsContext";

function MainGame() {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [initFamily, setInitFamily] = useState("");
  const [currentEvent, setCurrentEvent] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const { updateTraits, traits } = useTraits();
  const [occurredEvents, setOccurredEvents] = useState(new Set());

  const traitsRef = useRef(traits);
  traitsRef.current = traits;

  //function to randomly select an event for given age
  const selectRandomEventForAge = (age) => {
    const events = lifeEvents[age] || [];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    return randomEvent;
  };

  const getAgeRangeKey = (age) => {
    if (age >= 2 && age <= 5) return "2-5";
    if (age >= 6 && age <= 7) return "6-7";
    if (age >= 8 && age <= 10) return "8-10";

    return age.toString();
  };

  useEffect(() => {
    const KNOWN_TRAITS = ["strength", "intelligence", "wealth", "appearance"];

    const evaluateCondition = (traitValue, condition) => {
      const [operator, num] = condition.match(/[<>]=?|\d+/g);
      const number = parseInt(num, 10);
      switch (operator) {
        case ">=":
          return traitValue >= number;
        case "<=":
          return traitValue <= number;
        default:
          return false;
      }
    };

    const passesConditions = (event) => {
      return (
        !event.conditions ||
        Object.entries(event.conditions).every(([key, value]) =>
          evaluateCondition(traitsRef.current[key], value)
        )
      );
    };

    const selectEventForAge = (age) => {
      if (age === 0) {
        return selectRandomEventForAge("0");
      } else if (age === 1) {
        return selectRandomEventForAge("1");
      } else {
        return selectEventForOlderAges(age);
      }
    };

    const selectEventForOlderAges = (age) => {
      const ageRangeKey = getAgeRangeKey(age);
      const possibleEvents = lifeEvents[ageRangeKey] || [];
      const filteredEvents = possibleEvents.filter(
        (event) =>
          (!event.role || event.role === gender || event.role === "all") &&
          (!event.init || event.init === initFamily || event.init === "all") &&
          !occurredEvents.has(event.id) &&
          passesConditions(event)
      );

      if (filteredEvents.length > 0) {
        return filteredEvents[
          Math.floor(Math.random() * filteredEvents.length)
        ];
      }
      return { id: "No events" };
    };

    const applyEventEffects = (event) => {
      const totalEffects = {};

      // Check if talent.effects exists and has properties
      if (event.impact && Object.keys(event.impact).length > 0) {
        // Iterate over each effect in talent.effects
        Object.entries(event.impact).forEach(([key, value]) => {
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
      updateTraits(totalEffects, true);
    };

    const handleAgeSpecificEvent = (eventForCurrentAge) => {
      if (age === 0) {
        setGender(eventForCurrentAge.role);
      } else if (age === 1) {
        setInitFamily(eventForCurrentAge.init);
      }

      if (eventForCurrentAge.status === "over") {
        setGameOver(true);
      }

      setCurrentEvent(eventForCurrentAge);
      setOccurredEvents(occurredEvents.add(eventForCurrentAge.id));
    };

    let eventForCurrentAge = selectEventForAge(age);
    handleAgeSpecificEvent(eventForCurrentAge);
    applyEventEffects(eventForCurrentAge);
  }, [age, gender, initFamily, updateTraits, occurredEvents]);

  const advanceAge = () => {
    if (!gameOver) {
      setAge((prevAge) => prevAge + 1);
    }
  };

  if (gameOver) {
    // Render a game over message and potentially provide options to restart
    return (
      <div>
        {currentEvent.description}
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );
  }

  return (
    <div
      onClick={advanceAge}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Age: {age}</h2>
      <p>
        {currentEvent.description || "Nothing particular happened this year."}
      </p>
      <p>{traits.strength}</p>
      <p>{traits.intelligence}</p>
    </div>
  );
}

export default MainGame;
