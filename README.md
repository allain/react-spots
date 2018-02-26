# react-spots

A library that supports **extensible content areas**.

It allows React authors to inject dynamic content into sections of the component tree they're nowhere near.

## Example Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'

import {SpotProvider, Spot, SpotContent} from 'react-spots'

const content = <SpotProvider>
    <div>
        <Spot name="content/123" />
        <Spot name="content/321" />

        <SpotContent match="content/:id" component={({id} => <div id={id}>{id}</div>} />
    </div>
</SpotProvider>

ReactDom.render(content, document.getElementById('app'))
```

## API

### `<SpotProvider>`

Provides the common area in which SpotContent and Spots can see each other.

### `<Spot name="name-here" />`

Spot component provide spots where content can be injected.

### `<SpotContent match="pattern" component={Component} />`

Matches the patten against the name of any mounted Spot. If a match is found, it uses the component specified to generate content and adds it to the spot.