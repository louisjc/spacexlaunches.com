import React, { FunctionComponent } from 'react'
import DestinationSVG from './destinations.svg'

const Destination: FunctionComponent<{ orbit: string }> = ({ orbit }) => (
  <span className={`destination ${orbit}`} title={orbit}>
    <svg viewBox="30 300 139 67">
      <use xlinkHref={`${DestinationSVG}#${orbit}`} />
    </svg>
  </span>
)

export default Destination
