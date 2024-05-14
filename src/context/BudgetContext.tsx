import { useReducer,createContext,Dispatch,ReactNode } from 'react'
import { BudgetState, budgetActions, budgetReducer,initialState } from '../reducers/budget-reducer'

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<budgetActions>
}

type BudgetProviderProps={
    children :ReactNode
}

 export const BudgetContext = createContext<BudgetContextProps>(null!)

export const  BudgetProvider= ({children}:BudgetProviderProps) =>{

    const [state,dispatch] = useReducer(budgetReducer,initialState)

    return (
        //conectamos el context con el provider
        <>
        <BudgetContext.Provider
        value={{
            state,
            dispatch
        }}
        >
            {children}

        </BudgetContext.Provider>
        
        </>
  )
}

/*
import { useReducer,createContext,Dispatch,ReactNode } from 'react'
import { BudgetState, budgetActions, budgetReducer,initialState } from '../reducers/budget-reducer'

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<budgetActions>
}

type BudgetProviderProps={
    children :ReactNode
}

 export const BudgetContext = createContext<BudgetContextProps>(null!)

export const  BudgetProvider= ({children}:BudgetProviderProps) =>{

    const [state,dispatch] = useReducer(budgetReducer,initialState)

    return (
        //conectamos el context con el provider
        <>
        <BudgetContext.Provider
        value={{
            state,
            dispatch
        }}
        >
            {children}

        </BudgetContext.Provider>
        
        </>
  )
}


*/