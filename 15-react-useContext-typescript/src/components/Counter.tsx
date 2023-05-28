import { useCounter } from "../context/CounterContext"
import { useCounterText } from "../context/CounterContext"



const Counter = () => {

    const {count, increment, decrement} = useCounter()
    const {text, handleTextInput} = useCounterText()


    return (
        <>
            <h2>{count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button><br/>
        <input type="text" onChange={handleTextInput}/>
        <h2>{text}</h2>
        </>
        
    )
}

export default Counter