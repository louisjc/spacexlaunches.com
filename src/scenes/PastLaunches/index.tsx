import React from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import ScrollButton from '../../components/ScrollButton'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Launch from './Launch'
import VirtualList from 'react-tiny-virtual-list'
import { LaunchType } from '../../types'
import { DIRECTION } from 'react-tiny-virtual-list/types/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
const { SizeMe }: any = require('react-sizeme')

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #081e35;
  box-shadow: 0 -2px 20px 0 hsla(211, 74%, 9%, 1);

  .loading,
  .flight-container {
    z-index: 10;
    background: #011e37;
    flex: 1;
    display: flex;
  }
  .loading {
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .flight-container {
    font-size: 14px;
    > div {
      overflow-x: scroll !important;
      overflow-y: hidden !important;
    }
    border-bottom: 5px solid $border;

    @media (max-height: 770px) {
      font-size: 1.9vh;
    }
  }
`

export default class extends React.Component<{}, { data: LaunchType[] | null }> {
  state = { data: null as LaunchType[] | null }

  componentDidMount() {
    axios
      .get('https://api.spacexdata.com/v3/launches/past')
      .then(({ data }) => this.setState({ data: data as LaunchType[] }))
  }

  render() {
    const data = this.state.data
    let list = data && data.reverse()
    return (
      <Container>
        <Header />
        {list ? (
          <SizeMe monitorHeight>
            {({ size }: { size: { width: number; height: number } }) => {
              if (size.width == null || size.height == null) return null
              return (
                <div className="flight-container">
                  <VirtualList
                    scrollDirection={'horizontal' as DIRECTION}
                    width={size.width}
                    height={size.height}
                    itemCount={list!.length}
                    itemSize={80}
                    renderItem={({ index, style }) => (
                      <Launch key={index} style={style} launch={list![index]} />
                    )}
                  />
                </div>
              )
            }}
          </SizeMe>
        ) : (
          <div className="loading">
            <FontAwesomeIcon icon={faSpinner} size="lg" spin />
          </div>
        )}
        <ScrollButton to="top" />
        <Footer />
      </Container>
    )
  }
}
