import React, { FunctionComponent } from 'react'
import { RocketType } from '../../../types'
import RocketsSVG from './rockets.svg'
import styled from 'styled-components/macro'

const Container = styled.div`
  flex: 1;
  padding-top: 5px;
  align-items: flex-end;
  align-content: stretch;
  justify-content: center;
  display: flex;
  svg {
    overflow: visible;
    height: 100%;
    width: 100%;
  }
`

function getPayloadId(rocket: RocketType) {
  switch (rocket.second_stage.payloads[0].payload_type) {
    case 'Dragon Boilerplate':
      return 'dragonNT'
    case 'Dragon 1.0':
    case 'Dragon 1.1':
      return 'dragon'
    case 'Crew Dragon':
      return 'crew-dragon'
    case 'Satellite':
    case 'Lander':
      return 'sat'
    default:
      return ''
  }
}

function getSvgRocketId(rocket: RocketType) {
  if (rocket.rocket_id === 'falcon1') return rocket.rocket_id

  const res = `${rocket.rocket_id}_${rocket.rocket_type}_${getPayloadId(rocket)}`
  return res
}

function getOptions(rocket: RocketType): string[] {
  let options = []
  if (rocket.first_stage.cores[0].legs) {
    options.push('legs')
  }
  if (rocket.first_stage.cores[0].block === 5 && rocket.rocket_id !== 'falconheavy') {
    options.push('block5')
  }
  if (rocket.first_stage.cores[0].gridfins) {
    options.push('farings')
  }
  return options
}

const Rocket: FunctionComponent<{
  rocket: RocketType
  success: boolean | null
}> = ({ rocket, success }) => {
  const id = getSvgRocketId(rocket)
  const options = getOptions(rocket)
  return (
    <Container
      className="rocket"
      title={id}
      style={success ? {} : { filter: 'grayscale(1) opacity(0.5)' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 535">
          <use key={`${RocketsSVG}#${id}`} xlinkHref={`${RocketsSVG}#${id}`} />
          {options.map(option => (
            <use key={option} xlinkHref={`${RocketsSVG}#${option}`} />
          ))}
        </svg>
      </svg>
    </Container>
  )
}

export default Rocket
