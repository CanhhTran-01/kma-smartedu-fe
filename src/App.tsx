import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Get started</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          <div>{count}</div>
          <button onClick={() => setCount(count + 1)}>Click</button>
        </p>
      </div>
    </>
  )
}

export default App