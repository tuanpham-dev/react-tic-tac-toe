import React, { FC } from 'react'
import { NullableSymbol } from '../data/types'
import { ReactComponent as Circle } from '../images/circle.svg'
import { ReactComponent as Cross } from '../images/cross.svg'
import styled from 'styled-components'
import { circleColor, crossColor } from '../data/colors'

interface Props {
  value: NullableSymbol
  onClick?: () => void
  disabled?: boolean
}

interface ButtonProps {
  icon: NullableSymbol
}

const Button = styled.button<ButtonProps>`
  background: none;
  border-top: 0;
  border-left: 0;
  border-right: 1px solid #d6e6ea;
  border-bottom: 1px solid #d6e6ea;
  border-radius: 0;
  padding: 0;
  margin: 0;
  position: relative;

  ${(props) => {
    if (props.icon === 'circle') {
      return `color: ${circleColor};`
    } else if (props.icon === 'cross') {
      return `color: ${crossColor};`
    }
  }}

  &:nth-child(3n) {
    border-right: 0;
  }

  &:nth-child(n + 7) {
    border-bottom: 0;
  }

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 20%;
  }

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  &:focus {
    outline-color: ${crossColor};
  }

  &:active {
    outline: 0;
  }
`

const Square: FC<Props> = ({ value, onClick, disabled }) => {
  let IconImage

  if (value === 'circle') {
    IconImage = Circle
  } else if (value === 'cross') {
    IconImage = Cross
  }

  return (
    <Button icon={value} onClick={onClick} disabled={value !== null || disabled}>
      {IconImage && <IconImage />}
    </Button>
  )
}

export default Square
