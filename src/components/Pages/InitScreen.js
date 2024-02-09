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
          <h2>
            In the realm of existence, we inherit our birth without choice.
          </h2>
          <h3>
            Yet here, amidst possibilities, we wield the power to choose the
            talents that accompany our emergence.
          </h3>
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
