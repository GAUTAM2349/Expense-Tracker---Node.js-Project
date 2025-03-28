
const ExpenseList = ({ expenseName, expenseDate, expenseAmount, expenseCategory }) => {

    return (
        <>
            <div className="flex">

                <div>{expenseName}</div>
                <div>{expenseDate}</div>
                <div>{expenseCategory}</div>
                <div>{expenseAmount}</div>

                
            </div>
        </>
    )
    
}

export default ExpenseList;