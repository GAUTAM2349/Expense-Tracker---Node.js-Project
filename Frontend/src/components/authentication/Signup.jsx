import axios from "axios";

const Signup = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target;
    const input = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    try {
      await axios.post("http://localhost:3002/signup", input);
      console.log("done");
    } catch (error) {
      console.log(error);
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
              className=" bg-white outline-0 border border-black"
            />
          </div>

          <div className="p-5 ">
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              id="email"
              name="email"
              required
              className=" bg-white outline-0 border border-black"
            />
          </div>

          <div className="p-5 ">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className=" bg-white outline-0 border border-black"
            />
          </div>

          <button className=" bg-green-500 px-3 py-1 border rounded-2xl">
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
