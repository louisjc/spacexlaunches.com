import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import Countdown from '../../components/Countdown'
import Right from './Right'
import { LaunchType } from '../../types'

const Mission = styled.div`
  font-size: 4em;
  text-align: right;
`

const Container = styled.div`
  display: flex;
  line-height: 1;

  > div {
    margin-top: 20px;
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
const Left = styled.div`
  @media (min-width: 600px) {
    border-right: 2px solid #7f90a4;
    padding-right: 30px;
  }
`

const Title = styled.div`
  text-align: right;
`

const Launch: FunctionComponent<{ data: LaunchType }> = ({ data }) => (
  <Container>
    <Left>
      <Title>Primary Payload</Title>
      <Mission>{data.rocket.second_stage.payloads[0].payload_id}</Mission>
      <Countdown date={data.launch_date_unix} />
    </Left>
    <Right data={data} />
  </Container>
)

export default Launch
