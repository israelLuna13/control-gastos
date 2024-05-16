import { DraftExpense, Expense } from "../types"
import {v4 as uuidv4} from 'uuid'
export type budgetActions = 
{type:'add-budget', payload:{budget:number}} |
{type:'show-modal'} |
{type:'close-modal'}|
{type:'add-expense', payload:{expense:DraftExpense}}|
{type:'remove-expense', payload:{id:Expense['id']}}|
{type:'get-expense-by-id', payload:{id:Expense['id']}}|
{type:'update_expense', payload:{expense:Expense}}


export type BudgetState = {
    budget:number
    modal:boolean
    expenses:Expense[]
    editingId:Expense['id']
}

//obtenemos lo que este en el local storage
const initialBudget=():number =>{
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget:0
}

const localStorageExpense = () :Expense[] =>{
const localStorageExpenses = localStorage.getItem('expenses') 
return localStorageExpenses ? JSON.parse(localStorageExpenses):[]   

}

export const initialState:BudgetState={
    //budget y expenses inicializamos con lo que tenga el localstorage
    budget:initialBudget(),
    modal:false,
    expenses:localStorageExpense(),
    editingId:''
}

//devuelve un expense con id , toma un gasto temporal sin id 
const createExpense = (draftExpense:DraftExpense):Expense=>{
//hace una copia de lo que ya tenia + el nuevo id
    return {
    ...draftExpense,
    id:uuidv4()
}
}

export const budgetReducer = (
    state : BudgetState = initialState,
    action: budgetActions) =>{
    
    if(action.type === 'add-budget'){
        return {
            ...state,
            budget:action.payload.budget
        }
    }

    //mostramos el modal
    if(action.type === 'show-modal'){
        return {
            ...state,
            modal:true
        }

    }

    //cerramos el modal 
    if(action.type === 'close-modal'){
        return {
            ...state,
            modal:false,
            editingId:'' // lo ponemos en false para que no cargue los datos del gasto que se estaba editando cuando queramos agregar un nuevo gasto
        }
        
    }

    //agregamos un gasto con id
    if(action.type === 'add-expense'){

        //creamos un expense con id 
        const expense = createExpense(action.payload.expense)

        //toma una copia de lo que ya teniamos y le agrema un expense ya con id 
        return {
            ...state,
            expenses:[...state.expenses,expense],
            modal:false //reiniciamos el formulario cuando se agrega un nuevo gasto
               }
        
    }

    //eliminamos un gasto
    if(action.type === 'remove-expense'){
        return {
            ...state,
            expenses: state.expenses.filter(expenses => expenses.id !== action.payload.id) // nos traemos los gastos diferentes al que se va a eliminar
        }
        
    }


    //obtenemos el id del gasto que se quiere antualizar
    if(action.type === 'get-expense-by-id'){
        return {
            ...state,
            editingId:action.payload.id,
            modal:true
        }
        
    }

    //actualizamos un gasto
    if(action.type === 'update_expense'){
        return {
            ...state,
            expenses:state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense
                : expense
            ),
            modal:false,
            editingId:''

        }
        
    }
        return state
}