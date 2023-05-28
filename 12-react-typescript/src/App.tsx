// npm create vite@latest

// How to solve "JSX element implicitly has type 'any' " error:
// Ctrl+Shift+P Then type: Developer: Reload Window

import { useState } from 'react';
import './App.css';
import './components/Heading';
import Heading from './components/Heading';
import Section from './components/Section';
import Counter from './components/Counter';
import List from './components/List'

function App() {
  const [count, setCount] = useState<number>(0)


  return (
    <>
      <Heading title={"the title!"}/>
      <Section title={"subheading title from app.tsx"}>The content of the section</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List items={["😎 sunglasses","👨🏻‍💻 computer","🙏 thanks"]} 
            render={(item: string) =>
          <span className='lightblue'>{item}</span>}
      />
    </>
  )
}

export default App
