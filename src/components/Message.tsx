import React, { FC, useEffect } from 'react'
import { NullableSymbol, Symbol } from '../data/types'
import styled, { keyframes } from 'styled-components'

interface Props {
  winner: NullableSymbol
  playerSymbol: Symbol
  isPvP: boolean
  onClose?: () => void
}

const wait = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
`

const bounceIn = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 0;
  }

  60% {
    transform: scale(1.2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
`

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 20;
`

const Content = styled.div`
  margin: auto 0;
  padding: 70px 40px;
  background-color: rgba(58, 152, 212, 0.95);
  color: #fff;
  text-align: center;
  font-size: 36px;
  animation: ${wait} 0.4s, ${bounceIn} 0.5s ease-in-out 0.4s;
`

const Message: FC<Props> = ({ winner, playerSymbol, isPvP, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onClose) {
        onClose()
      }
    }, 2000)

    return () => clearTimeout(timeout)
  })

  let message: string

  if (winner) {
    if (isPvP) {
      message = winner === playerSymbol ? 'Player 1 Wins!' : 'Player 2 Wins!'
    } else {
      message = winner === playerSymbol ? 'You Win!' : 'Computer Wins!'
    }
  } else {
    message = 'Draw!'
  }

  return (
    <Wrapper
      onClick={() => {
        onClose && onClose()
      }}
    >
      <Content>{message}</Content>
    </Wrapper>
  )
}

export default Message
