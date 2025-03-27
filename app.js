const { sequelize } = require("./config/database");

const express = require("express");
const { router : signupRouter } = require("./routes/signup");
const {router : loginRouter }  = require('./routes/login');
const { Signup } = require('./models');
const cors = require('cors');
const { logIncomingRequests } = require("./middlewares/requests");
const app = express();

app.use(logIncomingRequests);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 3002;

app.use("/signup", signupRouter);
app.use("/login", loginRouter);

const syncDB = async() => {
    await sequelize.sync( { alter: true } );
    console.log("Database synced");
}

syncDB();

app.listen(PORT, () => {
  console.log("Server started..");
});
