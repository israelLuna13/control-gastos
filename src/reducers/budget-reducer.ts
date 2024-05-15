import { DraftExpense, Expense } from "../types"
import {v4 as uuidv4} from 'uuid'
export type budgetActions = 
{type:'add-budget', payload:{budget:number}} |
{type:'show-modal'} |
{type:'close-modal'}|
{type:'add-expense', payload:{expense:DraftExpense}}

export type BudgetState = {
    budget:number
    modal:boolean
    expenses:Expense[]
}

export const initialState:BudgetState={
    budget:0,
    modal:false,
    expenses:[]
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

    if(action.type === 'show-modal'){
        return {
            ...state,
            modal:true
        }

    }
    if(action.type === 'close-modal'){
        return {
            ...state,
            modal:false
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
        return state
}