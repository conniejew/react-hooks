// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const tiltRef = React.useRef()

  React.useEffect(() => {
    const tiltElement = tiltRef.current
    VanillaTilt.init(tiltElement, {
      max: 15,
      speed: 100,
      glare: false,
    })
    return function cleanupTilt() {
      tiltElement.vanillaTilt.destroy()
    }
  }, [])

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">Tilted</div>
    </Tilt>
  )
}

export default App
