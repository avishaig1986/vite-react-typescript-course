import React, { ReactNode } from "react"

type CounterProps = { 
    setCount: React.Dispatch<React.SetStateAction<number>>,
    children: ReactNode,
}


const Counter = ({setCount, children}: CounterProps) => {
    

    return (
        <>
            <h2>{children}</h2>
            <button onClick={() => setCount(curr => curr + 1)}>+</button>
            <button onClick={() => setCount(curr => curr -1)}>-</button>
        </>
        
        
    )
}

export default Counter