import { useState } from "react";


const ExpenseList = ({ expenseName, expenseDate, expenseAmount, expenseCategory, showDescription, setShowDescriptionIdx, idx }) => {

    

    const openDescription = () => {

            
            
            setShowDescriptionIdx(showDescription ? null : idx);
            
        
    }

    return (
        <>
        
            <div onClick={openDescription} className="flex justify-between px-[0.5rem] shadow-2xs py-[0.7rem] cursor-pointer">

                <div className=" min-w-[30%] px-[20px] sm:px-[5px] w-[20%] overflow-hidden">{expenseName}</div>
                <div className="min-w-[20%] px-[20px]  overflow-hidden">{expenseDate}</div>
                <div className="min-w-[20%] px-[20px] hidden sm:inline overflow-hidden">{expenseCategory}</div>
                <div className="min-w-[20%] px-[20px]  overflow-hidden">{expenseAmount}</div>
                
                
            </div>
            { showDescription && (
                <div className="description"> This is description <br/> This is second line </div>
            )}
        </>
    )
    
}

export default ExpenseList;