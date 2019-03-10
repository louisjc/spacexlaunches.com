import React from 'react'

function getSvgRocketId(rocket, payloads) {
  if (rocket.rocket_id === 'falcon1') return rocket.rocket_id

  const dragon = payloads.some(payload =>
    payload.payload_type.toLowerCase().includes('dragon')
  )
  const res = `${rocket.rocket_id}_${rocket.rocket_type}${(dragon && '_dragon') || ''}`
  return res
}

export default function(rocket) {
  const id = getSvgRocketId(rocket, rocket.second_stage.payloads)
  const options = []
  return (
    <div className="rocket" title={id}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 535">
        <use xlinkHref={`img/rockets.svg#${id}`} />
        {options.map(
          option =>
            `<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/rockets.svg#${option}"></use>`
        )}
      </svg>
    </div>
  )
}
