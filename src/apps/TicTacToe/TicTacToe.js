import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, Draw: 0 });
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  useEffect(() => {
    const savedScores = localStorage.getItem('ticTacToeScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    if (isComputerTurn && !winner) {
      const bestMove = findBestMove(board);
      handleClick(bestMove);
    }
  }, [isComputerTurn, board, winner]);

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setScores({
        ...scores,
        [newWinner]: scores[newWinner] + 1,
      });
    } else if (newBoard.every((square) => square !== null)) {
      setWinner('Draw');
      setScores({
        ...scores,
        Draw: scores.Draw + 1,
      });
    } else {
      setXIsNext(!xIsNext);
      setIsComputerTurn(!isComputerTurn);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
    setIsComputerTurn(false);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const findBestMove = (currentBoard) => {
    let bestVal = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O'; // Assume computer is 'O'
        let moveVal = minimax(currentBoard, 0, false, -Infinity, Infinity);
        currentBoard[i] = null;

        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
    return bestMove;
  };

  const minimax = (currentBoard, depth, isMaximizingPlayer, alpha, beta) => {
    const currentWinner = calculateWinner(currentBoard);
    if (currentWinner === 'O') {
      return 10 - depth;
    } else if (currentWinner === 'X') {
      return depth - 10;
    } else if (currentBoard.every((square) => square !== null)) {
      return 0;
    }

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          let evaluation = minimax(currentBoard, depth + 1, false, alpha, beta);
          currentBoard[i] = null;
          maxEval = Math.max(maxEval, evaluation);
          alpha = Math.max(alpha, evaluation);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X';
          let evaluation = minimax(currentBoard, depth + 1, true, alpha, beta);
          currentBoard[i] = null;
          minEval = Math.min(minEval, evaluation);
          beta = Math.min(beta, evaluation);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return minEval;
    }
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>Next player: {xIsNext ? 'X' : 'O'}</div>
        <div>Winner: {winner}</div>
        <div>Scores: X - {scores.X}, O - {scores.O}, Draw - {scores.Draw}</div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

export default TicTacToe;