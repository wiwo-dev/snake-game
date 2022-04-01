import React, { useEffect, useMemo, useRef, useState } from "react";

import { Routes, Route, Outlet, Link } from "react-router-dom";

import Page2 from "./pages/Page2";

import StartScreen from "./pages/StartScreen";

import { GameContext, GameContextProvider } from "./context/GameContext";

import GameOver from "./pages/GameOver";
import GamePage from "./pages/GamePage";
import NothingHere from "./pages/NothingHere";
import Highscores from "./pages/Highscores";

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
      <GameContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <nav>
                  <ul className="flex gap-4">
                    <li>
                      <Link to="/">Home</Link>
                    </li>

                    <li>
                      <Link to="/highscores">Highscores</Link>
                    </li>
                    <li>
                      <Link to="/gameover">Game Over</Link>
                    </li>
                    <li>
                      <Link to="/game">Game</Link>
                    </li>
                    <li>
                      <Link to="/nothinghere">Nothing Here</Link>
                    </li>
                  </ul>
                </nav>
                <section className="flex justify-center min-h-screen bg-primary">
                  <Outlet />
                </section>
              </>
            }>
            <Route index element={<StartScreen />} />

            <Route path="/highscores" element={<Highscores />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="/nothinghere" element={<NothingHere />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<p>**WSZYSTKO**</p>} />
          </Route>
        </Routes>
      </GameContextProvider>
    </div>
  );
}

export default App;
