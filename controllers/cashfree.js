const { v4: uuidv4 } = require("uuid");
const { User, Order } = require("../models");
const { createOrder: cashfreeCreateOrder, getPaymentStatus } = require("../services/cashfreeService");

const createOrder = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found." });
    }

    const generatedOrderId = uuidv4();
    const orderAmount = 53000;
    const orderCurrency = "INR";
    const customerId = user._id.toString();
    const customerPhone = user.phone || "0000000000";

    const sessionId = await cashfreeCreateOrder(
      generatedOrderId,
      orderAmount,
      orderCurrency,
      customerId,
      customerPhone
    );

    const orderDetails = new Order({
      generatedOrderId,
      orderType: "Premium Subscription",
      orderAmount,
      orderDate: new Date(),
      orderPaymentStatus: "initiated",
      userId: user._id,
    });

    await orderDetails.save();

    return res.status(200).json({
      success: true,
      message: "Order created successfully.",
      sessionId,
      generatedOrderId,
      orderId: orderDetails._id,
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: error.message,
    });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const generatedOrderId = req.params.id;

    if (!generatedOrderId) {
      return res.status(400).json({ success: false, message: "Order ID is required." });
    }

    const status = await getPaymentStatus(generatedOrderId);

    if (!status) {
      return res.status(404).json({ success: false, message: "Payment status not found." });
    }

    const order = await Order.findOne({ generatedOrderId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    if (order.orderPaymentStatus !== status) {
      order.orderPaymentStatus = status;
      await order.save();
    }

    return res.status(200).json({ success: true, paymentStatus: status });
  } catch (error) {
    console.error("Error in updatePaymentStatus:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {createOrder, updatePaymentStatus}