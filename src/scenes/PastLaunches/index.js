import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import ScrollButton from '../../components/ScrollButton'
import Destination from './Destination'
import Rocket from './Rocket'
import Caption from './Caption'
import Patch from './Patch'
import Header from '../../components/Header'

const Flight = styled.div`
  color: #fff;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  width: 5.6em;
  flex-shrink: 0;

  .destination {
    border-top: 2px solid #071c2f;
    border-bottom: 2px solid #071c2f;
    align-content: stretch;
    justify-content: center;
    display: flex;
    min-height: 5em;

    svg {
      width: 5.6em;
      height: 2.8em;
    }
  }

  .name,
  .outcome {
    text-align: center;
    overflow: hidden;
    font-size: 0.7em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name {
    padding-top: 10px;
    height: 3.3em;
    margin-bottom: 5px;
  }

  .outcome {
    padding-bottom: 10px;
    height: 4em;

    > span {
      padding: 2px 4px;
    }
  }

  .landing {
    background-color: #efefef;
    border: 1px solid;
    border-radius: 10px;
    min-width: 4.4em;
  }

  .patch {
    align-self: center;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .rocket {
    padding-top: 5px;
    align-items: flex-end;
    align-content: stretch;
    justify-content: center;
    display: flex;

    svg {
      width: 3.1em;
    }
  }
`

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  overflow-x: scroll;
  flex-direction: column;
  justify-content: space-between;
  background: #081e35;
  box-shadow: 0 -2px 20px 0 hsla(211, 74%, 9%, 1);

  .flight-container {
    font-size: 14px;
    display: flex;
    overflow-x: scroll;
    border-bottom: 5px solid $border;

    @media (max-height: 770px) {
      font-size: 1.9vh;
    }
  }
`

function Launch(props) {
  return (
    <Flight>
      <Destination orbit={props.rocket.second_stage.payloads[0].orbit} />
      <Rocket {...props.rocket} />
      <Caption success={props.launch_success} rocket={props.rocket} />
      <Patch
        name={props.rocket.second_stage.payloads[0].name}
        mission_patch={props.links.mission_patch}
      />
    </Flight>
  )
}

export default class extends React.Component {
  state = { data: null }

  componentDidMount() {
    axios.get('https://api.spacexdata.com/v2/launches').then(({ data }) => this.setState({ data }))
  }

  render() {
    return (
      <Container>
        <Header />
        <div className='flight-container'>
          {this.state.data
            && this.state.data
              .reverse()
              .map(launch => <Launch key={launch.flight_number} {...launch} />)}
        </div>
        <ScrollButton to='top' />
      </Container>
    )
  }
}
