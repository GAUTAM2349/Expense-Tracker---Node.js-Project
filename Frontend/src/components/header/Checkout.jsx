import { load } from "@cashfreepayments/cashfree-js";
import api from "../../../config/axiosConfig";

const Checkout = () => {
  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();

  const doPayment = async () => {
    try {
      const response = await api.post("/cashfree/create-order");
      
      const { sessionId: paymentSessionId, orderId } = response.data;

      
      let checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      };
      const result = await cashfree.checkout(checkoutOptions);

      if (result.error) {
        
        const response = await api.get(`/cashfree/payment-status/${orderId}`);
        
        const paymentStatus = response.data.paymentStatus;
        
      }

      if (result.redirect) {
        console.log("came to redirect");
      }

      if (result.paymentDetails) {
        console.log("Payment is completed, you will see the status..");
        

        const response = await api.get(`/cashfree/payment-status/${orderId}`);
        
        const paymentStatus = response.data.paymentStatus;
        console.log("payment status is "+ paymentStatus);
      }
    } catch (error) {
      console.log(
        "Some error in geting payment information : " + error.message
      );
    }
  };

  return (
    <div className="row">
      <button
        type="submit"
        className=" flex justify-center items-center h-[5vh] px-[1vw] py-[2vh] bg-gradient-to-r from-amber-400 to-amber-100 rounded-2xl  "
        id="renderBtn"
        onClick={doPayment}
      >
        Buy premium
      </button>
    </div>
  );
};
export default Checkout;
