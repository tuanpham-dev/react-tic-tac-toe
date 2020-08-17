import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Stats from './Stats'
import { NullableSymbol, Difficulty } from '../data/types'
import SymbolChooser from './SymbolChooser'
import Squares from './Squares'
import { textColor } from '../data/colors'
import TurnStatus from './TurnStatus'
import Controls from './Controls'
import Message from './Message'
import Settings from './Settings'
import { findBestMove, Board } from '../utils/ai'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Ubuntu";
    font-weight: 700;
    font-size: 15px;
    color: ${textColor};
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  svg {
    max-width: 100%;
    max-height: 100%;
    fill: currentColor;
  }

  button {
    font-family: "Ubuntu";
    color: ${textColor};

    &:focus {
      outline: dashed 2px currentColor;
    }

    &:active {
      outline: none;
    }
  }
`

const Wrapper = styled.div`
  border: 1px solid #79cadc;
  padding: 40px 30px;
  margin: 0 auto;
  min-width: 320px;
  max-width: 375px;
  height: 100vh;
  max-height: 640px;
  box-shadow: 1px 6px 30px 0 rgba(121, 202, 220, 0.4);
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-height: 820px) {
    margin-top: 100px;
  }
`

const App = () => {
  const [playerSymbol, setPlayerSymbol] = useState<NullableSymbol>(null)
  const [circleWinCount, setCircleWinCount] = useState<number>(0)
  const [crossWinCount, setCrossWinCount] = useState<number>(0)
  const [tieCount, setTieCount] = useState<number>(0)
  const [squares, setSquares] = useState<NullableSymbol[]>(Array<NullableSymbol>(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true)
  const [isPvP, setIsPvP] = useState<boolean>(false)
  const [winner, setWinner] = useState<NullableSymbol>(null)
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Normal)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isGameOver && !isPvP && !isPlayerTurn) {
        const ai = playerSymbol === 'circle' ? 'cross' : 'circle'
        let position: number

        if (squares.filter((square) => !!square).length <= 3 - difficulty) {
          position = Math.floor(Math.random() * 8)

          while (squares[position] !== null) {
            position = (position + 1) % 9
          }
        } else {
          position = findBestMove(new Board(squares, ai), 3 - difficulty)
        }

        move(position)
      }
    }, 500)

    return () => clearTimeout(timeout)
  })

  const reset = () => {
    setPlayerSymbol(null)
    setCircleWinCount(0)
    setCrossWinCount(0)
    setTieCount(0)
    setSquares(Array<NullableSymbol>(9).fill(null))
    setIsPlayerTurn(true)
    setIsPvP(false)
    setWinner(null)
    setIsGameOver(false)
    setDifficulty(Difficulty.Normal)
  }

  const newGame = () => {
    setIsSettingsOpen(false)
    setSquares(Array<NullableSymbol>(9).fill(null))
    setIsGameOver(false)
  }

  const move = (position: number) => {
    const newSquares = [...squares]

    if (newSquares[position] === null) {
      if (isPlayerTurn) {
        newSquares[position] = playerSymbol
      } else {
        if (playerSymbol === 'circle') {
          newSquares[position] = 'cross'
        } else {
          newSquares[position] = 'circle'
        }
      }
    }

    setSquares(newSquares)
    setIsPlayerTurn(!isPlayerTurn)

    const [winner] = calculateWinner(newSquares)

    if (winner) {
      if (winner === 'circle') {
        setWinner(winner)
        setCircleWinCount(circleWinCount + 1)
      } else if (winner === 'cross') {
        setWinner(winner)
        setCrossWinCount(crossWinCount + 1)
      } else {
        setTieCount(tieCount + 1)
        setWinner(null)
      }

      setIsGameOver(true)
    }
  }

  const calculateWinner = (
    squares: NullableSymbol[]
  ): [NullableSymbol | boolean, string | false] => {
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
        return [squares[a], a + '-' + c]
      }
    }

    return [squares.filter((square) => square === null).length === 0, false]
  }

  let winningPath: string | false = false

  if (isGameOver) {
    ;[, winningPath] = calculateWinner(squares)
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {!playerSymbol ? (
          <SymbolChooser onChoose={setPlayerSymbol} />
        ) : (
          <>
            {!isSettingsOpen ? (
              <>
                {isGameOver && (
                  <Message
                    winner={winner}
                    playerSymbol={playerSymbol}
                    isPvP={isPvP}
                    onClose={newGame}
                  />
                )}
                <Stats
                  circleWinCount={circleWinCount}
                  crossWinCount={crossWinCount}
                  tieCount={tieCount}
                />
                <Squares
                  squares={squares}
                  onSquareClick={(position) => {
                    if (!isGameOver && (isPlayerTurn || isPvP)) {
                      move(position)
                    }
                  }}
                  winningPath={winningPath}
                  disabled={isGameOver}
                />
                <TurnStatus isPlayerTurn={isPlayerTurn} playerSymbol={playerSymbol} />
                <Controls
                  isPvP={isPvP}
                  onReset={reset}
                  onSettings={() => setIsSettingsOpen(true)}
                />
              </>
            ) : (
              <Settings
                isPvP={isPvP}
                difficulty={difficulty}
                onChangeMode={setIsPvP}
                onChangeDifficulty={setDifficulty}
                onClose={newGame}
              />
            )}
          </>
        )}
      </Wrapper>
    </>
  )
}

export default App
