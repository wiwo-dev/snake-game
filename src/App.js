import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { GameContextProvider } from "./modules/SnakeGame";
import { StartScreen, GameOver, GamePage, Highscores, InstructionsAndSettings } from "./pages";

function App() {
  // const onResize = () => {
  //   document.querySelector(":root").style.setProperty("--vh", window.innerHeight / 100 + "px");
  // };
  // useEffect(() => {
  //   window.addEventListener("resize", onResize);
  //   onResize();
  //   return () => {
  //     window.removeEventListener("resize", onResize);
  //   };
  // }, []);

  return (
    <div>
      <GameContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="min-h-screen p-2 bg-primary">
                  <div className="container max-w-3xl py-4 xs:py-8 px-2 mx-auto border-2 border-black">
                    <Outlet />
                  </div>
                </section>
              </>
            }>
            <Route index element={<StartScreen />} />
            <Route path="/highscores" element={<Highscores />} />
            <Route path="/instructions-settings" element={<InstructionsAndSettings />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="*" element={<p className="text-center">**404**</p>} />
          </Route>
        </Routes>
      </GameContextProvider>
    </div>
  );
}

export default App;
