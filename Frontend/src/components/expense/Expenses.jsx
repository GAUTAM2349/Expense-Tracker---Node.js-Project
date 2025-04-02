import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        
        
        const response = await api.get("/expense/get-expenses");
        
        const data = [...response.data.expenses];
        
        setExpenses(data);
      } catch (error) {
        setExpenses([]);

        
        if (error.response)
          if (error.response.status == 401) return navigate("/login");
          else return console.log(error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-[100%] pt-[10px] w-[100%] bg-white relative">
        <div className=" min-w-[90%] md:min-w-[70%] mx-[5vw] sm:min-w-[80%]  h-[80vh] bg-white shadow-2xl  rounded-4xl overflow-auto ">
          <Header />

          {expenses.map((expense, idx) => {
            const { expenseName, expenseDate, expenseAmount, expenseCategory } =
              expense;

            return (
              <ExpenseList
                key={`${idx}+"expenselist`} // Make sure to use a unique key for each item in a list
                expenseName={expenseName}
                expenseDate={expenseDate}
                expenseAmount={expenseAmount}
                expenseCategory={expenseCategory}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export const ViewExpenses = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/expenses");
  };

  return (
    <>
      <button
        onClick={handleNavigate}
        className=" px-7 py-3 bg-emerald-600 text-white text-xl rounded-4xl"
      >
        View Expenses
      </button>
    </>
  );
};

export default Expenses;
