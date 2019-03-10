import React, { FunctionComponent } from 'react'

const Destination: FunctionComponent<{ orbit: string }> = ({ orbit }) => (
  <span className={`destination ${orbit}`} title={orbit}>
    <svg viewBox="30 300 139 67">
      <use xlinkHref={`img/destinations.svg#${orbit}`} />
    </svg>
  </span>
)

export default Destination
