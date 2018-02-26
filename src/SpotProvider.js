import React from 'react'
import PropTypes from 'prop-types'

class SpotProvider extends React.Component {
  state = {
    contents: {}
  }

  getChildContext() {
    return {
      _spots: {
        contents: this.state.contents,
        provider: this
      }
    }
  }

  render() {
    return <React.Fragment>{this.props.children || null}</React.Fragment>
  }

  register(id, contentSpec) {
    this.setState(state => ({
      ...state,
      contents: { ...state.contents, [id]: contentSpec }
    }))
  }

  unregister(id) {
    this.setState(state => {
      const newContents = { ...this.state.contents }
      delete newContents[id]
      return { contents: newContents }
    })
  }
}

SpotProvider.childContextTypes = {
  _spots: PropTypes.object.isRequired
}

export default SpotProvider
