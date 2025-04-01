import { useNavigate } from "react-router-dom";



const PremiumShowDashboardButton = () => {

    const navigate = useNavigate();
    
  const openDashboard = () => {
    navigate('/premium')
  };

  return (
    <div className="row">
      <button
        type="submit"
        className=" flex justify-center items-center h-[5vh] px-[1vw] py-[2vh] bg-gradient-to-r from-amber-400 to-amber-100 rounded-2xl  "
        id="renderBtn"
        onClick={openDashboard}
      >
        Dashboard
      </button>
    </div>
  );
};

export default PremiumShowDashboardButton;
