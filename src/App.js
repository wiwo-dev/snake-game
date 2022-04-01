//import "./App.css";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";

import SnakeGame from "./pages/SnakeGame";
import Page2 from "./pages/Page2";
import Results from "./pages/Results";
import StartScreen from "./pages/StartScreen";

import { GameContext, GameContextProvider } from "./context/GameContext";
import ResultsFirebase from "./pages/ResultsFirebase";
import GameOver from "./pages/GameOver";
import GamePage from "./pages/GamePage";

function App() {
  //const navigate = useNavigate();
  const onResize = () => {
    document.querySelector(":root").style.setProperty("--vh", window.innerHeight / 100 + "px");
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const [userName, setUserName] = useState("John Smith");
  const value = useMemo(() => ({ userName, setUserName }), [userName]);

  return (
    <div>
      {/* <div className="flex items-center justify-around w-full h-10 bg-pink-600">
        <a href="#/" onClick={() => navigate("/")}>
          Snake
        </a>
        <a href="#/" onClick={() => navigate("/2")}>
          Page2
        </a>
        <a href="#/" onClick={() => navigate("/results")}>
          Results
        </a>
      </div> */}

      <Routes>
        <Route
          path="/"
          element={
            <GameContextProvider>
              {/* <StartScreen /> */}

              <nav>
                <ul className="flex gap-4">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/results">Results</Link>
                  </li>
                  <li>
                    <Link to="/gameover">Game Over</Link>
                  </li>
                  <li>
                    <Link to="/game">Game</Link>
                  </li>
                  <li>
                    <Link to="/nothing-here">Nothing Here</Link>
                  </li>
                </ul>
              </nav>
              <section className="min-h-screen bg-primary">
                <Outlet />
              </section>
            </GameContextProvider>
          }>
          <Route index element={<StartScreen />} />
          <Route path="/results" element={<ResultsFirebase />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/gameover" element={<GameOver />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<p>**WSZYSTKO**</p>} />
        </Route>
      </Routes>

      {/* <SnakeGame /> */}
    </div>
  );
}

export default App;
