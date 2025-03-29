const { sequelize } = require("./config/database");

const express = require("express");
const { signupRouter, loginRouter, expenseRouter } = require("./routes");
const cors = require("cors");
const { logIncomingRequests } = require("./middlewares/requests");
const usersOnly = require("./middlewares/auth");
const app = express();

app.use(logIncomingRequests);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 3002;

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/expense", usersOnly, expenseRouter);

const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synced");
};

syncDB();

app.listen(PORT, () => {
  console.log("Server started..");
});
