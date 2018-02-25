// @flow

import React from 'react'
import PropTypes from 'prop-types'

import matchPath from './match-path'
import Debug from 'debug'

const debug = Debug('spot:content')

type Props = {
  match: string,
  component: React.Component
}

class SpotContent extends React.Component<Props> {
  componentDidUpdate() {
    this.registerContent()
  }

  componentDidMount() {
    const { spots, contents } = this.context

    if (typeof spots === 'undefined' || typeof contents === 'undefined')
      throw new Error('missing SpotProvider')

    this.registerContent()
  }

  registerContent() {
    debug(
      'registering content %s against spots %j',
      this.props.match,
      Object.keys(this.context.spots)
    )

    return Object.keys(this.context.spots)
      .map(spotName => {
        const match = matchPath(spotName, this.props.match)
        if (match) {
          const spot = this.context.spots[spotName]
          debug('generating content %s %j', this.props.match, match.params)
          spot.addContent(this.props.component(match.params))
        }
      })
      .filter(Boolean)
  }

  render() {
    return null
  }
}

SpotContent.contextTypes = {
  contents: PropTypes.any.isRequired,
  spots: PropTypes.any.isRequired,
  provider: PropTypes.any
}

export default SpotContent
