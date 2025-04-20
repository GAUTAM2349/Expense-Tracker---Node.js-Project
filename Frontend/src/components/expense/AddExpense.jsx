import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewExpenses } from "./Expenses";
import api from "../../../config/axiosConfig";

const AddExpense = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addExpense = (event) => {
    event.preventDefault();

    const expenseName = event.target.elements["expense-name"].value;
    const expenseDate = event.target.elements["expense-date"].value;
    const expenseAmount = event.target.elements["expense-amount"].value;
    const expenseCategory = event.target.elements["expense-category"].value;
    const expenseType = event.target.elements["expense-type"].value;

    sendAddExpenseRequest({
      expenseName,
      expenseDate,
      expenseAmount,
      expenseCategory,
      expenseType
    });
  };

  async function sendAddExpenseRequest(data) {
    try {
      setMessage(null);
      const response = await api.post("/expense/add-expense", data);

      setError(null);
      setMessage("Expense Added");
      navigate('/expenses');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data)
        setError("some EERROOOOORR " + error.response.data.message);
      else setError("Can't add expense, some unexpected error!");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-[100%] w-[100%] bg-white">
        <form
          onSubmit={addExpense}
          className="flex flex-col add-expense-cover rounded-2xl bg-white shadow-2xl justify-center items-center  mt-15 h-[70vh] w-[95%] sm:w-[85%] md:w-[70%]"
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
              min="1"
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


          <div className="my-5 w-[50%]">
            Type :
            <select
              id="sort-by"
              name="expense-type"
              className=" bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
              
            </select>
          </div>


          <button
            type="submit"
            className=" px-7 py-3 bg-indigo-500 text-white text-xl rounded-4xl"
          >
            Add expense
          </button>

          {message && <div className="mb-[5px] text-green-500">{message}</div>}
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
        className=" px-3 py-3 bg-emerald-600 text-white text-xl rounded-4xl"
      >
        <span className="">Add</span>
      </button>
    </>
  );
};

export default AddExpense;
