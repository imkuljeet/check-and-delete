const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const User = require("./models/users");
const Expenses = require("./models/expenses");
const userController = require("./controllers/user");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());

app.use(bodyParser.json());

User.hasMany(Expenses);
Expenses.belongsTo(User);

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
