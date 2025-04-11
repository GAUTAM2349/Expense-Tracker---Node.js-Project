const { v4: uuidv4 } = require("uuid");
const { User, Order } = require("../models");
const { sequelize } = require("../config/database");
const { createOrder: cashfreeCreateOrder, getPaymentStatus } = require("../services/cashfreeService");

// === CREATE ORDER ===
const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found." });
    }

    const orderId = uuidv4();
    const orderAmount = 53000;
    const orderCurrency = "INR";
    const customerId = user.id.toString(); 
    const customerPhone = user.phone || "0000000000"; 

    const sessionId = await cashfreeCreateOrder(
      orderId,
      orderAmount,
      orderCurrency,
      customerId,
      customerPhone
    );

    const orderDetails = {
      generatedOrderId: orderId,
      orderType: "Premium Subscription",
      orderAmount,
      orderDate: new Date().toISOString(),
      orderPaymentStatus: "initiated",
    };

    await user.createOrder(orderDetails, { transaction });

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Order created successfully.",
      sessionId,
      orderId,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error in createOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: error.message,
    });
  }
};

// === UPDATE PAYMENT STATUS ===
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

    const order = await Order.findOne({ where: { generatedOrderId } });

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

module.exports = {
  createOrder,
  updatePaymentStatus,
};
