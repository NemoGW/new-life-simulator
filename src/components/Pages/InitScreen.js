import { Button } from "@mui/material";
import React, { useState } from "react";
import TalentCard from "./TalentCard";

function InitScreen() {
  const [show, setShow] = useState(true);
  const onHide = () => setShow(false);

  return (
    <div className="in-container">
      {show ? (
        <div className="out-container">
          <Button variant="outlined" className="draw-card-btn" onClick={onHide}>
            🃏 Draw Talent Cards
          </Button>
        </div>
      ) : (
        <TalentCard />
      )}
    </div>
  );
}

export default InitScreen;
