import React, { FC } from 'react'
import styled from 'styled-components'
import { ReactComponent as Circle } from '../images/circle.svg'
import { ReactComponent as Cross } from '../images/cross.svg'
import { ReactComponent as Tie } from '../images/tie.svg'
import { circleColor, crossColor, tieColor } from '../data/colors'

interface Props {
  icon: 'circle' | 'cross' | 'tie'
  count: number
}

interface WrapperProps {
  icon: 'circle' | 'cross' | 'tie'
}

const Wrapper = styled.div<WrapperProps>`
  flex: 1 1 0;
  text-align: center;
  color: ${(props) => {
    switch (props.icon) {
      case 'circle':
        return circleColor
      case 'cross':
        return crossColor
      case 'tie':
        return tieColor
    }
  }};
`

const Icon = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto 10px;
`

const Counter: FC<Props> = ({ icon, count }) => {
  let IconImage

  if (icon === 'circle') {
    IconImage = Circle
  } else if (icon === 'cross') {
    IconImage = Cross
  } else {
    IconImage = Tie
  }

  return (
    <Wrapper icon={icon}>
      <Icon>
        <IconImage />
      </Icon>
      {`${count} ${icon !== 'tie' ? 'win' : 'tie'}${count > 1 ? 's' : ''}`}
    </Wrapper>
  )
}

export default Counter
