import React from 'react'
import { mount } from 'enzyme'
import { Spot, SpotProvider, SpotContent } from '../src'

it('is empty when no children and no content or spots', () => {
  const spot = mount(<SpotProvider />)
  expect(spot.html()).toEqual(null)
})

it('is passes through normal content', () => {
  const spot = mount(
    <SpotProvider>
      <p>Testing</p>
    </SpotProvider>
  )
  expect(spot.html()).toEqual('<p>Testing</p>')
})

it('is passes content through in spot', () => {
  const spot = mount(
    <SpotProvider>
      <div id="p">
        <Spot name="test">
          <div id="r">A</div>
        </Spot>
      </div>
    </SpotProvider>
  )
  expect(spot.html()).toEqual('<div id="p"><div id="r">A</div></div>')
})

it('ignores content without match', () => {
  // Render a checkbox with label in the document
  const spot = mount(
    <SpotProvider>
      <Spot name="testa" />
      <SpotContent match="testb" component={() => <div id="c">A</div>} />
    </SpotProvider>
  )

  expect(spot.html()).toEqual(null)
})

it('supports content being injected when exactly matched', () => {
  const spot = mount(
    <SpotProvider>
      <Spot name="test" />
      <SpotContent match="test" component={() => <div id="c">A</div>} />
    </SpotProvider>
  )

  expect(spot.html()).toEqual('<div id="c">A</div>')
})

it('supports content being injected with dynamic pattern', () => {
  const spot = mount(
    <SpotProvider>
      <Spot name="test/123" />
      <SpotContent
        match="test/:id"
        component={({ id }) => <div id="c">{id}</div>}
      />
    </SpotProvider>
  )

  expect(spot.html()).toEqual('<div id="c">123</div>')
})

it('can match multiple spots', () => {
  const spot = mount(
    <SpotProvider>
      <div>
        <Spot name="test/123" />
        <Spot name="test/321" />
      </div>
      <SpotContent match="test/:id" component={({ id }) => <div>{id}</div>} />
    </SpotProvider>
  )

  expect(spot.html()).toEqual('<div><div>123</div><div>321</div></div>')
})

it('spot can have multiple content pushers', () => {
  const spot = mount(
    <SpotProvider>
      <div>
        <Spot name="test" />
      </div>
      <SpotContent match="test" component={() => <div>A</div>} />
      <SpotContent match="test" component={() => <div>B</div>} />
    </SpotProvider>
  )

  expect(spot.html()).toEqual('<div><div>A</div><div>B</div></div>')
})
