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

const example = (
  <SpotProvider>
    <Spot name="example/1" />
    <Spot name="example/2" />
    <SpotContent match="example/:exampleId" component={ExampleButton} />
  </SpotProvider>
)

ReactDOM.render(example, document.getElementById('app'))
