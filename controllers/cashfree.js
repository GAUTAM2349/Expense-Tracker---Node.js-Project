const {
  createOrder: cashfreeCreateOrder,
  getPaymentStatus,
} = require("../services/cashfreeService");
const { v4: uuidv4 } = require("uuid");
const { User, Order } = require("../models");
const { sequelize } = require("../config/database");

const createOrder = async (req, res) => {
  try {
    const orderId = uuidv4();
    const orderAmount = 15000;
    const orderCurrency = "INR";
    const customerId = "123";
    console.log("userid  : " + customerId);
    const customerPhone = "9911223344";

    console.log("came inside create router controller");
    const sessionId = await cashfreeCreateOrder(
      orderId,
      orderAmount,
      orderCurrency,
      customerId,
      customerPhone
    );

    console.log("Successfull, sending sessionId" + sessionId);

    /* creating order */

    const orderDetails = {
      generatedOrderId: orderId,
      orderType: "Premium subscription",
      orderAmount: orderAmount,
      orderDate: new Date().toISOString(),
      orderPaymentStatus: "initiated",
    };

    const order = await req.user.createOrder(orderDetails);

    res.status(200).json({
      success: true,
      message: "success fetching session id",
      sessionId: sessionId,
      orderId: orderId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const status = await getPaymentStatus(req.params.id);

    if (status) {
      const order = await Order.findOne({
        where: { generatedOrderId: req.params.id },
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.orderPaymentStatus) {
        order.orderPaymentStatus = status;
        await order.save();
      }

      console.log("response sent from here");
      return res.status(200).json({ paymentStatus: status });
    } else {
      return res.status(404).json({ message: "Payment status not found" });
    }
  } catch (error) {
    console.log("Error in updating payment status:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, updatePaymentStatus };
