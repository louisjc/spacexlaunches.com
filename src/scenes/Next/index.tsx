import React from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import ScrollButton from '../../components/ScrollButton'
import Header from '../../components/Header'
import Launch from './Launch'
import { LaunchType } from '../../types'

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  .left,
  .right {
    color: #fff;
    position: fixed;
    font-weight: 100;
    bottom: 5px;
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

const Main = styled.div`
  color: #fff;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default class extends React.Component<{}, { data: LaunchType | null }> {
  state = { data: null }

  componentDidMount() {
    axios
      .get('https://api.spacexdata.com/v3/launches/upcoming')
      .then(({ data }) => this.setState({ data: data[0] as LaunchType }))
  }

  render() {
    const { data } = this.state

    return (
      <Container>
        <Header top />
        <Main>{data && <Launch data={data} />}</Main>
        <ScrollButton to="bottom" />
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
  }
}
