import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";

const Login = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const input = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await api.post("/login", input);

      const { message, token } = response.data;

      if (token) localStorage.setItem("token", token);
      navigate("/");
      setError(null);
    } catch (error) {
      console.log("Error occurred:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      setMessage(null);
    }
  };

  const redirectToForgotPasswordPage = () => {
    return navigate("/forgot-password");
  };

  return (
    <>
      <div className="flex justify-center mt-[100px]  bg-">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center md-w[50%] xl:w-[40%] items-center w-[70%] shadow-2xl w-[95%] sm:w-[85%] md:w-[70%] h-[50vh] rounded-2xl"
        >
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

          <button
            type="submit"
            className=" bg-green-500 px-3 py-1 border rounded-2xl"
          >
            Login
          </button>

          {message && <div className="mt-4 text-green-500">{message}</div>}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <div className="mt-[40px] mb-[3px]">
            forgot password?{" "}
            <span
              onClick={redirectToForgotPasswordPage}
              className="text-blue-600 cursor-pointer"
            >
              Reset password{" "}
            </span>{" "}
            now
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
