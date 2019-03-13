import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import Countdown from '../../components/Countdown'
import Right from './Right'
import { LaunchType } from '../../types'
import Rocket from '../PastLaunches/Rocket'

const RocketContainer = styled.div`
  width: 17px;

  @media (min-width: 600px) {
    margin: 0 40px 0 45px;
  }
  div {
    height: 100%;
    padding: 0;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: 75px;
    overflow: hidden;
    svg {
      transform: rotate(90deg) scale(4);
    }
  }
`

const Mission = styled.div<{ size: number }>`
  line-height: 50px;
  font-size: ${p => p.size}em;
  text-align: right;
`

const Container = styled.div`
  display: flex;
  line-height: 1;
  .left {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 600px) {
    flex-direction: column;

    > div {
      margin-top: 40px;
    }
  }

  @media (max-width: 400px) {
    font-size: 0.8em;
  }
`

const Title = styled.div`
  text-align: right;
`

const Launch: FunctionComponent<{ data: LaunchType }> = ({ data }) => {
  const l = data.mission_name.length
  const name_fontsize = l > 20 ? (l > 26 ? 2 : 3) : 4

  return (
    <Container>
      <div className="left">
        <Title>Mission Name</Title>
        <Mission size={name_fontsize}>{data.mission_name}</Mission>
        <Countdown date={data.launch_date_unix} />
      </div>
      <RocketContainer>
        <Rocket rocket={data.rocket} success={true} />
      </RocketContainer>
      <Right data={data} />
    </Container>
  )
}

export default Launch
