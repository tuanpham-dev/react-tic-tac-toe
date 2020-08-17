import React, { FC } from 'react'
import styled from 'styled-components'
import { ReactComponent as Restart } from '../images/restart.svg'
import { ReactComponent as Config } from '../images/config.svg'

interface Props {
  isPvP: boolean
  onReset?: () => void
  onSettings?: () => void
}

const Wrapper = styled.div`
  margin: auto 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Button = styled.button`
  color: #a4b5b8;
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid rgba(164, 181, 184, 0.4);
  position: relative;
  cursor: pointer;
  transition: border 0.2s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    background-color: #a4b5b8;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: background 0.2s ease-in-out;
  }

  svg {
    position: relative;
  }

  &:hover,
  &:focus {
    border-color: rgba(39, 125, 180, 0.4);

    &::before {
      background-color: #277db4;
    }
  }
`

const GameModeStatus = styled.div`
  color: #a4b5b8;
  border: 1px solid rgba(164, 181, 184, 0.4);
  padding: 10px 20px;
  border-radius: 30px;
  text-transform: uppercase;
`

const Controls: FC<Props> = ({ isPvP, onReset, onSettings }) => {
  return (
    <Wrapper>
      <Button onClick={() => onReset && onReset()}>
        <Restart />
      </Button>
      <GameModeStatus>{isPvP ? '2 Players' : '1 Player'}</GameModeStatus>
      <Button onClick={() => onSettings && onSettings()}>
        <Config />
      </Button>
    </Wrapper>
  )
}

export default Controls
