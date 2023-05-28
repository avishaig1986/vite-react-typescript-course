import { createContext, useReducer, ChangeEvent, ReactElement, useCallback, useContext } from "react";


type StateType = {
    count: number;
    text: string
}
//const initState = {count: 0}
export const initState: StateType = {count: 0, text: ''}

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

const reducer = (state: StateType, action: ReducerAction): 

StateType => {
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

const useCounterContext = (initState: StateType) => {
            //const [count, setCount] = useState<number>(0)
    const [state, dispatch] = useReducer(reducer, initState)
    
    const increment = useCallback(() => dispatch( {type: REDUCER_ACOUNT_TYPE.INCREMENT}), [])
    
    const decrement = useCallback(() => dispatch ({type: REDUCER_ACOUNT_TYPE.DECREMENT}),[])
    
    const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: REDUCER_ACOUNT_TYPE.NEW_INPUT, 
            payload: e.target.value
        })
    }, [])

    return { state, increment, decrement, handleTextInput}

}

type UseCounterContextType = ReturnType<typeof useCounterContext>

const initContextState: UseCounterContextType = {
    state: initState,
    increment: () => {},
    decrement: () => {},
    handleTextInput: () => {},

}

export const CounterContext = createContext<UseCounterContextType>(initContextState)

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined
}

export const CounterProvider = ({
    children, ...initState
}: ChildrenType & StateType): ReactElement => {
    return (
        <CounterContext.Provider value={useCounterContext(initState)}>
            {children}
        </CounterContext.Provider>
    )
}

type UseCounterHookType = {
    count: number,
    increment: () => void,
    decrement: () => void,
}

export const useCounter = (): UseCounterHookType => {
    const {state: {count}, increment, decrement} = useContext(CounterContext)

    return {count, increment, decrement}
}

type UseCounterTextHookType = {
    text: string,
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const useCounterText = (): UseCounterTextHookType => {
    const {state: {text}, handleTextInput} = useContext(CounterContext)
    return {text, handleTextInput}
}