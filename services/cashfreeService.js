const { Cashfree } = require("cashfree-pg");



exports.createOrder = async (
  orderId,
  orderAmount,
  orderCurrency,
  customerId,
  customerPhone
) => {
  try {
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const formattedExpiryDate = expiryDate.toISOString();

    Cashfree.XClientId = "TEST430329ae80e0f32e41a393d78b923034"; // get through env variable
    Cashfree.XClientSecret = "TESTaf195616268bd6202eeb3bf8dc458956e7192a85"; //get through env variable
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

    const request = {
      order_amount: orderAmount,
      order_currency: orderCurrency,
      order_id: orderId, //custom and unique
      customer_details: {
        customer_id: customerId, // custom and maaped to actual user
        customer_phone: customerPhone, // user phone number
      },
      order_meta: {
        return_url: `http://localhost:3002/cashfree/payment-status/${orderId}`,
        payment_methods: "ccc, upi, nb",
        
      },
      order_expiry_time: formattedExpiryDate,
    };

    

    const response = await Cashfree.PGCreateOrder("2025-01-01",request);
    const paymentSessionId = response.data.payment_session_id;

    return paymentSessionId;


  } catch (error) {
    console.log("Error creating order : ",error);
  }
};







exports.getPaymentStatus = async ( orderId ) => { 

    try{

        let orderStatus;
        const response = await Cashfree.PGOrderFetchPayments("2025-01-01", orderId);
        console.log(response.data);
        const responseData = response.data;

        if(responseData.filter( (transaction) => transaction.payment_status === "SUCCESS").length > 0){
            orderStatus = "Success"
        }

        else if(responseData.filter( (transaction) => transaction.payment_status === "PENDING").length > 0){
            orderStatus = "Pending"
        }

        else{
            orderStatus = "Failure"
        }

        return orderStatus;


    }catch(error){
        console.log(error)
        throw new Error("Failed to fetch payment status");
    }
    
}


