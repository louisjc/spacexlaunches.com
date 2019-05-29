import React, { FC } from 'react'
import styled from 'styled-components/macro'

const SIZE = 75

const Picture = styled.picture`
  > * {
    align-self: center;
    margin-bottom: 25px;
    width: ${SIZE}px;
    height: ${SIZE}px;
  }
`

const Patch: FC<{
  mission_patch: string | null
  name: string
}> = props => {
  if (props.mission_patch == null) return <div className="patch" />
  const patchFileName = `https://images.weserv.nl/?url=${encodeURIComponent(
    props.mission_patch.replace(/(^\w+:|^)\/\//, '')
  )}&w=${SIZE * 2}&h=${SIZE * 2}`
  return (
    <a href={props.mission_patch} target="_blank" rel="noopener noreferrer">
      <Picture>
        <source srcSet={`${patchFileName}&output=webp`} type="image/webp" />
        <source srcSet={patchFileName} type="image/jpeg" />
        <img className="patch" alt={`${props.name} patch`} src={patchFileName} />
      </Picture>
    </a>
  )
}

export default Patch
