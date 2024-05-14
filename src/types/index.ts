//tipos de dato para los gastos 
////////////////////////////////
//esto viene en la documentacion del date picker en npm
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
///////////////////////////////

//tipo de dato del gasto
export type Expense = {
    id:string
    expenseName:string
    amount:number
    category:string
    date:Value
}

//tipo de dato para un gasto temporal, sin el id
export type DraftExpense = Omit<Expense, 'id'>

//categoria
export type Category={
    id:string
    name:string
    icon:string

}