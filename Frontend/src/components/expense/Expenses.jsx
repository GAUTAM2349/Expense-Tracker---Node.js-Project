import Header from "./Header";
import { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [showDescriptionIdx, setShowDescriptionIdx] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  let perPage = 10;
  if (localStorage.getItem("itemsPerPage")) {
    perPage = parseInt(localStorage.getItem("itemsPerPage"));
  }

  const [itemsPerPage, setItemsPerPage] = useState(perPage);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get(`/expense/get-expenses`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            filterType: filterType,
          },
        });

        const { totalExpenses, expenses } = response.data;
        const numberOfPages = Math.ceil(totalExpenses / itemsPerPage);
        setTotalPages(numberOfPages);
        setExpenses(expenses);
      } catch (error) {
        setExpenses([]);
        if (error.response) {
          if (error.response.status === 401) return navigate("/login");
          else return console.log(error);
        }
      }
    };

    fetchExpenses();
  }, [currentPage, filterType, itemsPerPage]);


  const removeExpenseFromList = (id) => {
    setExpenses(prev => prev.filter(exp => exp._id !== id));
  };
  
  
  const downloadCSV = async () => {
    try {
      const response = await api.get("expense/download-expense");
      console.log(response);

      if (response.status === 200) {
        let a = document.createElement("a");
        a.href = response.data.fileURL;
        a.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100%] pt-[10px] w-[100%] bg-white relative">
      <div className="w-[98%] md:w-[70%] sm:mx-[5vw] sm:min-w-[80%] h-[80vh] bg-white shadow-2xl rounded-4xl overflow-scroll hide-scrollbar">
        <Header
          setFilterType={setFilterType}
          downloadCSV={downloadCSV}
          setItemsPerPage={setItemsPerPage}
        />

        {expenses.map((expense, idx) => {
          const { expenseName, expenseDate, expenseAmount, expenseCategory, expenseType, _id } =
            expense;

          return (
            <ExpenseList
              key={`${idx}+"expenselist"`}
              expenseName={expenseName}
              expenseDate={expenseDate}
              expenseAmount={expenseAmount}
              expenseCategory={expenseCategory}
              expenseType = {expenseType}
              showDescription={idx === showDescriptionIdx}
              setShowDescriptionIdx={(index) => setShowDescriptionIdx(index)}
              idx={idx}
              id = {_id}
              onDelete={removeExpenseFromList}
              setExpenses = {setExpenses}
            />
          );
        })}
      </div>

      <div className="flex absolute bottom-0">



        <div
          onClick={() => setCurrentPage(1)}
          className=" flex justify-center items-center rounded-4xl w-[30px] h-[30px]  p-[5px] mr-[5px] bg-blue-500 text-white cursor-pointer"
        >
          1
        </div>




        <div
          className=" flex justify-center items-center rounded-4xl w-[30px] h-[30px] p-[5px] mr-[5px] bg-blue-500 text-white cursor-pointer"
          onClick={() => {
            currentPage > 1
              ? setCurrentPage(currentPage - 1)
              : setCurrentPage(1);
          }}
        >
          {"<"}
        </div>




        <div className="ml-[10px] mr-[10px] w-[30px] h-[30px] bg-green-500 flex justify-center items-center rounded-4xl text-white">
          {currentPage == 0 ? 1 : currentPage}
        </div>




        <div
          className=" flex justify-center items-center rounded-4xl w-[30px] h-[30px] p-[5px] mr-[5px] bg-blue-500 text-white cursor-pointer"
          onClick={() => {
            currentPage < totalPages
              ? setCurrentPage(currentPage + 1)
              : setCurrentPage(totalPages);
          }}
        >
          {">"}
        </div>





        <div
          onClick={() => setCurrentPage(totalPages)}
          className=" flex justify-center items-center rounded-4xl w-[30px] h-[30px] p-[5px] mr-[5px] bg-blue-500 text-white cursor-pointer"
        >
          {totalPages == 0 ? 1 : totalPages}
        </div>




      </div>
    </div>
  );
};

export const ViewExpenses = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/expenses");
  };

  return (
    <button
      onClick={handleNavigate}
      className="px-7 py-3 bg-emerald-600 text-white text-xl rounded-4xl"
    >
      View Expenses
    </button>
  );
};

export default Expenses;
