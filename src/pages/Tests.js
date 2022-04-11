import React, { useContext, useRef, useState } from "react";
import Button from "../components/Button";
import Board from "../modules/snake-game/Board";
import useInterval from "../utils/useInterval";

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 15;

const getSurroundings = ({ x, y }, allStrings) => {
  const surr = [];

  surr.push({ x: x, y: y - 1 });
  surr.push({ x: x, y: y + 1 });
  surr.push({ x: x + 1, y: y });
  surr.push({ x: x - 1, y: y });

  const res = filterOnBorders(surr);
  const res2 = filterOnStrings(res, allStrings);
  console.log(res2);
  return res2;
};

const filterOnBorders = (surr) =>
  surr.filter((el) => el.x >= 0 && el.x < BOARD_WIDTH && el.y >= 0 && el.y < BOARD_HEIGHT);

const filterOnStrings = (surr, allStrings) => surr.filter((el) => !allStrings[`${el.x}-${el.y}`]);

export default function Tests() {
  const [checkedFields, setCheckedFields] = useState([{ x: 10, y: 5 }]);
  const checkedFieldsRef = useRef([{ x: 10, y: 5 }]);

  const [setActualDelay] = useInterval(() => {
    if (checkedFieldsRef.current.length > 0) {
      console.log("inter");
      setCheckedFields((prev) => [...prev, checkedFieldsRef.current.shift()]);
    }
  }, 100);

  return (
    <>
      <section className="flex flex-col gap-5 px-5 mx-auto">
        <h1 className="mx-auto text-8xl font-vt323">Tests</h1>
        <Button
          onClick={() => {
            const start = { x: 10, y: 5 };
            const all = [start];
            const allStrings = {};
            allStrings[`${start.x}-${start.y}`] = true;
            const fifo = [start];

            while (fifo.length > 0) {
              //if (fifo.length > 100) break;
              const first = fifo.shift();
              all.push(first);
              allStrings[`${first.x}-${first.y}`] = true;

              getSurroundings(first, allStrings).map((el) => {
                console.log(el);
                all.push(el);
                allStrings[`${el.x}-${el.y}`] = true;
                fifo.push(el);
                //setCheckedFields(all);
                //setCheckedFields(all);
              });
            }
            //setCheckedFields(all);
            checkedFieldsRef.current = all;
          }}

          //console.log(allStrings);
          //console.log(fifo);
        >
          SURR
        </Button>
        <Board width={BOARD_WIDTH} height={BOARD_HEIGHT} star={{}} snakeArray={checkedFields}></Board>
      </section>
    </>
  );
}
