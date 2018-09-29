import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ScrollButton from '../../components/ScrollButton'
import Header from '../../components/Header'
import Launch from './Launch'

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  color: #fff;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Source = styled.div`
  color: #fff;
  position: absolute;
  bottom: 5px;
  left: 5px;
  font-weight: 100;

  @media (max-width: 600px) {
    display: none;
  }
`

export default class extends React.Component {
  state = { data: null }

  componentDidMount() {
    axios
      .get('https://api.spacexdata.com/v2/launches/upcoming')
      .then(({ data }) => this.setState({ data: data[0] }))
  }

  render() {
    return (
      <Container>
        <Header />
        <Main>{this.state.data && <Launch {...this.state.data} />}</Main>
        <ScrollButton />
        <Source>
          {'Source: '}
          <a
            href='https://github.com/r-spacex/SpaceX-API'
            target='_blank'
            rel='noopener noreferrer'
          >
            SpaceX-API
          </a>
        </Source>
      </Container>
    )
  }
}
