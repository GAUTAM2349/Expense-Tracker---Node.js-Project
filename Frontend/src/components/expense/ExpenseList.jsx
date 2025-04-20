import { useState } from "react";
import api from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";


const ExpenseList = ({
  expenseName,
  expenseDate,
  expenseAmount,
  expenseCategory,
  expenseType,
  showDescription,
  setShowDescriptionIdx,
  idx,
  id,
  onDelete
}) => {

    const navigate = useNavigate();
    
  const openDescription = () => {
    setShowDescriptionIdx(showDescription ? null : idx);
  };

  

  const deleteExpense = async (id) => {

    try {
        const response = await api.delete(`/expense/delete-expense/${id}`);
        console.log(response);
        onDelete(id); // update state in parent
      } catch (error) {
        console.error(error);
        window.alert("Sorry can't delete expense \n" + error.message);
      }
    
  }

  return (
    <>
      <div
        className={`flex justify-between font-bold px-[0.5rem] ${ expenseType == 'debit' ? "text-red-500" : "text-green-500" } shadow-2xs py-[0.7rem] cursor-pointer`}
      >
        <div onClick={openDescription} className=" min-w-[30%] px-[20px] sm:px-[5px] w-[20%] overflow-hidden">
          {expenseName}
        </div>
        <div onClick={openDescription} className="min-w-[20%] px-[20px]  overflow-hidden">
          {expenseDate}
        </div>
        <div onClick={openDescription} className="min-w-[20%] px-[20px] hidden sm:inline overflow-hidden">
          {expenseCategory}
        </div>
        <div  onClick={openDescription}className="min-w-[20%] px-[20px]  overflow-hidden">
          {expenseAmount}
        </div>

        <div onClick={() => navigate(`/update-expense/${id}`)}  className=" edit-btn w-[20px] h-[20px]"></div>
        <div onClick={() => deleteExpense(id)} className="delete-btn w-[20px] h-[20px]"></div>


      </div>
      {showDescription && (
        <div className="description">
          {" "}
          This is description 
        </div>
      )}
    </>
  );
};

export default ExpenseList;
