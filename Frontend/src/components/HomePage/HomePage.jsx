import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig.js";

const HomePage = () => {

    const navigate = useNavigate();
    const fake = api;
        
  return (
    <>
      <div className="flex flex-col gap-4 items-center mt-6">
        
        <button onClick={ ()=> navigate('/expenses')}  className="w-[90vw] text-white font-sans font-extrabold rounded-2xl hover:shadow-2xl transition active:scale-99 sm:w-[70vw] h-[15vh] bg-purple-600 flex items-center justify-center">
          {/* View Expenses */}
          <h2>View Expenses</h2>
        </button>
        <button onClick={ ()=> navigate('/add-expense')} className="w-[90vw] text-white font-sans font-extrabold rounded-2xl hover:shadow-2xl transition active:scale-99 sm:w-[70vw] h-[15vh] bg-cyan-500 flex items-center justify-center">
          {/* Add Expense */}
          <h2>Add Expense</h2>
        </button>
      </div>
    </>
  );
};

export default HomePage;
