import React, { FC } from 'react'
import styled from 'styled-components'
import Option from './Option'
import { Difficulty } from '../data/types'
import { crossColor } from '../data/colors'

interface Props {
  isPvP: boolean
  difficulty: Difficulty
  onChangeMode?: (isPvP: boolean) => void
  onChangeDifficulty?: (difficulty: Difficulty) => void
  onClose?: () => void
}

const Wrapper = styled.div`
  margin: auto 20px;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: 20px;

  &:first-child {
    margin-top: 0;
  }
`

const Button = styled.button`
  background: none;
  border: 0;
  border-radius: 0;
  font-size: 18px;
  margin: auto auto 0;
  padding: 15px 30px;
  width: min-content;
  background-color: #a4b5b8;
  color: #fff;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${crossColor};
  }
`

const Settings: FC<Props> = ({ isPvP, difficulty, onChangeMode, onChangeDifficulty, onClose }) => {
  return (
    <>
      <Wrapper>
        <Title>Game Mode</Title>
        <Option
          isActive={!isPvP}
          content="One Player"
          onClick={() => onChangeMode && onChangeMode(false)}
        />
        <Option
          isActive={isPvP}
          content="Two Players"
          onClick={() => onChangeMode && onChangeMode(true)}
        />
        {!isPvP && (
          <>
            <Title>Difficulty</Title>
            <Option
              isActive={difficulty === Difficulty.Easy}
              content="Easy"
              onClick={() => onChangeDifficulty && onChangeDifficulty(Difficulty.Easy)}
            />
            <Option
              isActive={difficulty === Difficulty.Normal}
              content="Normal"
              onClick={() => onChangeDifficulty && onChangeDifficulty(Difficulty.Normal)}
            />
            <Option
              isActive={difficulty === Difficulty.Hard}
              content="Hard"
              onClick={() => onChangeDifficulty && onChangeDifficulty(Difficulty.Hard)}
            />
          </>
        )}
      </Wrapper>
      <Button onClick={() => onClose && onClose()}>Close</Button>
    </>
  )
}

export default Settings
