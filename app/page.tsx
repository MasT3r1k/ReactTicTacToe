'use client';

import { useState } from 'react';
import './globals.css' 
import './square.css' 

export function Square({ value, squareClick }) {
  return (
    <>
      <button
      className="square"
      onClick={squareClick}
      >{ value }</button>
    </>
  );
}

export default function Board() {
  const [player, setPlayer] = useState("X")
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    setPlayer(player == "X" ? "O" : "X")
    setSquares(nextSquares);
  }

  function resetGame() {
    setSquares(Array(9).fill(null))
    setPlayer("X")
  }

  const winner = calculateWinner(squares);
  const missingSquares = squares.filter((square) => square == null)
  let header;
  let gameStatus;
  if (missingSquares.length == 0 && !winner) {
    header = "Remíza"
    gameStatus = "REMÍZA"
  }
  else if (winner) {
    header = 'Výherce: ' + winner;
    gameStatus = "VÝHRA HRÁČE " + winner;
  } else {
    header = 'Momentálně hraje hráč ' + player;
    gameStatus = ""
  }

  return (
    <>
    <div className="container">
      <div className="status">{header}</div>

      <div className="board">
        <div className="board-overlay">
          {gameStatus}
        </div>
        <div className="board-row">
          <Square value={squares[0]} squareClick={() => handleClick(0)} />
          <Square value={squares[1]} squareClick={() => handleClick(1)} />
          <Square value={squares[2]} squareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} squareClick={() => handleClick(3)} />
          <Square value={squares[4]} squareClick={() => handleClick(4)} />
          <Square value={squares[5]} squareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} squareClick={() => handleClick(6)} />
          <Square value={squares[7]} squareClick={() => handleClick(7)} />
          <Square value={squares[8]} squareClick={() => handleClick(8)} />
        </div>
      </div>

      <div className="buttons">
        <button className="button" onClick={resetGame}>Restartovat hru</button>
      </div>
    </div>
    </>
  )
}

export function calculateWinner(squares: (string | null)[]) {
    const lines = [
      // Řádky
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Sloupce
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonály
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}