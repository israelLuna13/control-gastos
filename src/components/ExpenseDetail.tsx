import { useMemo } from "react";
///////////////////////////////////////
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";

///////////////////////////////////////

import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

//tipo para el gasto
type ExpenseDetailProps = {
  expenses: Expense;
};
//detalle del gasto - recibe un gasto
export const ExpenseDetail = ({ expenses }: ExpenseDetailProps) => {

  //obtenermos el objeto de la categoria
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expenses.category)[0],
    [expenses]
  );

  //disparador de acciones o metodos
  const {dispatch}= useBudget()

  //Animacion para actualizar
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type:'get-expense-by-id',payload:{id:expenses.id}})}>Actualizar</SwipeAction>
    </LeadingActions>
  );

    //Animacion para eliminar
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
       onClick={() => {dispatch({type:'remove-expense', payload:{id:expenses.id}})}}
       destructive={true}
       >
        Eliminar
        </SwipeAction>
    </TrailingActions>
  );
  return (
    //envolvemos lo que queremos que tenga animacion
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="icono gasto"
              className="w-20"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expenses.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expenses.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={expenses.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

//SE TIENE QUE INSTALAR NPM I PROPS-TYPES