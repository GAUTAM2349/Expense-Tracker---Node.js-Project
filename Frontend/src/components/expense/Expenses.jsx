
import Header from "./Header";
import { useEffect, useState } from "react";
import ExpenseList from "./ExpenseList";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filterType, setFilterType] = useState("all"); 
  const [showDescriptionIdx, setShowDescriptionIdx] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get("/expense/get-expenses");
        const data = [...response.data.expenses];
        setExpenses(data);
        setFilteredExpenses(data); 
      } catch (error) {
        setExpenses([]);
        if (error.response) {
          if (error.response.status === 401) return navigate("/login");
          else return console.log(error);
        }
      }
    };

    fetchExpenses();
  }, []);

  
  useEffect(() => {
    const filterExpenses = () => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); 
      startOfWeek.setHours(0, 0, 0, 0);
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); 

      switch (filterType) {
        case "current_date":
          setFilteredExpenses(
            expenses.filter((expense) => {
              const expenseDate = new Date(expense.expenseDate);
              return (
                expenseDate.getDate() === today.getDate() &&
                expenseDate.getMonth() === today.getMonth() &&
                expenseDate.getFullYear() === today.getFullYear()
              );
            })
          );
          break;

          case "this_week":
            setFilteredExpenses(
              expenses.filter((expense) => {
                const expenseDate = new Date(expense.expenseDate);
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7); 
                
                return expenseDate >= sevenDaysAgo && expenseDate <= today;
              })
            );
            break;
        case "this_month":
          setFilteredExpenses(
            expenses.filter((expense) => {
              const expenseDate = new Date(expense.expenseDate);
              return (
                expenseDate.getMonth() === today.getMonth() &&
                expenseDate.getFullYear() === today.getFullYear()
              );
            })
          );
          break;

        case "all":
          setFilteredExpenses(expenses); 
          break;

        default:
          setFilteredExpenses(expenses); 
          break;
      }
    };

    filterExpenses();
  }, [filterType, expenses]); 

  
  const convertToCSV = (data) => {
    const header = ["Expense Name", "Date", "Amount", "Category"];
    const rows = data.map((expense) => [
      expense.expenseName,
      expense.expenseDate,
      expense.expenseAmount,
      expense.expenseCategory,
    ]);

    
    const csvContent = [
      header.join(","), 
      ...rows.map((row) => row.join(",")), 
    ]
      .map((row) => row.replace(/(?:\r\n|\n|\r)/g, "")) 
      .join("\n"); 

    return csvContent;
  };

  
  const downloadCSV = () => {
    const csvContent = convertToCSV(filteredExpenses);

    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "expenses.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100%] pt-[10px] w-[100%] bg-white relative">
      <div className="min-w-[90%] md:min-w-[70%] mx-[5vw] sm:min-w-[80%] h-[80vh] bg-white shadow-2xl rounded-4xl overflow-auto">
        <Header setFilterType={setFilterType} downloadCSV={downloadCSV} />

        {filteredExpenses.map((expense, idx) => {
          const { expenseName, expenseDate, expenseAmount, expenseCategory } =
            expense;

          return (
            <ExpenseList
              key={`${idx}+"expenselist"`}
              expenseName={expenseName}
              expenseDate={expenseDate}
              expenseAmount={expenseAmount}
              expenseCategory={expenseCategory}
              showDescription={idx === showDescriptionIdx}
              setShowDescriptionIdx={(index) => setShowDescriptionIdx(index)}
              idx={idx}
            />
          );
        })}
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

