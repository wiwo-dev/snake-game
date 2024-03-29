import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, SubpageHeader } from "../components";
import { GameContext } from "../modules/SnakeGame";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../utils/Firebase";

export default function GameOver() {
  const { userName, setUserName, gameState, setLastSavedScore } = useContext(GameContext);

  const [isSaving, setIsSaving] = useState(false);

  let navigate = useNavigate();

  const addScore = async (score, playerName) => {
    const docData = {
      playerName,
      score: gameState.points,
      saveTime: serverTimestamp(),
    };
    setIsSaving(true);
    try {
      const res = await addDoc(collection(db, "scores"), docData);
      console.log(res.id);
      setLastSavedScore({ ...docData, id: res.id });
      setIsSaving(false);
      navigate("/highscores");
    } catch (err) {
      console.log(err);
      setIsSaving(false);
    }
  };

  return (
    <>
      <section className="">
        <SubpageHeader>Game Over</SubpageHeader>
        <section className="max-w-sm pt-8 mx-auto">
          <section className="flex flex-col items-stretch gap-6">
            <div className="mx-auto text-2xl font-vt323">SCORE: {gameState.points}</div>
            <div className="mx-auto text-2xl font-vt323 text-center">Type your name and save the score!</div>
            <form
              className="flex flex-col items-center gap-6"
              onChange={(e) => {
                e.preventDefault();
                //console.log(e.target.value);
                setUserName(e.target.value);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                //console.log("WYSLANO: " + userName);
                addScore(gameState.points, userName);
              }}>
              <Input fullWidth placeholder="Your name..." required autoFocus pattern="^[a-zA-Z0-1]{1,10}$" />

              <Button fullWidth variant="dark" loading={isSaving} disabled={isSaving} type="submit">
                {isSaving ? "SAVING..." : "SAVE SCORE"}
              </Button>
              <p></p>
            </form>
            <div className="pt-6 flex flex-col gap-5">
              <Button fullWidth variant="clear" onClick={() => navigate("/highscores")}>
                HIGHSCORES
              </Button>
              <Button fullWidth variant="clear" onClick={() => navigate("/")}>
                PLAY AGAIN
              </Button>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
