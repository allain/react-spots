// @flow

import React from 'react'
import PropTypes from 'prop-types'
import uniqueId from './lib/unique-id'

type Props = {
  match: string,
  component: React.Component
}

class SpotContent extends React.Component<Props> {
  state = {
    id: uniqueId()
  }

  componentDidMount() {
    const { provider } = this.context && this.context._spots

    console.assert(provider, 'missing SpotProvider')

    provider.register(this.state.id, this.props)
  }

  componentWillUnmount() {
    const { provider } = this.context._spots
    provider.unregister(this.state.id)
  }

  render() {
    return null
  }
}

SpotContent.contextTypes = {
  _spots: PropTypes.object.isRequired
}

export default SpotContent
