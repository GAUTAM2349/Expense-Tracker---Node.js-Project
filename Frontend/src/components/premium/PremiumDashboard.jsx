import { useState, useEffect } from "react";
import api from "../../../config/axiosConfig";
import PremiumExpenseList from "./PremiumExpenseList";

const PremiumDashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        console.log("came here");
        const response = await api.get("/premium/dashboard");

        const data = [...response.data];
        console.log(data);
        setExpenses(data);
      } catch (error) {
        setExpenses([]);

        console.log(error);
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
        <div className="min-w-[90%] md:min-w-[70%] mx-[5vw] sm:min-w-[80%] h-[80vh] bg-white shadow-2xl rounded-4xl overflow-auto ">
          
          {expenses.map((expense) => {
            const userName = expense.user.name;
            const totalExpense = expense.totalExpense;
            
            
            
            return (
              <PremiumExpenseList
                key={expense.userId }  // Using user.id as a key, assuming it’s unique
                userName={userName}
                
                totalExpense={totalExpense}
              />
            );


          })}
        </div>
      </div>
    </>
  );};

export default PremiumDashboard;
