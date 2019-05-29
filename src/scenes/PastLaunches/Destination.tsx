import React, { FC } from 'react'
import DestinationSVG from './destinations.svg'

const Destination: FC<{ orbit: string }> = ({ orbit }) => (
  <span className={`destination ${orbit}`} title={orbit}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="30 300 139 67">
      <use xlinkHref={`${DestinationSVG}#${orbit}`} />
    </svg>
  </span>
)

export default Destination
