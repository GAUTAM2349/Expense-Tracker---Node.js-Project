import { AddExpenseButton } from "./AddExpense";

const Header = ({ setFilterType, downloadCSV, setItemsPerPage }) => {
  const handleBlur = (e) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value)) {
      localStorage.setItem("itemsPerPage", value);
      setItemsPerPage(value);
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-400 via-blue-300 to-blue-700 py-5 px-3 sticky top-0">
      
      <div className="flex justify-center items-center mx-3">
        <span className="hidden md:block">Filter by:</span>
        
        <select
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-white mx-3 p-2 w-[60px] sm:w-[100px]"
        >
          <option value="all">All</option>
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
          <span className="hidden md:block">Download</span>
          <span className="md:hidden">save</span>

        </button>
      </div>

      <div className="">
        <AddExpenseButton />
      </div>

      <div className="mx-2.5">
        <span className="hidden md:inline-block">Per-page :</span>
        <input
          type="number"
          placeholder="items"
          min="1"
          onBlur={(e) => {
            const value = parseInt(e.target.value);
            if (value < 1 || isNaN(value)) {
              e.target.value = 10; // or setItemsPerPage(1)
            }
            handleBlur(e);
          }}
          className=" p-2 border-2 mt-[10px]  border-gray-300 rounded-md h-[30px] w-[60px] md:w-[100px]  focus:outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default Header;
