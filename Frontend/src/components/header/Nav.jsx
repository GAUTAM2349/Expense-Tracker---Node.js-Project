import { load } from "@cashfreepayments/cashfree-js";
import Checkout from "./Checkout";

const Nav = () => {
  return (
    <>
      <div className="bg-blue-800  flex justify-between px-[1vw] py-[1vh] sticky">
        <img alt="logo" src="#" />

        <Checkout />
      </div>
    </>
  );
};

export default Nav;
