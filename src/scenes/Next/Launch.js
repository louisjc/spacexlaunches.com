import React from 'react'
import styled from 'styled-components'
import Countdown from '../../components/Countdown'
import Right from './Right'

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

export default function (props) {
  return (
    <Container>
      <Left>
        <Title>Primary Payload</Title>
        <Mission>{props.rocket.second_stage.payloads['0'].payload_id}</Mission>
        <Countdown date={props.launch_date_unix} />
      </Left>
      <Right {...props} />
    </Container>
  )
}
