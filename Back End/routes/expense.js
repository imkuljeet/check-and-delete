const express = require("express");

const router = express.Router();
const userauthentication = require("../middleware/auth");

const jwt = require("jsonwebtoken");

const Expense = require("../models/expenses");
const expenseController = require("../controllers/expense");

router.post("/addexpense", userauthentication.authenticate, expenseController.addexpense);

router.get(
  "/getexpenses",
  userauthentication.authenticate,
  expenseController.getexpenses
);

router.delete("/deleteexpense/:expenseid", expenseController.deleteexpense);

module.exports = router;
