import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import { useNavigate } from "react-router-dom";


const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    console.log("worked");

    const fetchExpenses = async () => {
      try {
        console.log("came");
        const fetchedData = await axios.get(
          "http://localhost:3010/expense/get-expenses"
        );

        const data = [...fetchedData.data];
        console.log(data);
        setExpenses(data);
      } catch (error) {
        setExpenses([]);
        console.log("\n\n" + error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] w-[100%] bg-white">
        <div className=" w-[70%] h-[80%] bg-white shadow-2xl rounded-4xl">
          <Header />

          {expenses.map((expense, idx) => {
            const { expenseName, expenseDate, expenseAmount, expenseCategory } =
              expense;

            return (
              <ExpenseList
                key={idx} // Make sure to use a unique key for each item in a list
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
  const handleNavigate = () =>{
    navigate('/expenses');
  }

  return (
    <>
      <button onClick={handleNavigate} className=" px-7 py-3 bg-emerald-600 text-white text-xl rounded-4xl">View Expenses</button>
    </>
  )
  
}

export default Expenses;
