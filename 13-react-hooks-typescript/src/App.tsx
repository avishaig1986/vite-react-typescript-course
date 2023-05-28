// npm create vite@latest

// How to solve "JSX element implicitly has type 'any' " error:
// Ctrl+Shift+P Then type: Developer: Reload Window

// useCallback - save a function
// useMemo - for expensive calculation the result is being saved
// useRef - the change input in the text input will be stored in inputRef?.current?.value
//          changing the value will not make re render in our component
//          but when the component does re render  - if we click on the add count that will cause re render when the state change we do render the component and at that point we will print to console.
//          current will be the input element and current.value will be the value of the element

import { useEffect, useState, useCallback, useRef, useMemo, MouseEvent, KeyboardEvent } from 'react';
import './App.css';
import './components/Heading';

interface User {
  id: number,
  username: string,
}

type fibonaciFunc = (n: number) => number

const fib: fibonaciFunc = (n) => {
  if (n<2) return n
  return fib( n-1) + fib (n-2)
}

const num: number = 20

function App() {
  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<User[] | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  //if(!inputRef.current)
  //console.log(inputRef?.current)
  console.log(inputRef?.current?.value)


  useEffect(() => {
    console.log('mounting')
    console.log('Users: ', users)

    return () => console.log('unmounting')

  }, [users])

  const addTwo = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>):void => setCount(curr => curr + 2),[])

  const result = useMemo<number>(() => fib(num),[num])
  return (
    <div className='App'>
      <h1>{count}</h1>
      <button onClick={addTwo}>Add</button>
      <h2>{result}</h2>
      <input ref={inputRef} type="text"></input>
    </div>
  )
}

export default App
