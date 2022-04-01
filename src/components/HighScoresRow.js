import React from "react";

export default function HighScoresRow({ index, name, score }) {
  return (
    <>
      <div className="flex justify-between">
        <div>{index}</div>
        <div>{name}</div>
        <div>{score}</div>
      </div>
    </>
  );
}
