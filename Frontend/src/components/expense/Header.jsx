import { useState } from "react";
import { AddExpenseButton } from "./AddExpense";

const Header = () => {
  const [selectType, setSelectType] = useState("date");

  return (
    <>
      <div className="flex bg-indigo-700  h-16 py-5 px-3 sticky top-0">
        <div className="mx-3">
          Select :
          <input type={selectType} className="bg-white mx-3 p-2" />
        </div>

        <div className="mx-3">
          Select By :
          <select id="slect-by" onChange={(e) => setSelectType(e.target.value)} className="bg-white mx-3 p-2" >
            <option value="date" >Date</option>
            <option value="month" >Month</option>
            <option value="year"  >Year</option>
          </select>
        </div>
        <div>
            Sort by : 
            <select id="sort-by" className="bg-white mx-3 p-2" >
            <option value="date">Date</option>
            <option value="month">Amount</option>
            <option value="year">Category</option>
          </select>
        </div>

        <AddExpenseButton/>
        
      </div>
    </>
  );
};

export default Header;
