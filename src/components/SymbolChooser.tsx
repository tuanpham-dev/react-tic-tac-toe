import React, { FC } from 'react'
import styled from 'styled-components'
import { Symbol } from '../data/types'
import { ReactComponent as Circle } from '../images/circle.svg'
import { ReactComponent as Cross } from '../images/cross.svg'
import { circleColor, crossColor, grayColor } from '../data/colors'

interface Props {
  onChoose?: (symbol: Symbol) => void
}

interface ButtonProps {
  icon: Symbol
}

const Wrapper = styled.div`
  text-align: center;
  padding: 60px 10px 20px;
`

const Question = styled.div`
  font-size: 40px;
  margin: 40px 0;

  @media (min-width: 350px) {
    font-size: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button<ButtonProps>`
  width: 64px;
  height: 64px;
  cursor: pointer;
  border: 0;
  background: transparent;
  transition: transform 0.2s ease-in-out;
  color: ${(props) => (props.icon === 'circle' ? circleColor : crossColor)};

  &:focus {
    transform: scale(1.1);
  }

  &:hover {
    transform: scale(1.15);
  }

  @media (min-width: 350px) {
    width: 90px;
    height: 90px;
  }
`

const Or = styled.span`
  font-size: 24px;
  color: ${grayColor};
  margin: auto 15px;
`

const SymbolChooser: FC<Props> = ({ onChoose }) => {
  return (
    <Wrapper>
      <Question>Which one you always choose?</Question>
      <Buttons>
        <Button icon="circle" onClick={() => onChoose && onChoose('circle')}>
          <Circle />
        </Button>
        <Or>Or</Or>
        <Button icon="cross" onClick={() => onChoose && onChoose('cross')}>
          <Cross />
        </Button>
      </Buttons>
    </Wrapper>
  )
}

export default SymbolChooser
