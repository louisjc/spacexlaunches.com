import React from 'react'
import styled from 'styled-components/macro'

const Container = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  line-height: 1;
  margin-top: 20px;
  min-width: 21em;

  @media (max-width: 600px) {
    margin-top: 10px;
  }

  > div {
    div {
      font-family: 'Roboto Mono', monospace;
      font-size: 3.8em;
      font-weight: 100;
    }

    span {
      font-variant: small-caps;
    }
  }
`
export default class extends React.Component<{ date: number }, { now: number }> {
  state = { now: Math.floor(Date.now() / 1000) }
  interval = 0
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick = () => {
    this.setState({ now: Math.floor(Date.now() / 1000) })
  }

  render() {
    let difference = this.props.date - this.state.now

    if (difference <= 0) {
      difference = 0
    }

    const seconds = Math.floor(difference)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    return (
      <Container>
        <div>
          <div>{String(days).padStart(2, '0')}</div>
          <span>days</span>
        </div>
        <div>
          <div>{String(hours % 24).padStart(2, '0')}</div>
          <span>hours</span>
        </div>
        <div>
          <div>{String(minutes % 60).padStart(2, '0')}</div>
          <span>minutes</span>
        </div>
        <div>
          <div>{String(seconds % 60).padStart(2, '0')}</div>
          <span>seconds</span>
        </div>
      </Container>
    )
  }
}
