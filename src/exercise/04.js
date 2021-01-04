// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
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
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('squares', [
    Array(9).fill(null),
  ])
  const [currentMove, setCurrentMove] = useLocalStorageState('moves', 0)

  const allMoves = history[currentMove]
  const nextValue = calculateNextValue(allMoves)
  const winner = calculateWinner(allMoves)
  const status = calculateStatus(winner, allMoves, nextValue)

  function selectSquare(square) {
    if (winner || allMoves[square]) {
      return
    }
    const moveHistory = history.slice(0, currentMove + 1)
    const squaresCopy = [...allMoves]
    squaresCopy[square] = nextValue
    setHistory([...moveHistory, squaresCopy])
    setCurrentMove(moveHistory.length)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  const moves = history.map((squares, move) => {
    const text = move ? `Go to move #${move}` : 'Go to game start'
    const isCurrentMove = move === currentMove
    return (
      <li key={move}>
        <button disabled={isCurrentMove} onClick={() => setCurrentMove(move)}>
          {text} {isCurrentMove && '(current)'}
        </button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={allMoves} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
