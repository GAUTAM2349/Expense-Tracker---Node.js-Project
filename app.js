require("dotenv").config();

const { sequelize } = require("./config/database");

const express = require("express");
const {
  signupRouter,
  loginRouter,
  expenseRouter,
  cashfreeRouter,
  premiumRouter,
  passwordRouter,
  resetPasswordRouter
} = require("./routes");
const cors = require("cors");
const { logIncomingRequests } = require("./middlewares/requests");
const loggedinUsersOnly = require("./middlewares/loggedinUsersOnly");
const checkIfUser = require('./middlewares/checkIfUser');
const { validatePasswordResetToken } = require("./middlewares/validdatePasswordResetToken");
const app = express();

app.use(logIncomingRequests);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
console.log(PORT);

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/expense", loggedinUsersOnly, expenseRouter);
app.use("/cashfree", loggedinUsersOnly, cashfreeRouter);
app.use("/premium", loggedinUsersOnly, premiumRouter);
app.use("/reset-password",validatePasswordResetToken, resetPasswordRouter);
app.use("/password",checkIfUser, passwordRouter);



const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synced");
};

syncDB();

app.listen(PORT, () => {
  console.log("Server started..");
});
