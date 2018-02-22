import React from 'react'

export default function ({ orbit }) {
  return (
    <span className={`destination ${orbit}`} title={orbit}>
      <svg viewBox='30 300 139 67'>
        <use xlinkHref={`img/destinations.svg#${orbit}`} />
      </svg>
    </span>
  )
}
