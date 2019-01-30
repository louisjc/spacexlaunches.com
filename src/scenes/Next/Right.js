import React from 'react'
import styled from 'styled-components'

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

export default function(props) {
  return (
    <Container>
      <div style={{ flex: 2 }}>
        <div className="rocket">{props.rocket.rocket_name}</div>
        <div className="infos">
          <div>
            <span className="name">Flight Number</span>
            <span>{props.flight_number}</span>
          </div>
          <div>
            <span className="name">Used core</span>
            <span>{props.reuse.core ? '✓' : '✘'}</span>
          </div>
          <div>
            <span className="name">Destination</span>
            <span>{props.rocket.second_stage.payloads['0'].orbit}</span>
          </div>
        </div>
      </div>
      <Icons>
        <a
          className={props.links.reddit_campaign ? '' : 'disabled'}
          href={props.links.reddit_campaign}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa fa-reddit-alien" aria-hidden="true" />
        </a>
        <a
          className={props.links.video_link ? '' : 'disabled'}
          href={props.links.video_link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa fa-youtube-play" aria-hidden="true" />
        </a>
      </Icons>
    </Container>
  )
}
