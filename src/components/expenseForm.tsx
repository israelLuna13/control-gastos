import { categories } from "../data/categories";
import { useState } from "react";
/////////////////////////////////////////////////////
//para que el calendario funcione
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { DraftExpense } from "../types";
import type {Value} from '../types'

////////////////////////////////////////////////////////

export default function expenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  //recuperamos la fecha seleccionada
  const handleChangeDate= (value:Value) =>{
    setExpense({
      ...expense,
          date:value
    })
  }
//recuperamos los demas datos del formulario
//recibe un input o un selecte 
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    //tomamos el valor y el nombre del campo del formulario 
    const { name, value } = e.target;
    //si hay un amount en el nombre regresa un true
    const isAmountField = ["amount"].includes(name);

    //ponemos una copia de lo que ya teniamos + mas lo nuevo que llega y actualizamos el campo name 
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };





  return (
    <form action="" className="space-y-5">
      <legend
        className="uppercase text-center text-2xl font-black border-b-4
    border-blue-500 py-2"
      >
        Nuevo Gasto
      </legend>

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre del gasto:
        </label>

        <input
          type="text"
          id="expenseName"
          placeholder="Añanade el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>

        <input
          type="number"
          id="amount"
          placeholder="Añande la cantidad"
          className="bg-slate-100 p-2"
          name="amount"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>

        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>

          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha Gasto:
        </label>
        {/* dependencia instalada */}
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
        <input
          type="number"
          id="amount"
          placeholder="Añande la cantidad"
          className="bg-slate-100 p-2"
          name="amount"
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase
      font-bold rounded-lg"
        value={"Registrar Gasto"}
      />
    </form>
  );
}
