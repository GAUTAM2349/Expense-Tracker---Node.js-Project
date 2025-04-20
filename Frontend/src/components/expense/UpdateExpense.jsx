// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ViewExpenses } from "./Expenses";
// import api from "../../../config/axiosConfig";
// import { useNavigate, useParams } from "react-router-dom";



// const UpdateExpense = () => {
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const updateExpense = (event) => {
//     event.preventDefault();

//     const expenseName = event.target.elements["expense-name"].value;
//     const expenseDate = event.target.elements["expense-date"].value;
//     const expenseAmount = event.target.elements["expense-amount"].value;
//     const expenseCategory = event.target.elements["expense-category"].value;
    
//     sendUpdateExpenseRequest({
//       expenseName,
//       expenseDate,
//       expenseAmount,
//       expenseCategory,
//     });
//   };

//   async function sendUpdateExpenseRequest(data) {
//     try {
      
//       const response = await api.put(`/expense/update-expense/${id}`, data);
//       navigate('/');
      
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data)
//         setError("some EERROOOOORR " + error.response.data.message);
//       else setError("some unexpected error!");
//     }
//   }

//   return (
//     <>
//       <div className="flex justify-center items-center h-[100%] w-[100%] bg-white">
//         <form
//           onSubmit={updateExpense}
//           className="flex flex-col add-expense-cover rounded-2xl bg-white shadow-2xl justify-center items-center  mt-15 h-[70vh] w-[95%] sm:w-[85%] md:w-[70%]"
//         >
//           <div className="my-5 w-[50%]">
//             Name of expense :
//             <input
//               type="text"
//               required
//               name="expense-name"
//               className=" bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-300 "
//             />
//           </div>

//           <div className="my-5 w-[50%]">
//             Amount :
//             <input
//               type="number"
//               required
//               name="expense-amount"
//               className="bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
//             />
//           </div>

//           <div className="my-5 w-[50%]">
//             Date :
//             <input
//               type="date"
//               required
//               name="expense-date"
//               className="bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
//             />
//           </div>

//           <div className="my-5 w-[50%]">
//             Category :
//             <select
//               id="sort-by"
//               name="expense-category"
//               className=" bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
//             >
//               <option value="Food">Food</option>
//               <option value="Grocery">Grocery</option>
//               <option value="Bills">Bills</option>
//               <option value="Party">Party</option>
//               <option value="Extra">Extra</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className=" px-7 py-3 bg-indigo-500 text-white text-xl rounded-4xl mb-[10px]"
//           >
//             Update expense
//           </button>

//           {message && <div className= "mb-[5px] text-green-500">{message}</div>}
//           {error && <div>{error}</div>}

//           <ViewExpenses />
//         </form>
//       </div>
//     </>
//   );
// };

// export const AddExpenseButton = () => {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate("/add-expense");
//   };

//   return (
//     <>
//       <button
//         onClick={handleNavigate}
//         className=" px-7 py-3 bg-emerald-600 text-white text-xl rounded-4xl"
//       >
//         Add <span className="hidden xl:block ">Expense</span>
//       </button>
//     </>
//   );
// };

// export default UpdateExpense;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ViewExpenses } from "./Expenses";
import api from "../../../config/axiosConfig";

const UpdateExpense = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    expenseName: "",
    expenseDate: "",
    expenseAmount: "",
    expenseCategory: "Food",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await api.get(`/expense/get-expense/${id}`);
        const { expenseName, expenseDate, expenseAmount, expenseCategory } = response.data.expense;

        setFormValues({
          expenseName,
          expenseDate: expenseDate.split("T")[0], // just the date part
          expenseAmount,
          expenseCategory,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to fetch expense data.");
      }
    };

    fetchExpense();
  }, []);

  const updateExpense = (event) => {
    event.preventDefault();

    const expenseName = event.target.elements["expense-name"].value;
    const expenseDate = event.target.elements["expense-date"].value;
    const expenseAmount = event.target.elements["expense-amount"].value;
    const expenseCategory = event.target.elements["expense-category"].value;

    sendUpdateExpenseRequest({
      expenseName,
      expenseDate,
      expenseAmount,
      expenseCategory,
    });
  };

  async function sendUpdateExpenseRequest(data) {
    try {
      const response = await api.put(`/expense/update-expense/${id}`, data);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response?.data)
        setError("error.response.data.message");
      else setError("some unexpected error!");
    }
  }

  return (
    <div className="flex justify-center items-center h-[100%] w-[100%] bg-white">
      <form
        onSubmit={updateExpense}
        className="flex flex-col add-expense-cover rounded-2xl bg-white shadow-2xl justify-center items-center mt-15 h-[70vh] w-[95%] sm:w-[85%] md:w-[70%]"
      >
        <div className="my-5 w-[50%]">
          Name of expense:
          <input
            type="text"
            required
            name="expense-name"
            defaultValue={formValues.expenseName}
            className="bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <div className="my-5 w-[50%]">
          Amount:
          <input
            type="number"
            required
            min="1"
            name="expense-amount"
            defaultValue={formValues.expenseAmount}
            className="bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
          />
        </div>

        <div className="my-5 w-[50%]">
          Date:
          <input
            type="date"
            required
            name="expense-date"
            defaultValue={formValues.expenseDate}
            className="bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
          />
        </div>

        <div className="my-5 w-[50%]">
          Category:
          <select
            id="sort-by"
            name="expense-category"
            defaultValue={formValues.expenseCategory}
            className="bg-white px-2 py-2 mx-2 border border-indigo-500 rounded-2xl outline-none"
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
          className="px-7 py-3 bg-indigo-500 text-white text-xl rounded-4xl mb-[10px]"
        >
          Update expense
        </button>

        {message && <div className="mb-[5px] text-green-500">{message}</div>}
        {error && <div>{error}</div>}

        <ViewExpenses />
      </form>
    </div>
  );
};

export default UpdateExpense;
