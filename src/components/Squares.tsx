import React, { FC } from 'react'
import { NullableSymbol } from '../data/types'
import styled, { keyframes } from 'styled-components'
import Square from './Square'

interface Props {
  squares: NullableSymbol[]
  onSquareClick?: (i: number) => void
  winningPath?: string | false
  disabled?: boolean
}

interface WinningLineProps {
  path: string
}

const Wrapper = styled.div`
  margin: 40px 10px;
  position: relative;
`

const SquaresWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const line = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`

const WinningLineWrapper = styled.div<WinningLineProps>`
  position: absolute;
  padding: 0 5px;
  z-index: 9;
  width: 100%;

  ${({ path }) => {
    if (path === '0-2') {
      return `top: 16.6667%;`
    } else if (path === '3-5') {
      return `top: 50%;`
    } else if (path === '6-8') {
      return `top: 83.3333%;`
    } else if (path === '0-6' || path === '1-7' || path === '2-8') {
      return `
        transform: rotate(90deg);
        transform-origin: top left;
        margin-left: -1px;
        left: ${path === '0-6' ? '16.6667%' : path === '1-7' ? '50%' : '83.3333%'};
      `
    } else if (path === '0-8' || path === '2-6') {
      return `
        width: 140.4214%;
        padding: 0 10px;
        transform-origin: top left;
        transform: rotate(${path === '0-8' ? '45.3deg' : '-45.2deg'});
        ${path === '0-8' ? 'top: 0;' : 'bottom: -2px;'}
      `
    }
  }}
`

const WinningLine = styled.div`
  animation: ${line} 0.5s ease-in-out;
  height: 5px;
  margin-top: -3px;
  background: #fd6593;
`

const Squares: FC<Props> = ({ squares, onSquareClick, winningPath, disabled }) => {
  return (
    <Wrapper>
      {winningPath && (
        <WinningLineWrapper path={winningPath}>
          <WinningLine />
        </WinningLineWrapper>
      )}
      <SquaresWrapper>
        {[...Array(9).keys()].map((i) => (
          <Square
            key={i}
            value={squares[i]}
            onClick={() => onSquareClick && onSquareClick(i)}
            disabled={disabled}
          />
        ))}
      </SquaresWrapper>
    </Wrapper>
  )
}

export default Squares
