import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewExpenses } from "./Expenses";
import api from "../../../config/axiosConfig";

const AddExpense = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const addExpense = (event) => {
    event.preventDefault();

    const expenseName = event.target.elements["expense-name"].value;
    const expenseDate = event.target.elements["expense-date"].value;
    const expenseAmount = event.target.elements["expense-amount"].value;
    const expenseCategory = event.target.elements["expense-category"].value;
    
    sendAddExpenseRequest({
      expenseName,
      expenseDate,
      expenseAmount,
      expenseCategory,
    });
  };

  async function sendAddExpenseRequest(data) {
    try {
      
      const response = await api.post("/expense/add-expense", data);
      console.log("working..")
      setError(null);
      setMessage("Expense Added");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data)
        setError("some EERROOOOORR " + error.response.data.message);
      else setError("Can't add expense, some unexpected error!");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] w-[100%] bg-white">
        <form
          onSubmit={addExpense}
          className="flex flex-col add-expense-cover rounded-2xl bg-white shadow-2xl justify-center items-center h-[70%] w-[70%]"
        >
          <div className="my-5 w-[50%]">
            Name of expense :
            <input
              type="text"
              required
              name="expense-name"
              className=" bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-300 "
            />
          </div>

          <div className="my-5 w-[50%]">
            Amount :
            <input
              type="number"
              required
              name="expense-amount"
              className="bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
            />
          </div>

          <div className="my-5 w-[50%]">
            Date :
            <input
              type="date"
              required
              name="expense-date"
              className="bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
            />
          </div>

          <div className="my-5 w-[50%]">
            Category :
            <select
              id="sort-by"
              name="expense-category"
              className=" bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
            >
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              <option value="Bills">Bills</option>
              <option value="Party">Party</option>
              <option value="Extra">Extra</option>
            </select>
          </div>

          <button
            type="submit"
            className=" px-7 py-3 bg-indigo-500 text-white text-xl rounded-4xl"
          >
            Add expense
          </button>

          {message && <div>{message}</div>}
          {error && <div>{error}</div>}

          <ViewExpenses />
        </form>
      </div>
    </>
  );
};

export const AddExpenseButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/add-expense");
  };

  return (
    <>
      <button
        onClick={handleNavigate}
        className=" px-7 py-3 bg-emerald-600 text-white text-xl rounded-4xl"
      >
        Add <span className="hidden xl:block ">Expense</span>
      </button>
    </>
  );
};

export default AddExpense;
