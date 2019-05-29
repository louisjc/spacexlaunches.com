import React, { FC } from 'react'
import styled from 'styled-components/macro'
import { LaunchType } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedditAlien, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  .rocket {
    font-size: 2em;
    margin-bottom: 10px;
    text-align: center;
  }

  .infos {
    > div {
      display: flex;
    }
  }

  .name {
    flex: 1;
    margin-right: 20px;
  }

  .monospace {
    font-family: monospace;
  }
`

const Icons = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 2em;
  justify-content: space-around;
  margin-top: 10px;
  @media (max-width: 600px) {
    margin-top: 20px;
  }

  a {
    color: #fff;

    &:hover {
      color: #ccc;
    }
  }

  .disabled {
    color: rgba(255, 255, 255, 0.2) !important;
    cursor: default;
  }
`

function getTotalMass(data: LaunchType) {
  if (data.rocket.second_stage.payloads.every(e => e.payload_mass_kg === null))
    return null
  return data.rocket.second_stage.payloads.reduce<number>(
    (acc, e) => acc + (e.payload_mass_kg || 0),
    0
  )
}

const Right: FC<{ data: LaunchType }> = ({ data }) => {
  const mass = getTotalMass(data)
  return (
    <Container>
      <div style={{ flex: 2 }}>
        <div className="rocket">{data.rocket.rocket_name}</div>
        <div className="infos">
          <div>
            <span className="name">Flight Number</span>
            <span>{data.flight_number}</span>
          </div>
          <div>
            <span className="name">Used core</span>
            <span className="monospace">
              {data.rocket.first_stage.cores.map(c => (c.reused ? '✓' : '✘')).join('')}
            </span>
          </div>
          <div>
            <span className="name">Landing attempt</span>
            <span className="monospace">
              {data.rocket.first_stage.cores
                .map(({ landing_intent: i }) => (i === null ? '?' : i ? '✓' : '✘'))
                .join('')}
            </span>
          </div>
          <div>
            <span className="name">Destination</span>
            <span>{data.rocket.second_stage.payloads[0].orbit}</span>
          </div>
          {mass && (
            <div>
              <span className="name">Mass</span>
              <span>{mass}kg</span>
            </div>
          )}
        </div>
      </div>
      <Icons>
        <a
          className={data.links.reddit_campaign ? '' : 'disabled'}
          href={data.links.reddit_campaign!}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faRedditAlien} />
        </a>
        <a
          className={data.links.video_link ? '' : 'disabled'}
          href={data.links.video_link!}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </Icons>
    </Container>
  )
}

export default Right
