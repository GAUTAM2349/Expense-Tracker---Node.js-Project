import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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
      console.log("done");
      setMessage(response.data.message);
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

  return (
    <>
      <div className="flex flex-col justify-center items-center signup-body w-[100vw] h-[100vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center items-center w-[70%] bg-gray-100 h-[50vh]"
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

          <button type="submit" className=" bg-green-500 px-3 py-1 border rounded-2xl">
            SignUp
          </button>

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
