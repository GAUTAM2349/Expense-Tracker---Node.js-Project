import { useState } from "react";
import { AddExpenseButton } from "./AddExpense";

const Header = () => {
  const [selectType, setSelectType] = useState("date");

  return (
    <>
      <div className="flex bg-gradient-to-r  from-blue-400  via-blue-300  to-blue-700  py-5 px-3 sticky top-0">
        <div className="flex justify-center items-center mx-3">
          <span className=" hidden md:block">Select :</span>
          <input type={selectType} className="bg-white mx-3 p-2" />
        </div>

        <div className="flex justify-center items-center mx-3">
          <span className=" hidden md:block">Select By :</span>
          <select id="slect-by" className="hidden md:block" onChange={(e) => setSelectType(e.target.value)} className="bg-white mx-3 p-2" >
            <option value="date" >Date</option>
            <option value="month" >Month</option>
            <option value="year"  >Year</option>
          </select>
        </div>

        <div className="sm:flex sm:justify-center sm:items-center">
            <span className=" hidden md:block">Sort by : </span>
            <select id="sort-by" className="hidden md:block bg-white mx-3 p-2" >
            <option value="date">Amount</option>
            <option value="month">Date</option>
            <option value="year">Category</option>
          </select>
        </div>

        <div className="hidden sm:block">
        <AddExpenseButton />
        </div>
        
      </div>
    </>
  );
};

export default Header;
