import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"

export const ExpenseList = () => {
    const {state} = useBudget()    

    const isEmpty = useMemo(()=>  state.expenses.length === 0,[state.expenses])
    //mostramos los gastos si es que hay
  return (
    <div className="mt-10">
        {isEmpty ? <p className="text-gray-600 text-2xl front-bold">No hay gastos</p> : 
        (
            <>
            <p className="text-gary-600 text-2xl font-bold my-5">Listado de Gastos.</p>
            {state.expenses.map(expenses =>(
                <ExpenseDetail
                key={expenses.id}
                expenses = {expenses}
                />
            ))}
            </>
        )}
    </div>
  )
}
