# react-spots

A library that supports extensible content areas.

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