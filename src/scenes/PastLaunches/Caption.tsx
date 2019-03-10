import React, { FunctionComponent } from 'react'
import { RocketType } from '../../types'

const LandingOutcome: FunctionComponent<{
  success: boolean | null
  land_success: boolean | null
  landing_type: string | null
}> = props => {
  if (!props.success) {
    return <span className="fail" style={{ fontWeight: 600 }}>{`// Failure \\\\`}</span>
  }
  if (props.landing_type != null) {
    let className
    let text
    if (props.landing_type === 'Ocean') {
      text = 'Water land'
      className = 'neutral'
    } else if (props.land_success) {
      text = 'Landed'
      className = 'success'
    } else {
      text = 'Landing fail'
      className = 'fail'
    }
    return <span className={`landing ${className}`}>{text}</span>
  }
  return null
}

const Caption: FunctionComponent<{
  success: boolean | null
  rocket: RocketType
  name: string
}> = props => (
  <div className="caption">
    <span className="name">{props.name}</span>
    <span className="outcome">
      <LandingOutcome
        success={props.success}
        landing_type={props.rocket.first_stage.cores[0].landing_type}
        land_success={props.rocket.first_stage.cores[0].land_success}
      />
    </span>
  </div>
)

export default Caption
