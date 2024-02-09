import "./App.css";
import StartScreen from "./components/Pages/StartScreen";
import InitScreen from "./components/Pages/InitScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TraitsProvider } from "./components/Information/TraitsContext";
import TalentCard from "./components/Pages/TalentCard";
import InitTrait from "./components/Pages/InitTrait";
import MainGame from "./components/Pages/MainGame";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const THEME = createTheme({
  typography: {
    fontFamily: '"PT Serif", serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <BrowserRouter>
        <TraitsProvider>
          <Routes>
            <Route exact path="/" element={<StartScreen />} />
            <Route path="/talent" element={<TalentCard />} />
            <Route path="/init" element={<InitScreen />} />
            <Route path="/trait" element={<InitTrait />} />
            <Route path="/game" element={<MainGame />} />
          </Routes>
        </TraitsProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
