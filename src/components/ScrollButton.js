import React from 'react'
import styled from 'styled-components'
import arrow from './arrow-bottom.svg'

const Container = styled.div`
  text-align: center;
  padding: 0 0 0.3em;
  cursor: pointer;
  margin: 0 auto;
  font-size: 1.5em;

  > div {
    margin: 0.1em 0;
    color: #fff;
    font-weight: 300;
    line-height: 1;
  }

  @media (max-width: 600px) {
    font-size: 1.2em;
  }
`

const Img = styled.img`
  height: 0.8em;
`

const scroll = toTop => {
  const h = toTop
    ? 0
    : Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return () =>
    window.scrollTo({
      top: h,
      left: 0,
      behavior: 'smooth',
    })
}

export default function({ to }) {
  const toTop = to === 'top'
  return (
    <Container onClick={scroll(toTop)}>
      {toTop && (
        <Img src={arrow} alt="arrow bottom" style={{ transform: 'rotate(180deg)' }} />
      )}
      {!toTop && <div>View past launches</div>}
      {!toTop && <Img src={arrow} alt="arrow top" />}
    </Container>
  )
}
