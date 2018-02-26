import React from 'react'
import ReactDOM from 'react-dom'
import { Spot, SpotProvider, SpotContent } from '../../index.js'

console.assert(Spot)
console.assert(SpotProvider)
console.assert(SpotContent)

const ExampleButton = ({ exampleId }) => (
  <button onClick={() => alert(`Clicked Button ${exampleId}`)}>
    Button {exampleId}
  </button>
)

class App extends React.Component {
  state = {
    left: true
  }

  render() {
    const { left } = this.state

    return (
      <SpotProvider>
        <div
          onClick={() =>
            this.setState(state => ({
              left: !state.left
            }))
          }>
          <Spot name="target" />
          {left ? (
            <SpotContent
              key="left"
              match="target"
              component={() => <div>LEFT</div>}
            />
          ) : (
            <SpotContent
              key="right"
              match="target"
              component={() => <div>RIGHT</div>}
            />
          )}
        </div>
      </SpotProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
