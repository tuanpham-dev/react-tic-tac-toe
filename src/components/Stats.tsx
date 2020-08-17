import React, { FC } from 'react'
import styled from 'styled-components'
import Counter from './Counter'

interface Props {
  circleWinCount: number
  crossWinCount: number
  tieCount: number
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: auto;
`

const Stats: FC<Props> = ({ circleWinCount, crossWinCount, tieCount }) => {
  return (
    <Wrapper>
      <Counter icon="circle" count={circleWinCount} />
      <Counter icon="cross" count={crossWinCount} />
      <Counter icon="tie" count={tieCount} />
    </Wrapper>
  )
}

export default Stats
