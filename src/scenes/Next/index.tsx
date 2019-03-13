import React from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import ScrollButton from '../../components/ScrollButton'
import Header from '../../components/Header'
import Launch from './Launch'
import Arrows from './Arrows'
import { LaunchType } from '../../types'

const MoreInfo = styled.div`
  text-align: justify;
  max-width: 580px;
  margin: 0 auto;
  height: 60px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.75);
  @media (max-width: 600px) {
    display: none;
  }
  @media (max-height: 600px) {
    display: none;
  }
`

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
  flex-direction: column;
`

export default class extends React.Component<
  {},
  { data: LaunchType[] | null; i: number }
> {
  state = { data: null as LaunchType[] | null, i: 0 }

  callback = (i: number) => this.setState({ i })

  componentDidMount() {
    axios
      .get('https://api.spacexdata.com/v3/launches/upcoming')
      .then(({ data }) => this.setState({ data: data as LaunchType[] }))
  }

  render() {
    const { data, i } = this.state

    return (
      <Container>
        <Header top />
        <Main>
          {data && (
            <>
              <Launch data={data[i]} />
              <Arrows max={data!.length} current={i} callback={this.callback} />
              <MoreInfo>{data && data[i].details}</MoreInfo>
            </>
          )}
        </Main>
        <ScrollButton to="bottom" />
      </Container>
    )
  }
}
