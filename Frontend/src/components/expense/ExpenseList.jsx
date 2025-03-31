
const ExpenseList = ({ expenseName, expenseDate, expenseAmount, expenseCategory }) => {

    return (
        <>
            <div className="flex justify-between px-[0.5rem] shadow-2xs py-[0.7rem]">

                <div className="w-[30%] ">{expenseName}</div>
                <div className="w-[15%]">{expenseDate}</div>
                <div className="w-[20%]">{expenseCategory}</div>
                <div className="w-[35%]">{expenseAmount}</div>

                
            </div>
        </>
    )
    
}

export default ExpenseList;