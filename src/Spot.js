// @flow

import React from 'react'
import PropTypes from 'prop-types'
import Debug from 'debug'

const debug = Debug('spot:spot')

type Props = {
  name: string
}

class Spot extends React.Component<Props> {
  state = {
    contents: []
  }

  componentDidMount() {
    const { spots, contents } = this.context

    if (typeof spots === 'undefined' || typeof contents === 'undefined')
      throw new Error('missing SpotProvider')

    debug('registering spot %s', this.props.name)

    this.context.provider.addSpot(this.props.name, this)
  }

  componentWillUnmount() {
    debug('deregistering spot %s', this.props.name)

    this.context.provider.removeSpot(this.props.name, this)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children || null}
        {this.state.contents}
      </React.Fragment>
    )
  }

  addContent(content) {
    this.setState(state => {
      const newContent = React.cloneElement(content, {
        key: `content${Math.round(Math.random() * 100000)}`
      })
      return { contents: state.contents.concat(newContent) }
    })
  }

  removeContent(content) {
    this.setState(state => ({
      contents: this.state.contents.filter(c => c !== content)
    }))
  }
}

Spot.contextTypes = {
  contents: PropTypes.any.isRequired,
  spots: PropTypes.any.isRequired,
  provider: PropTypes.object.isRequired
}

export default Spot
