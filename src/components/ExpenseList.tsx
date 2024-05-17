import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"

export const ExpenseList = () => {
    const {state} = useBudget()    

    //filtramos por categorias si es que se selecciono alguna y si no , muestra todos los gastos sin filtro
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory)
    : state.expenses
    
    //veriificamos si hay gastos
    const isEmpty = useMemo(()=>  filteredExpenses.length === 0,[filteredExpenses])

    //mostramos los gastos si es que hay
  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
        {isEmpty ? <p className="text-gray-600 text-2xl front-bold">No hay gastos</p> : 
        (
            <>
            <p className="text-gary-600 text-2xl font-bold my-5">Listado de Gastos.</p>
            {filteredExpenses.map(expenses =>(
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
