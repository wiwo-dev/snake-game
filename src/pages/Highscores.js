import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { collection, query, where, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import db from "../utils/Firebase";
import { Button, SubpageHeader } from "../components";
import { GameContext } from "../modules/SnakeGame";
import { useNavigate } from "react-router-dom";

const HIGHSCORES_LIMITS = {
  INITIAL_LIMIT: 10,
  LOAD_MORE_LIMIT: 5,
};

// Get a list of results from your database
async function getScores(db) {
  const scoresRef = collection(db, "scores");
  const q = query(scoresRef, where("score", ">=", 0), orderBy("score", "desc"), limit(HIGHSCORES_LIMITS.INITIAL_LIMIT));
  const scoresSnapshot = await getDocs(q);
  return scoresSnapshot;
}

export default function Highscores() {
  const { lastSavedScore, gameState } = useContext(GameContext);

  const [scoresSnapshot, setScoresSnapshot] = useState();
  const [scores, setScores] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [isLastSavedScoreVisible, setIsLastSavedScoreVisible] = useState(false);

  useEffect(() => {
    (async () => {
      setisLoading(true);
      const scoSnap = await getScores(db);
      setScoresSnapshot(scoSnap);
      setScores(scoSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setisLoading(false);
    })();
    return () => {};
  }, []);

  useEffect(() => {
    if (scores.length > 0 && lastSavedScore)
      setIsLastSavedScoreVisible(scores.filter((el) => el.id === lastSavedScore.id).length > 0);
  }, [scores, lastSavedScore]);

  const loadMore = async () => {
    const lastVisible = scoresSnapshot.docs[scoresSnapshot.size - 1];
    if (!lastVisible) {
      setIsError(true);
      setIsAllLoaded(true);
      return;
    }

    const next = query(
      collection(db, "scores"),
      orderBy("score", "desc"),
      startAfter(lastVisible),
      limit(HIGHSCORES_LIMITS.LOAD_MORE_LIMIT)
    );
    setisLoading(true);
    try {
      const newScoresSnapshot = await getDocs(next);
      setScoresSnapshot(newScoresSnapshot);
      if (newScoresSnapshot.docs.length < HIGHSCORES_LIMITS.LOAD_MORE_LIMIT) setIsAllLoaded(true);
      setScores((prev) => [...prev, ...newScoresSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))]);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setisLoading(false);
    }
  };

  let navigate = useNavigate();

  return (
    <>
      <section className="">
        <SubpageHeader>Highscores</SubpageHeader>
        <div className="px-2 sm:px-7">
          <div className="flex justify-center w-full">
            <p className="font-vt323">
              {lastSavedScore && `SAVED ${lastSavedScore.score} points as ${lastSavedScore.playerName}`}{" "}
            </p>
          </div>

          <div className="sm:w-3/4 mx-auto text-lg font-vt323 ">
            <section className="py-2 text-left uppercase font-bold flex">
              <div className="px-2 w-[25%]">Pos</div>
              <div className="px-2 w-[50%]">playerName</div>
              <div className="px-2 w-[25%]">Points</div>
            </section>
            {scores?.map((el, ind) => (
              <motion.section
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "32px" }}
                key={ind}
                className={`text-left flex ${el?.id === lastSavedScore?.id ? "bg-[rgba(0,0,0,.3)]" : ""}`}>
                <div className="px-2 w-[25%]">{ind + 1}</div>
                <div className="px-2 w-[50%] uppercase">{el?.playerName}</div>
                <div className="px-2 w-[25%]">{el?.score}</div>
              </motion.section>
            ))}
            {!isLastSavedScoreVisible && lastSavedScore && (
              <>
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "32px" }}
                  className={`text-left flex`}>
                  <div className="px-2 w-[25%]">...</div>
                  <div className="px-2 w-[50%]">...</div>
                  <div className="px-2 w-[25%]">...</div>
                </motion.section>
                <motion.section
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "32px" }}
                  className={`text-left flex bg-[rgba(0,0,0,.3)]`}>
                  <div className="px-2 w-[25%]">{scores.length > 0 && `>${scores.length}`}</div>
                  <div className="px-2 w-[50%] uppercase">{lastSavedScore.playerName}</div>
                  <div className="px-2 w-[25%]">{lastSavedScore.score}</div>
                </motion.section>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 pt-5 max-w-sm mx-auto">
          <Button
            variant="light"
            loading={isLoading}
            disabled={isLoading || isAllLoaded}
            fullWidth
            onClick={() => loadMore(scores)}
            pressed={isAllLoaded}>
            {isLoading ? "LOADING..." : isAllLoaded ? "ALL SCORES ARE LOADED" : "LOAD MORE..."}
          </Button>

          <Button variant="clear" fullWidth onClick={() => navigate("/game")}>
            {gameState.status === "GAMEOVER" ? "PLAY AGAIN" : "PLAY"}
          </Button>
        </div>
        {isError && <p className="font-vt323 text-small text-center">database connection error...</p>}
        {/* {isAllLoaded && <p className="font-vt323 text-small">thats all</p>} */}
      </section>
    </>
  );
}
