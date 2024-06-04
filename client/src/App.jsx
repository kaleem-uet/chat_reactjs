import { useState } from 'react'
import { io } from "socket.io-client";
const socket = io.connect('http://localhost:3000/');

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <h1>hello world</h1>
  </div>
  )
}

export default App
