import React, { FC } from 'react'
import styled from 'styled-components/macro'
import SocialButtons from './SocialButtons'

const Container = styled.footer`
  .left,
  .right {
    color: #fff;
    position: fixed;
    bottom: 5px;
    @media (max-width: 600px) {
      display: none;
    }
    font-size: 0.9em;
  }
  .left {
    opacity: 0.5;
    left: 5px;
  }
  .right {
    right: 5px;
  }
`

const Footer: FC<{}> = () => (
  <Container>
    <div className="left">
      {'Not an official site - '}
      <a
        href="https://github.com/louisjc/spacexlaunches.com/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        Report issue on GitHub
      </a>
      {' - Source: '}
      <a
        href="https://github.com/r-spacex/SpaceX-API"
        target="_blank"
        rel="noopener noreferrer"
      >
        SpaceX-API
      </a>
    </div>
    <div className="right">
      <SocialButtons link="https://spacexlaunches.com/" text="🚀 Countdown for next SpaceX launch and visualisation of past rocket launch schedule" colors />
    </div>
  </Container>
)

export default Footer
