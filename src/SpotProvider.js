import React from 'react'
import PropTypes from 'prop-types'
import Debug from 'debug'

const debug = Debug('spot:provider')

class SpotProvider extends React.Component {
  state = {
    contents: {}
  }

  getChildContext() {
    return {
      contents: this.state.contents,
      provider: this
    }
  }

  render() {
    return <React.Fragment>{this.props.children || null}</React.Fragment>
  }

  register(id, contentSpec) {
    debug('adding content %s', id)

    this.setState(state => ({
      ...state,
      contents: { ...state.contents, [id]: contentSpec }
    }))
  }

  unregister(id) {
    debug('removing spot %s', id)

    this.setState(state => {
      const newContents = { ...this.state.contents }
      delete newContents[id]
      return { contents: newContents }
    })
  }
}

SpotProvider.childContextTypes = {
  contents: PropTypes.any.isRequired,
  provider: PropTypes.object.isRequired
}

export default SpotProvider
