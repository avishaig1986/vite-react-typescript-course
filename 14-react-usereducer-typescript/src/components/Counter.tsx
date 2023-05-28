import { ChangeEvent, useReducer } from "react"


//const initState = {count: 0}
const initState = {count: 0, text: ''}

/*
const enum REDUCER_ACOUNT_TYPE {
    INCREMENT,
    DECREMENT
}
*/

const enum REDUCER_ACOUNT_TYPE {
    INCREMENT,
    DECREMENT,
    NEW_INPUT

}


type ReducerAction = {
    type: REDUCER_ACOUNT_TYPE
    payload?: string,
}

const reducer = (state: typeof initState, action: ReducerAction): 

typeof initState => {
    switch (action.type) {
        case REDUCER_ACOUNT_TYPE.INCREMENT: 
            return {...state, count: state.count + 1}
        case REDUCER_ACOUNT_TYPE.DECREMENT:
            return {...state, count: state.count - 1}
        case REDUCER_ACOUNT_TYPE.NEW_INPUT:
            //return {...state, text: action.payload ?? ''}
            return {...state, text: action.payload ?? ''}
        default: 
            throw new Error()
    }
}


const Counter = () => {
    //const [count, setCount] = useState<number>(0)
const [state, dispatch] = useReducer(reducer, initState)
const increment = () => dispatch( {type: REDUCER_ACOUNT_TYPE.INCREMENT})
const decrement = () => dispatch ({type: REDUCER_ACOUNT_TYPE.DECREMENT})
const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
        type: REDUCER_ACOUNT_TYPE.NEW_INPUT, 
        payload: e.target.value})
}


    return (
        <>
            <h2>{state.count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button><br/>
        <input type="text" onChange={handleTextInput}/>
        <h2>{state.text}</h2>
        </>
        
    )
}

export default Counter