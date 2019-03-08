import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  color: #fff;
  padding: 10px;
  width: 100%;
  display: flex;

  h1 {
    flex: 1;
    line-height: 1;
    font-weight: 300;
    margin: 0;
    font-size: 1.5em;

    @media (max-width: 600px) {
      text-align: center;
    }
  }

  span {
    @media (max-width: 600px) {
      display: none;
    }
  }
`

export default function({ top }) {
  return (
    <Header>
      <h1>SpaceXLaunches.com</h1>
      {top ? (
        <span>Fan content - Not an official site</span>
      ) : (
        <span>
          illustrated by <a href="https://zlsa.github.io/">ZLSA Design</a>
        </span>
      )}
    </Header>
  )
}
