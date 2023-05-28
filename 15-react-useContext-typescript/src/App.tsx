// npm create vite@latest

// How to solve "JSX element implicitly has type 'any' " error:
// Ctrl+Shift+P Then type: Developer: Reload Window

import './App.css';
import Counter from './components/Counter';
import { CounterProvider } from './context/CounterContext';
import {initState} from "./context/CounterContext"

function App() {
 
  return (
    <>
      <CounterProvider 
        count={initState.count} 
        text={initState.text}>
      <Counter/>
      </CounterProvider>
    </>
  )
}

export default App
