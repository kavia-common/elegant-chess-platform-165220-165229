import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";

/** Ocean Professional board colors */
const DARK = "bg-chessboardDark";
const LIGHT = "bg-chessboardLight";
const SELECT = "outline outline-4 outline-primary";
const LAST = "outline outline-2 outline-secondary";
const LEGAL = "ring ring-secondary ring-offset-2";
const PIECE_UNICODE = {
  p: "♟", n: "♞", b: "♝", r: "♜", q: "♛", k: "♚",
  P: "♙", N: "♘", B: "♗", R: "♖", Q: "♕", K: "♔",
};

/**
 * ChessBoard UI, legal move highlighting, and history tracker.
 * @param {object} props
 * @param {boolean} [props.flip] - Flip the board.
 * @returns {JSX.Element}
 */
// PUBLIC_INTERFACE
export default function ChessBoard({ flip = false }) {
  // Chess.js game instance
  const [game, setGame] = useState(() => new Chess());
  const [board, setBoard] = useState(game.board());
  const [history, setHistory] = useState(game.history({ verbose: true }));
  const [selected, setSelected] = useState(null); // square: e.g. 'e2'
  const [possible, setPossible] = useState([]);   // square[]
  const [lastMove, setLastMove] = useState(null); // {from, to}
  const [status, setStatus] = useState("");       // Current state: Checkmate, Draw, etc.

  // Board orientation
  const files = flip ? ["h","g","f","e","d","c","b","a"] : ["a","b","c","d","e","f","g","h"];
  const ranks = flip ? [1,2,3,4,5,6,7,8] : [8,7,6,5,4,3,2,1];

  // Calculate status after moves
  useEffect(() => {
    if (game.isCheckmate()) setStatus("Checkmate!");
    else if (game.isDraw()) setStatus("Draw.");
    else if (game.isStalemate()) setStatus("Stalemate.");
    else if (game.isInsufficientMaterial()) setStatus("Insufficient Material.");
    else if (game.isThreefoldRepetition()) setStatus("Threefold Rep.");
    else if (game.inCheck()) setStatus("Check!");
    else setStatus(`${game.turn() === "w" ? "White" : "Black"} to move`);
  }, [game, board, history]);

  // Square click logic
  function handleSquareClick(file, rank) {
    const sq = `${file}${rank}`;
    // If selecting own piece: highlight
    const piece = game.get(sq);
    if (selected === sq) {
      setSelected(null);
      setPossible([]);
      return;
    }
    if (!selected && piece && piece.color === game.turn()) {
      setSelected(sq);
      const moves = game.moves({ square: sq, verbose: true });
      setPossible(moves.map(m => m.to));
      return;
    }
    // If clicked legal move from selected
    if (selected && possible.includes(sq)) {
      game.move({ from: selected, to: sq });
      setBoard(game.board());
      setHistory(game.history({ verbose: true }));
      setLastMove({ from: selected, to: sq });
      setSelected(null);
      setPossible([]);
      return;
    }
    // Clicking another piece of own
    if (piece && piece.color === game.turn()) {
      setSelected(sq);
      const moves = game.moves({ square: sq, verbose: true });
      setPossible(moves.map(m => m.to));
    }
  }

  // Reset game
  function handleReset() {
    const newGame = new Chess();
    setGame(newGame);
    setBoard(newGame.board());
    setHistory(newGame.history({ verbose: true }));
    setLastMove(null);
    setSelected(null);
    setPossible([]);
    setStatus("White to move");
  }

  // Go back/forward in move history
  function jumpTo(moveIndex) {
    const newGame = new Chess();
    let moveSeq = history.slice(0, moveIndex + 1);
    for (let m of moveSeq) newGame.move(m);
    setGame(newGame);
    setBoard(newGame.board());
    setHistory(newGame.history({ verbose: true }));
    setLastMove(moveIndex >= 0 ? { from: moveSeq[moveIndex]?.from, to: moveSeq[moveIndex]?.to } : null);
    setSelected(null);
    setPossible([]);
  }

  // Render chessboard squares
  function renderBoard() {
    return ranks.map((rank) => (
      <div className="flex flex-row" key={rank}>
        {files.map((file) => {
          const sq = `${file}${rank}`;
          const pieceObj = game.get(sq);
          const isLight = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
          let border = "";
          if (lastMove && (lastMove.from === sq || lastMove.to === sq)) border = LAST;
          if (selected === sq) border = SELECT;
          if (possible.includes(sq)) border = LEGAL;
          return (
            <button
              key={sq}
              aria-label={pieceObj ? pieceObj.type.toUpperCase() : "empty"}
              className={`aspect-square w-full ${isLight ? LIGHT : DARK} flex items-center justify-center text-[2.5vw] md:text-3xl font-bold select-none transition-all duration-150 cursor-pointer ${border}`}
              style={{
                minWidth: "32px",
                minHeight: "32px",
                maxWidth: "56px",
                maxHeight: "56px",
                borderRadius: '0.38rem'
              }}
              onClick={() => handleSquareClick(file, rank)}
              tabIndex={0}
            >
                {pieceObj ? PIECE_UNICODE[pieceObj.type === pieceObj.type.toUpperCase() ? pieceObj.type : pieceObj.type.toLowerCase()] : ""}
            </button>
          );
        })}
      </div>
    ));
  }

  return (
    <div className="flex flex-col items-center">
      {/* Game Controls */}
      <div className="flex gap-2 my-3">
        <button
          className="px-3 py-1 rounded-button bg-surface border border-primary font-semibold text-primary shadow-ocean hover:bg-primary hover:text-white transition"
          onClick={handleReset}
          aria-label="Reset game"
        >
          New Game
        </button>
        <button
          className="px-3 py-1 rounded-button bg-surface border border-secondary font-semibold text-secondary shadow-ocean hover:bg-secondary hover:text-white transition"
          onClick={() => jumpTo(history.length - 2)}
          aria-label="Undo move"
          disabled={history.length <= 0}
        >
          Undo
        </button>
      </div>
      {/* The Chessboard */}
      <div className="inline-flex border-8 border-primary/40 bg-surface rounded-board shadow-ocean" style={{width: "min(90vw,480px)"}}>
        <div className="flex flex-col w-full">{renderBoard()}</div>
      </div>
      {/* Status message */}
      <span className="text-md mt-2 font-medium text-primary">{status}</span>
      {/* Move history */}
      <div className="w-full mt-4 p-3 bg-surface rounded-xl shadow">
        <span className="font-bold text-lg text-primary block mb-2">Move History</span>
        <ol className="grid grid-cols-2 gap-x-2 text-base">
          {history.map((move, idx) => (
            <li key={idx} className={`rounded-md px-2 py-0.5 ${idx === history.length - 1 ? 'bg-primary/10 font-semibold': ''}`}>
              <button
                className="hover:underline"
                onClick={() => jumpTo(idx)}
                aria-label={"Jump to move "+move.san}
              >
                {`${idx % 2 === 0 ? Math.floor(idx / 2) + 1 + ". " : ""}${move.san}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
