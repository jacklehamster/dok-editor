import React from 'react'
import { DokEditor } from 'dok-editor';

const App = () => {
  return <>
    <DokEditor language="yaml" code={`
        test: 123
    `} ></DokEditor>
  </>;
}

export default App
