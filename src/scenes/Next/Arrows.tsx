import React, { FC } from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  font-size: 2em;
  margin-top: 10px;
  display: flex;
  > div {
    flex: 1;
  }
  button {
    cursor: pointer;
    padding: 0 10px;
    margin: 0;
    background: transparent;
    border: 0;
    cursor: pointer;
    color: #007bff;
    &:focus {
      outline: none;
    }
  }
  .disabled {
    color: rgba(255, 255, 255, 0.2) !important;
    cursor: default;
  }
`

const Arrows: FC<{
  max: number
  current: number
  callback: (i: number) => void
}> = props => {
  const left = props.current !== 0
  const right = props.current !== props.max - 1
  return (
    <Container>
      <button
        className={left ? '' : 'disabled'}
        onClick={left ? () => props.callback(props.current - 1) : () => undefined}
      >
        ←
      </button>
      <div style={{ flex: 1 }} />
      <button
        className={right ? '' : 'disabled'}
        onClick={right ? () => props.callback(props.current + 1) : () => undefined}
      >
        →
      </button>
    </Container>
  )
}

export default Arrows
