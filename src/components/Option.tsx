import React, { FC } from 'react'
import styled from 'styled-components'
import { crossColor } from '../data/colors'
import { ReactComponent as Check } from '../images/check.svg'

interface Props {
  content: string
  isActive: boolean
  onClick?: () => void
}

interface WrapperProps {
  isActive: boolean
}

const Wrapper = styled.button<WrapperProps>`
  display: block;
  background: none;
  border: 0;
  border-radius: 0;
  font-size: 20px;
  margin: 0 0 5px;
  padding: 10px 10px;
  width: 100%;
  text-align: left;
  transition: color 0.2s ease-in-out;
  ${({ isActive }) => (isActive ? `color: ${crossColor};` : '')}

  &:hover {
    color: ${crossColor};
  }
`

const CheckWrapper = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
`

const Option: FC<Props> = ({ isActive, onClick, content }) => {
  return (
    <Wrapper isActive={isActive} onClick={() => onClick && onClick()}>
      {isActive && (
        <CheckWrapper>
          <Check />
        </CheckWrapper>
      )}
      {content}
    </Wrapper>
  )
}

export default Option
