import { AddExpenseButton } from "./AddExpense";

const Header = ({ setFilterType, downloadCSV, setItemsPerPage }) => {

  const handleBlur = (e) => {
    const value = parseInt(e.target.value);
    
    if (!isNaN(value)) {
      localStorage.setItem('itemsPerPage', value)
      setItemsPerPage(value);
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-400 via-blue-300 to-blue-700 py-5 px-3 sticky top-0">
      <div className="flex justify-center items-center mx-3">
        <span className="hidden md:block">Filter by:</span>
        <select
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-white mx-3 p-2"
        >
          <option value="all">All Expenses</option>
          <option value="current_date">Today</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
      </div>

      <div className="flex justify-center items-center mx-3">
        <button
          onClick={downloadCSV}
          className="px-7 py-3 bg-emerald-600 text-white text-xl rounded-4xl"
        >
          Download <span className="hidden md:inline">CSV</span>
        </button>
      </div>

      <div className="hidden sm:block">
        <AddExpenseButton />
      </div>

      <div>
        PerPage: 
        <input
  type="number"
  onBlur={handleBlur} // trigger the setItemsPerPage when focus is removed
  className="ml-2 p-2 border-2 border-gray-300 rounded-md focus:outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>
      </div>
    </div>
  );
};

export default Header;
