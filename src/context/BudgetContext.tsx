import { useReducer,createContext,Dispatch,ReactNode, useMemo } from 'react'
import { BudgetState, budgetActions, budgetReducer,initialState } from '../reducers/budget-reducer'

type BudgetContextProps = {
    state: BudgetState,
    dispatch: Dispatch<budgetActions>
    totalExpenses:number
    remainigBudget:number
}

//acepta cualquier elemento de react
type BudgetProviderProps={
    children :ReactNode
}
    //creamos el contexto
    export const BudgetContext = createContext<BudgetContextProps>(null!)

    export const  BudgetProvider= ({children}:BudgetProviderProps) =>{
        const [state,dispatch] = useReducer(budgetReducer,initialState)

        //total de presupuesto
    const totalExpenses=useMemo(()=> state.expenses.reduce((total,expense) => expense.amount + total,0) , [state.expenses])
    const remainigBudget = state.budget- totalExpenses

    return (
        //conectamos el context con el provider
        <>
        <BudgetContext.Provider
        value={{
            state,
            dispatch,
            totalExpenses,
            remainigBudget
        }}>
            {children}
        </BudgetContext.Provider>
        
        </>
  )
}