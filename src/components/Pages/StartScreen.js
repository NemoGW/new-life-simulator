import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "../PagesStyle/StartScreen.css";

function StartScreen() {
  const navigate = useNavigate();

  const onRestart = () => {
    navigate("/init");
  };

  return (
    <div className="out-container">
      <h1>New Life Simulator</h1>
      <p>I can't continue living this miserable life anymore!</p>
      <Button
        variant="outlined"
        color="primary"
        onClick={onRestart}
        className="button-restart"
      >
        🔁 RESTART MY LIFE
      </Button>
    </div>
  );
}

export default StartScreen;
