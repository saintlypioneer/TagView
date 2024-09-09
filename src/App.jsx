import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NestedTagsTree from './TagView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NestedTagsTree />
    </>
  )
}

export default App
