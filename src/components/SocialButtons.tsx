import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components/macro'

const Container = styled.div<{ colors: boolean }>`
  flex-direction: 'row';
  margin-bottom: 5px;
  a {
    color: #fff;
    border-radius: 3px;
    margin-left: 5px;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 7px;
    padding-right: 7px;
    font-size: 12px;
    font-weight: 400;
    &:hover {
      text-decoration: none;
      opacity: 0.8;
    }
  }
`

const SocialButtons: FC<{
  link: string
  text: string
  twitterUser?: string
  colors?: boolean
}> = props => {
  const link = encodeURIComponent(props.link)
  const text = encodeURIComponent(props.text)
  const twitterUser = props.twitterUser && encodeURIComponent(props.twitterUser)
  return (
    <Container colors={props.colors === true}>
      <a
        style={{ background: '#1b95e0' }}
        href={`https://twitter.com/intent/tweet?original_referer=${link}&text=${text}&tw_p=tweetbutton&url=${link}${
          twitterUser ? `&via=${twitterUser}` : ''
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faTwitter} style={{ marginRight: 5 }} />
        Tweet
      </a>
      <a
        style={{ background: '#4267b2' }}
        href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faFacebookF} style={{ marginRight: 5 }} />
        Share
      </a>
    </Container>
  )
}
export default SocialButtons
