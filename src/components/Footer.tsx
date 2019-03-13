import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'

const Container = styled.footer`
  .left,
  .right {
    color: #fff;
    position: fixed;
    bottom: 5px;
    opacity: 0.5;
    @media (max-width: 600px) {
      display: none;
    }
  }
  .left {
    left: 5px;
  }
  .right {
    right: 5px;
  }
`

const Footer: FunctionComponent<{}> = () => (
  <Container>
    <div className="right">
      {'Source: '}
      <a
        href="https://github.com/r-spacex/SpaceX-API"
        target="_blank"
        rel="noopener noreferrer"
      >
        SpaceX-API
      </a>
    </div>
    <div className="left">
      {'Not an official site - '}
      <a
        href="https://github.com/louisjc/spacexlaunches.com/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        Report issue
      </a>
      {' - '}
      <a
        href="https://github.com/louisjc/spacexlaunches.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </div>
  </Container>
)

export default Footer
