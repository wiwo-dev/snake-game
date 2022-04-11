import React, { useContext, useRef, useState } from "react";
import Button from "../components/Button";
import Board from "../modules/snake-game/Board";
import useInterval from "../utils/useInterval";

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 15;

const filterOnBorders = (surr) =>
  surr.filter((el) => el.x >= 0 && el.x < BOARD_WIDTH && el.y >= 0 && el.y < BOARD_HEIGHT);

const filterOnChecked = (surr, dict) => surr.filter((el) => !dict.has(`${el.x}-${el.y}`));

const getAllCells = (start) => {
  const all = [];
  const dict = new Set();

  const fifo = [start];

  while (fifo.length > 0) {
    if (fifo.length > 400) break;
    const first = fifo.shift();
    all.push({ x: first.x, y: first.y });
    dict.add(`${first.x}-${first.y}`);

    const surr = [];
    surr.push({ x: first.x, y: first.y - 1 });
    surr.push({ x: first.x, y: first.y + 1 });
    surr.push({ x: first.x + 1, y: first.y });
    surr.push({ x: first.x - 1, y: first.y });

    const res = filterOnChecked(filterOnBorders(surr), dict);

    res.map((el) => {
      dict.add(`${el.x}-${el.y}`);
      fifo.push({ x: el.x, y: el.y });
    });
  }

  return all;
};

export default function Tests() {
  const [checkedFields, setCheckedFields] = useState([]);
  const [algResults, setAlgResults] = useState([]);

  const action = () => {
    if (algResults.length > 0) {
      const toadd = algResults[0];
      console.log(toadd);
      setAlgResults((prev) => {
        const copy = [...prev];
        copy.shift();
        return copy;
      });
      setCheckedFields((prev) => [...prev, toadd]);
    }
  };

  //const [setActualDelay] = useInterval(action, 10);

  const handleStartClick = () => {
    const start = { x: 10, y: 5 };
    const all = getAllCells(start);
    setAlgResults(all);
  };

  return (
    <>
      <section className="flex flex-col gap-5 px-5 mx-auto">
        <h1 className="mx-auto text-8xl font-vt323">Tests</h1>
        <Button onClick={handleStartClick}>SURR</Button>
        <Board width={BOARD_WIDTH} height={BOARD_HEIGHT} star={{}} snakeArray={checkedFields}></Board>
      </section>
      <section>Checked fields length: {checkedFields.length}</section>

      <section>
        {checkedFields.map((el, ind) => (
          <p key={ind}>
            {ind}: {JSON.stringify(el)}
          </p>
        ))}
      </section>
    </>
  );
}
