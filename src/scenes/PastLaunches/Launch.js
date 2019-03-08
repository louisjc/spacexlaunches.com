import React from 'react'
import styled from 'styled-components'
import Destination from './Destination'
import Rocket from './Rocket'
import Caption from './Caption'
import Patch from './Patch'

const Flight = styled.div`
  font-size: 14px;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 5px;
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
    font-size: 12px;
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
      white-space: nowrap;
    }
  }

  .landing {
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid;
    border-radius: 10px;
    overflow: hidden;
    min-width: 4.4em;
  }

  .patch {
    align-self: center;
    margin-bottom: 10px;
    width: 90%;
  }

  .rocket {
    flex: 1;
    padding-top: 5px;
    align-items: flex-end;
    align-content: stretch;
    justify-content: center;
    display: flex;
    svg {
      height: 100%;
      width: 100%;
    }
  }
`

export default function Launch(props) {
  return (
    <Flight style={props.style}>
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
