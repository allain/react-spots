// @flow

import React from 'react'
import PropTypes from 'prop-types'
import matchPath from './lib/match-path'

type Props = {
  name: string
}

class Spot extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        {this.props.children || null}
        {this.buildSpotContent()}
      </React.Fragment>
    )
  }

  buildSpotContent() {
    return Object.entries(this.context._spots.contents).reduce(
      (rendered, [id, { match, component }]) => {
        const pathMatch = matchPath(this.props.name, match)

        return pathMatch
          ? rendered.concat(
              React.cloneElement(component(pathMatch.params), { key: id })
            )
          : rendered
      },
      []
    )
  }
}

Spot.contextTypes = {
  _spots: PropTypes.object.isRequired
}

export default Spot
