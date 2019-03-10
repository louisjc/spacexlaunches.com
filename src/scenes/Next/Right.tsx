import React, { FunctionComponent } from 'react'
import styled from 'styled-components/macro'
import { LaunchType } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedditAlien, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    margin-left: 30px;
  }

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
`

const Icons = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 2em;
  justify-content: space-around;

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

const Right: FunctionComponent<{ data: LaunchType }> = ({ data }) => (
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
          <span>
            {data.rocket.first_stage.cores.map(c => (c.reused ? '✓' : '✘')).join('')}
          </span>
        </div>
        <div>
          <span className="name">Destination</span>
          <span>{data.rocket.second_stage.payloads[0].orbit}</span>
        </div>
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

export default Right
