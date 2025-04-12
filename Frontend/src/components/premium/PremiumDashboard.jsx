import { useState, useEffect } from "react";
import api from "../../../config/axiosConfig";
import PremiumExpenseList from "./PremiumExpenseList";
import { useNavigate } from "react-router-dom";

const PremiumDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        

        
        const response = await api.get("/premium/dashboard");
        // console.log(resposnse);
        const data = [...response.data];
        
        setUsers(data);
      } catch (error) {
        setUsers([]);

        
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
          {users.map((user) => {
            const userName = user.name;
            const totalExpense = user.totalExpense;

            return (
              <PremiumExpenseList
                key={user.id} // Using user.id as a key, assuming it’s unique
                userName={userName}
                totalExpense={totalExpense}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PremiumDashboard;
