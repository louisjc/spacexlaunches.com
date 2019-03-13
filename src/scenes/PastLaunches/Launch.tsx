import React, { FunctionComponent, CSSProperties } from 'react'
import styled from 'styled-components/macro'
import Destination from './Destination'
import Rocket from './Rocket'
import Caption from './Caption'
import Patch from './Patch'
import { LaunchType } from '../../types'

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

    overflow: visible;
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
`

const Launch: FunctionComponent<{ style: CSSProperties; launch: LaunchType }> = ({
  style,
  launch,
}) => (
  <Flight style={style}>
    <Destination orbit={launch.rocket.second_stage.payloads[0].orbit} />
    <Rocket rocket={launch.rocket} success={launch.launch_success} />
    <Caption
      success={launch.launch_success}
      rocket={launch.rocket}
      name={launch.mission_name}
    />
    <Patch name={launch.mission_name} mission_patch={launch.links.mission_patch} />
  </Flight>
)

export default Launch
