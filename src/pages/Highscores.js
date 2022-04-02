import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import db from "../utils/Firebase";

import Button from "../components/Button";
import SubpageHeader from "../components/SubpageHeader";

import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

// Get a list of results from your database
async function getScores(db) {
  const scoresRef = collection(db, "scores");
  const q = query(scoresRef, where("score", ">=", 0), orderBy("score", "desc"), limit(5));
  const scoresSnapshot = await getDocs(q);
  return scoresSnapshot;
}

export default function Highscores() {
  const { lastSavedScore, setLastSavedScore } = useContext(GameContext);

  const [scoresSnapshot, setScoresSnapshot] = useState();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    (async () => {
      const scoSnap = await getScores(db);
      setScoresSnapshot(scoSnap);
      setScores(scoSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    })();
    return () => {};
  }, []);

  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadMore = async () => {
    const lastVisible = scoresSnapshot.docs[scoresSnapshot.size - 1];
    console.log("last", lastVisible);

    if (!lastVisible) {
      setIsError(true);
      return;
    }

    // Construct a new query starting at this document,
    // get the next 25 cities.
    const next = query(collection(db, "scores"), orderBy("score", "desc"), startAfter(lastVisible), limit(5));
    setisLoading(true);
    try {
      const newScoresSnapshot = await getDocs(next);
      setScoresSnapshot(newScoresSnapshot);
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
        <div className="px-7">
          <div className="flex justify-center w-full">
            <p className="font-vt323">
              {lastSavedScore && `SAVED ${lastSavedScore.score} point as ${lastSavedScore.playerName}`}{" "}
            </p>
          </div>
          <table className="w-3/4 mx-auto text-lg font-vt323">
            <thead>
              <tr className="py-2 text-left uppercase">
                <th className="px-2">Pos</th>
                <th className="px-2">playerName</th>
                <th className="px-2">Points</th>
                {/* <th className="px-2">ID</th> */}
                {/* <th className="px-2">Time</th> */}
              </tr>
            </thead>
            <tbody>
              {scores?.map((el, ind) => (
                <tr key={ind} className={`${el?.id === lastSavedScore?.id ? "bg-zinc-400" : ""}`}>
                  <td className="px-2">{ind + 1}</td>
                  <td className={`px-2 ${el?.id === lastSavedScore?.id ? "underline" : ""}`}>{el?.playerName}</td>
                  <td className="px-2">{el.score}</td>
                  {/* <td className="px-2">{el.id}</td> */}
                  {/* <td className="px-2">{el.saveTime.toDate().toLocaleString("en-US")}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center gap-5 pt-5">
          <Button variant="light" onClick={() => loadMore(scores)}>
            {isLoading ? "LOADING..." : "LOAD MORE..."}
          </Button>
          <Button variant="clear" onClick={() => navigate("/game")}>
            PLAY AGAIN
          </Button>
        </div>
        {isError && <p className="font-vt323 text-small">database connection error...</p>}
      </section>
    </>
  );
}
