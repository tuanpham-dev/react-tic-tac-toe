import React, { FC } from 'react'
import { Symbol } from '../data/types'
import styled from 'styled-components'
import { ReactComponent as Circle } from '../images/circle.svg'
import { ReactComponent as Cross } from '../images/cross.svg'
import { circleColor, crossColor } from '../data/colors'

interface Props {
  isPlayerTurn: boolean
  playerSymbol: Symbol
}

interface ButtonProps {
  icon: Symbol
  active: boolean
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  border: 1px solid rgba(214, 230, 234, 0.6);
  border-radius: 33px;
`

const Button = styled.span<ButtonProps>`
  color: ${(props) => (props.icon === 'circle' ? circleColor : crossColor)};
  display: inline-block;
  padding: 8px;
  width: 33px;
  height: 33px;
  border-radius: 33px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out;

  ${(props) => {
    if (props.active) {
      return `
        background-color: ${props.icon === 'circle' ? circleColor : crossColor};
        color: #fff;
        transform: scale(1.1);
      `
    }
  }}
`

const TurnStatus: FC<Props> = ({ isPlayerTurn, playerSymbol }) => {
  const isCircleActive =
    (isPlayerTurn && playerSymbol === 'circle') || (!isPlayerTurn && playerSymbol !== 'circle')

  return (
    <Wrapper>
      <Button icon="circle" active={isCircleActive}>
        <Circle />
      </Button>
      <Button icon="cross" active={!isCircleActive}>
        <Cross />
      </Button>
    </Wrapper>
  )
}

export default TurnStatus
