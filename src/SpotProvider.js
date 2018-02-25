import React from 'react'
import PropTypes from 'prop-types'
import Debug from 'debug'

const debug = Debug('spot:provider')

class SpotProvider extends React.Component {
  state = {
    spots: {},
    contents: {}
  }

  getChildContext() {
    return {
      spots: this.state.spots,
      contents: this.state.contents,
      provider: this
    }
  }

  render() {
    return <React.Fragment>{this.props.children || null}</React.Fragment>
  }

  addSpot(name, spot) {
    debug('adding spot %s', name)
    this.setState(state => ({
      ...state,
      spots: { ...state.spots, [name]: spot }
    }))
  }

  removeSpot(name) {
    debug('removing spot %s', name)
    this.setState(state => {
      const newSpots = { ...this.state.spots }
      delete newSpots[name]
      return { spots: newSpots }
    })
  }
}

SpotProvider.childContextTypes = {
  contents: PropTypes.any.isRequired,
  spots: PropTypes.any.isRequired,
  provider: PropTypes.object.isRequired
}

export default SpotProvider
