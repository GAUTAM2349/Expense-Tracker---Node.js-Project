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
} = require("./routes");
const cors = require("cors");
const { logIncomingRequests } = require("./middlewares/requests");
const usersOnly = require("./middlewares/usersOnly");
const app = express();

app.use(logIncomingRequests);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
console.log(PORT);

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/expense", usersOnly, expenseRouter);
app.use("/cashfree", usersOnly, cashfreeRouter);
app.use("/premium", usersOnly, premiumRouter);
app.use("/password", passwordRouter);

const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synced");
};

syncDB();

app.listen(PORT, () => {
  console.log("Server started..");
});
