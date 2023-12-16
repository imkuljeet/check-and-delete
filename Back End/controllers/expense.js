const Expense = require("../models/expenses");
const jwt = require('jsonwebtoken');

exports.addexpense = (req, res) => {
  const { expenseamount, description, category } = req.body;

  if (expenseamount == undefined || expenseamount.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Parameters missing" });
  }

  Expense.create({ expenseamount, description, category, userId: req.user.id })
    .then((expense) => {
      return res.status(201).json({ expense, success: true });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};

exports.getexpenses = (req, res)=> {
    
  Expense.findAll({ where : { userId: req.user.id}}).then(expenses => {
      return res.status(200).json({expenses, success: true})
  })
  .catch(err => {
      console.log(err)
      return res.status(500).json({ error: err, success: false})
  })
}

exports.deleteexpense = (req, res) => {
  const expenseid = req.params.expenseid;

  if (expenseid == undefined || expenseid.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid expense ID" });
  }

  Expense.destroy({ where: { id: expenseid } })
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: "Deleted Successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete expense" });
    });
};
