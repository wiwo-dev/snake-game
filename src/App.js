import React, { useContext, useEffect } from "react";

import { Routes, Route, Outlet } from "react-router-dom";
import StartScreen from "./pages/StartScreen";

import { GameContextProvider } from "./context/GameContext";

import GameOver from "./pages/GameOver";
import GamePage from "./pages/GamePage";
import NothingHere from "./pages/NothingHere";
import Highscores from "./pages/Highscores";
import Heading from "./components/Heading";
import Tests from "./pages/Tests";

function App() {
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

  return (
    <div>
      <GameContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <nav>
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
                </nav> */}
                <section className="min-h-screen pt-2 bg-primary">
                  <div className="container max-w-3xl py-8 mx-auto border-2 border-black">
                    <Outlet />
                  </div>
                </section>
              </>
            }>
            <Route index element={<StartScreen />} />

            <Route path="/highscores" element={<Highscores />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="/nothinghere" element={<NothingHere />} />
            {/* <Route path="/tests" element={<Tests />} /> */}

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
