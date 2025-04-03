import { useState } from "react";
import api from "../../../config/axiosConfig";

const ForgotPassword = () => {
  const [emailSentMessage, setEmailSentMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    try {
      const response = await api.post("password/forgot-password", { email });
      setErrorMessage(null);
      setEmailSentMessage(response.data.message);
    } catch (error) {
        console.log(error)
      setEmailSentMessage(null);
      
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-[100px]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center md-w[50%] xl:w-[40%] items-center w-[70%] shadow-2xl h-[50vh] rounded-2xl"
        >
          <div className="p-5">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white outline-0 px-1 border border-black"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 px-3 py-1 border rounded-2xl"
          >
            Send
          </button>

          {emailSentMessage && (
            <div className="text-green-600 my-[40px]">{emailSentMessage}</div>
          )}
          {errorMessage && (
            <div className="text-red-600 my-[40px]">{errorMessage}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
