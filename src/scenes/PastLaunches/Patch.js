import React from 'react'

export default function ({ mission_patch, name }) {
  const patchFileName = `https://images.weserv.nl/?url=${encodeURIComponent(
    mission_patch.replace(/(^\w+:|^)\/\//, ''),
  )}`
  return (
    <img
      className='patch'
      alt={`${name} patch`}
      src={`${patchFileName}&w=200&h=200`}
      style={{
        width: '5em',
        height: '5em',
      }}
    />
  )
}
