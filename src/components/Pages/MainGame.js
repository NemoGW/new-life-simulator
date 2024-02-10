import React, { useState, useEffect, useRef } from "react";
import lifeEvents from "../Information/events.json";
import { useTraits } from "../Information/TraitsContext";
import "../PagesStyle/MainGame.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResultPage from "./ResultPage";
import { useTalents } from "../Information/TalentContext";

function MainGame() {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [initFamily, setInitFamily] = useState("");
  const [currentEvent, setCurrentEvent] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const { updateTraits, traits } = useTraits();
  const [occurredEvents, setOccurredEvents] = useState(new Set());
  const [pastEvents, setPastEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { selectedTalents } = useTalents();

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
    if (age >= 8 && age <= 12) return "8-12";
    if (age >= 13 && age <= 17) return "13-17";

    return age.toString();
  };

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
      return filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
    } else return { id: "No events" };
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

  const handleTalent = (event) => {
    if (event.status === "accident") {
      if (selectedTalents.has(4)) {
        event.status = "";
        event.description = "However, a superman came to save you!";
        selectedTalents.delete(4);
      } else {
        event.status = "over";
      }
    }
  };

  const handleAgeSpecificEvent = (eventForCurrentAge) => {
    if (age === 0) {
      setGender(eventForCurrentAge.role);
    } else if (age === 1) {
      setInitFamily(eventForCurrentAge.init);
    }
    handleTalent(eventForCurrentAge);

    if (eventForCurrentAge.status === "over") {
      setGameOver(true);
    }
    setCurrentEvent(eventForCurrentAge);
    setOccurredEvents(occurredEvents.add(eventForCurrentAge.id));
    setPastEvents((pastEvents) => [
      ...pastEvents,
      { age, ...eventForCurrentAge },
    ]);
    applyEventEffects(eventForCurrentAge);
  };

  const eventsEndRef = useRef(null);

  const scrollToBottom = () => {
    eventsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let eventForCurrentAge = selectEventForAge(age);
    handleAgeSpecificEvent(eventForCurrentAge);
  }, [age]);

  const advanceAge = () => {
    if (!gameOver) {
      setAge((prevAge) => prevAge + 1);
    } else {
      setShow(true);
    }
    scrollToBottom();
  };

  const navigate = useNavigate();

  const onRestart = () => {
    navigate("/");
    window.location.reload();
  };

  const onViewPage = () => {
    setShowResult(true);
  };

  return (
    //Bug rendered twice for the first time
    <div className="main-border">
      {showResult ? (
        <ResultPage livedAge={age} />
      ) : (
        <div onClick={advanceAge} className="game-border">
          {pastEvents.slice(1).map((e, i) => (
            <div key={i} className="age-event" ref={eventsEndRef}>
              <span className="age">Age {e.age}: </span>
              <span className="event-description">
                {e.description || "Nothing particular happened this year."}
              </span>
            </div>
          ))}
        </div>
      )}

      <div>
        {show ? (
          <div className="end-game-btn">
            <Button variant="outlined" onClick={onViewPage}>
              View Result
            </Button>
            <Button variant="outlined" onClick={onRestart}>
              Restart
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MainGame;
