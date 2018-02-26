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
    const { provider } = this.context

    console.assert(provider, 'missing SpotProvider')

    provider.register(this.state.id, this.props)
  }

  componentWillUnmount() {
    const { provider } = this.context
    provider.unregister(this.state.id)
  }

  render() {
    return null
  }
}

SpotContent.contextTypes = {
  contents: PropTypes.any.isRequired,
  provider: PropTypes.any
}

export default SpotContent
