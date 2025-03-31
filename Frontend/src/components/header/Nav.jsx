import Checkout from "./Checkout";
import PremiumShowDashboardButton from "./PremiumShowDashboardButton";

const Nav = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-700 via-blue-300 to-blue-400   flex items-center justify-between px-[5vw]  py-[1vh]  sticky top-0 z-10">
        <div alt="logo" className="logo h-[100px]  w-[100px] bg-cover "></div>

        <PremiumShowDashboardButton/>
        
        <Checkout />
      </div>
      <div className=" w-[100vw] md:h-[0.5vh]  bg-amber-400 opacity-100  sticky top-0 "></div>
    </>
  );
};

export default Nav;
