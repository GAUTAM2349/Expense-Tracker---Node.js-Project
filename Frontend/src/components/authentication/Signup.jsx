import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";

const Signup = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target;
    const input = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    

    try {
      const response = await axios.post("http://localhost:3002/signup", input);
      
      setMessage(response.data.message);
      setError(null);
    } catch (error) {
      
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      setMessage(null);
    }
    
  };




useEffect( () => {

    const isUserAlreadyLoggedin = async() =>{
      try{
        const response = await api.get(`/login/check-already-loggedin`);
        console.log(response);
        if(response.data.success)
        navigate('/expenses');
        
      }catch(error){
        console.log('login please');
      }
      
    }
    isUserAlreadyLoggedin();
    
  },[]);
  
  
  const redirectToLoginPage = (e) => {
     navigate('/login');  
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center signup-body mt-[100px]">
        <form
          onSubmit={handleFormSubmit} 
          className="flex flex-col justify-center items-center w-[95%] sm:w-[85%] md:w-[70%] h-[55vh] shadow-2xl rounded-2xl"
        >
          <div className="p-5">
            <label htmlFor="name">Name : </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className=" bg-white outline-0 px-1 border border-black"
            />
          </div>

          <div className="p-5 ">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className=" bg-white outline-0  px-1 border border-black"
            />
          </div>

          <div className="p-5 ">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className=" bg-white outline-0 border border-black px-1"
            />
          </div>

          <button type="submit" className="cursor-pointer bg-green-500 px-3 py-1 border rounded-2xl">
            SignUp
          </button>

          <div>Already a user? <span onClick={redirectToLoginPage} className="text-blue-600 cursor-pointer">Login  </span>instead</div>

          {message && (
          <div className="mt-4 text-green-500">{message}</div>
        )}
        {error && (
          <div className="mt-4 text-red-500">{error}</div>
        )}
          
        </form>

        
      </div>
    </>
  );
};

export default Signup;
