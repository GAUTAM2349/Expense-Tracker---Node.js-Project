import { useEffect, useState } from "react";
import Checkout from "./Checkout";
import PremiumShowDashboardButton from "./PremiumShowDashboardButton";
import { useNavigate } from 'react-router-dom';
import api from "../../../config/axiosConfig";

const Nav = () => {

  const [isPremiumUser,setIsPremiumUser] = useState(false);
  

  useEffect( () => {

    const checkPremiumUser = async () => {

      try{
        const response = await api.get('/premium/is-premium-user');
        console.log(response);
        if(response.status == 200){
          console.log("entered");
          setIsPremiumUser(true);
        }
        
      }catch(error){
        console.log(error);
      }
    }

    checkPremiumUser();
    
  },[])
  
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');
    window.location.reload();
    
    
  }
  
  return (
    <>
      <div className="bg-gradient-to-r from-blue-700 via-blue-300 to-blue-400   flex items-center justify-between px-[5vw]  py-[1vh]  sticky top-0 z-10">
        <div alt="logo" onClick={() => { navigate('/expenses')}} className="logo h-[100px]  w-[100px] bg-cover "></div>

        <div className="flex  gap-[10px]">
          { isPremiumUser && <PremiumShowDashboardButton />}

          { !isPremiumUser && <Checkout setIsPremiumUser={() => setIsPremiumUser(true)} />}
          { isPremiumUser && <span className=" md:text-2xl sm:mr-10 sm:font-medium  text-yellow-300  px-[1vw] py-[1vh] md:font-bold">Premium </span>}
        </div>
        <div onClick={()=>handleLogout()} className=" sm:absolute right-0 mr-[3px] sm:mr-[10px] text-white bg-green-700 rounded-2xl p-2"><button>logout</button></div>
      </div>
      <div className=" w-[100vw] md:h-[0.5vh]  bg-amber-400 opacity-100  sticky top-0 "></div>
      
    </>
  );
};

export default Nav;
