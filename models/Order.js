const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Order = sequelize.define(
  "orders",
  {
    generatedOrderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    orderType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    orderAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    orderDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    orderPaymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { Order };
