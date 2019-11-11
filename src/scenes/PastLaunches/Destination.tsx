import React, { FC } from 'react'
import DestinationSVG from './destinations.svg'

function orbitMap(orbit: string) {
  if (['VLEO'].includes(orbit)) {
    return 'LEO'
  }
  return orbit
}

const Destination: FC<{ orbit: string }> = ({ orbit }) => {
  orbit = orbitMap(orbit)
  return (
    <span className={`destination ${orbit}`} title={orbit}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="30 300 139 67">
        <use xlinkHref={`${DestinationSVG}#${orbitMap(orbit)}`} />
      </svg>
    </span>
  )
}

export default Destination
