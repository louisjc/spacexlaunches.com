import React, { FunctionComponent } from 'react'
import { RocketType } from './types'
import RocketsSVG from './rockets.svg'

function getPayloadId(rocket: RocketType) {
  console.log(rocket.second_stage.payloads[0].payload_type)
  switch (rocket.second_stage.payloads[0].payload_type) {
    case 'Dragon Boilerplate':
      return 'dragonNT'
    case 'Dragon 1.0':
    case 'Dragon 1.1':
      return 'dragon'
    case 'Crew Dragon':
      return 'crew-dragon'
    case 'Satellite':
      return 'sat'
    default:
      return ''
  }
}

function getSvgRocketId(rocket: RocketType) {
  if (rocket.rocket_id === 'falcon1') return rocket.rocket_id

  rocket.second_stage.payloads.forEach(e => console.log(e.payload_type))
  const dragon = rocket.second_stage.payloads.some(
    ({ payload_type }) => payload_type === 'Dragon 1.1'
  )
  const res = `${rocket.rocket_id}_${rocket.rocket_type}_${getPayloadId(rocket)}`
  return res
}

function getOptions(rocket: RocketType): string[] {
  let options = []
  if (rocket.first_stage.cores[0].legs) {
    options.push('legs')
  }
  if (rocket.first_stage.cores[0].gridfins) {
    options.push('farings')
  }
  return options
}

const Rocket: FunctionComponent<RocketType> = rocket => {
  const id = getSvgRocketId(rocket)
  const options = getOptions(rocket)
  return (
    <div className="rocket" title={id}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 535">
        <use xlinkHref={`${RocketsSVG}#${id}`} />
        {options.map((option, i) => (
          <use key={i} xlinkHref={`${RocketsSVG}#${option}`} />
        ))}
      </svg>
    </div>
  )
}

export default Rocket
