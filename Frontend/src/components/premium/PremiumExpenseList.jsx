

const PremiumExpenseList = ({ userName, totalExpense }) => {

    return (

        <>
        <div className="flex justify-between px-[0.5rem] shadow-2xs py-[0.7rem]">
            <div className=" min-w-[30%] px-[20px] sm:px-[5px] w-[20%] overflow-hidden" >{userName}</div>
            
            <div className=" min-w-[30%] px-[20px] sm:px-[5px] w-[20%] overflow-hidden" >{totalExpense}</div>
        </div>
        </>
        
    )
    
}

export default PremiumExpenseList;