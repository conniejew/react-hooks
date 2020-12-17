// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function cleanupTilt(tiltElement) {
  return () => tiltElement.vanillaTilt.destroy()
}

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()
  const tiltRef = React.useRef()
  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  const tiltElement = tiltRef.current
  React.useEffect(() => {
    VanillaTilt.init(tiltElement, {
      max: 15,
      speed: 100,
      glare: false,
    })
    cleanupTilt()
  })

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
