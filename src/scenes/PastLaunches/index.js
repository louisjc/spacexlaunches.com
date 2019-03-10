import React from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import ScrollButton from '../../components/ScrollButton'
import Header from '../../components/Header'
import Launch from './Launch'
import { SizeMe } from 'react-sizeme'
import VirtualList from 'react-tiny-virtual-list'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #081e35;
  box-shadow: 0 -2px 20px 0 hsla(211, 74%, 9%, 1);

  .flight-container {
    background: #011e37;
    flex: 1;
    font-size: 14px;
    display: flex;
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

export default class extends React.Component {
  state = { data: null }

  componentDidMount() {
    axios
      .get('https://api.spacexdata.com/v3/launches/past')
      .then(({ data }) => this.setState({ data }))
  }

  render() {
    let list = this.state.data && this.state.data.reverse()
    if (!list) return null
    return (
      <Container>
        <Header />
        <SizeMe monitorHeight>
          {({ size }) => {
            if (size.width == null || size.height == null) return null
            return (
              <div className="flight-container">
                <VirtualList
                  scrollDirection="horizontal"
                  width={size.width}
                  height={size.height}
                  itemCount={list.length}
                  itemSize={78}
                  renderItem={({ index, style }) => (
                    <Launch key={index} style={style} {...list[index]} />
                  )}
                />
              </div>
            )
          }}
        </SizeMe>
        <ScrollButton to="top" />
      </Container>
    )
  }
}
