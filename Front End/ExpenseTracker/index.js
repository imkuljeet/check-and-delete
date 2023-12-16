function addNewExpense(e) {
  e.preventDefault();

  const expenseDetails = {
    expenseamount: e.target.expenseAmount.value,
    description: e.target.description.value,
    category: e.target.category.value,
  };

  console.log(expenseDetails);
  const token  = localStorage.getItem('token');

  axios
    .post("http://localhost:3000/expense/addexpense", expenseDetails, { headers: {"Authorization" : token} })
    .then((response) => {
      addNewExpensetoUI(response.data.expense);
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", () => {
  const token  = localStorage.getItem('token');
  console.log("token",token);
  
  axios.get('http://localhost:3000/expense/getexpenses', { headers: {"Authorization" : token} })
  .then(response => {
          console.log(response.data.expenses);
          response.data.expenses.forEach(expense => {

              addNewExpensetoUI(expense);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

function addNewExpensetoUI(expense) {
  const parentElement = document.getElementById("listOfExpenses");
  const expenseElemId = `expense-${expense.id}`;
  parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.expenseamount} - ${expense.category} - ${expense.description}
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`;
}

function deleteExpense(event, expenseId) {
  console.log("Deleting expense with ID:", expenseId);

  axios
    .delete(`http://localhost:3000/expense/deleteexpense/${expenseId}`)
    .then(() => {
      removeExpensefromUI(expenseId);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeExpensefromUI(expenseid) {
  const expenseElemId = `expense-${expenseid}`;
  document.getElementById(expenseElemId).remove();
}
