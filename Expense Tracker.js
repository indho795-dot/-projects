document.addEventListener("DOMContentLoaded", function () {
  // dom
  const form = document.getElementById("transactionForm");
  const transactionlist = document.getElementById("transaction-list");
  const notransaction = document.getElementById("no-transaction");
  const searchinput = document.getElementById("search");
  const cancelbtn = document.getElementById("cancel-button");

  // summary
  const summaryCards = document.querySelector(".summary-cards");
  const blance = document.querySelector(".blance");
  const expenses = document.querySelector(".expenses");
  const income = document.querySelector(".income");

  // form
  const transactionType = document.querySelector("#transaction-type");
  const description = document.getElementById("description");
  const transactionAmount = document.getElementById("amount");
  const categorySelect = document.querySelector("#category");
  const dateInput = document.getElementById("date");
  const isEdeitid = null;

  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  const categories = {
    income: ["Salary", "Business", "Investment", "Gift", "Other"],
    expense: [
      "Food",
      "Transport",
      "Utilities",
      "Entertainment",
      "Healthcare",
      "Other",
    ],
  };

  // init
  init();
  function init() {
    rendercategory();
    renderTransactions();
    transactionType.addEventListener("change", rendercategory);
    form.addEventListener("submit", hundleSubmit);
    searchinput.addEventListener("input", (e) =>
      renderTransactions(e.target.value)
    );
  }

  // functions
  function rendercategory() {
    const type = transactionType.value;
    categorySelect.innerHTML = categories[type]
      .map((cat) => `<option value="${cat}">${cat}</option>`)
      .join("");
  }

  function hundleSubmit(e) {
    e.preventDefault();

    // FIX 1: amount waa in number sax ah noqdaa
    const amountValue = parseFloat(transactionAmount.value);

    // FIX 2: haddii amount madhan yahay ama number ahayn → jooji
    if (isNaN(amountValue)) {
      alert("Fadlan geli amount sax ah");
      return;
    }
    const transaction = {
      id: isEdeitid || Date.now(),
      transactionType: transactionType.value,
      description: description.value,
      amount: amountValue, // FIX 3: halkan hadda mar walba number ayuu noqday
      category: categorySelect.value,
      date: dateInput.value,
    };
    if (isEdeitid) {
      const index = transactions.findIndex((t) => t.id === isEdeitid);
      if (index !== -1) {
        transactions[index] = transaction;
      }
    } else {
      transactions.push(transaction);
    }

    saveinterval();
    renderTransactions(); // FIX 4: si UI-ga isla markiiba u cusboonaado
    form.reset();
  }

  function saveinterval() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  function renderTransactions(searchTerm = "") {
    const filteredTransactions = searchTerm
      ? transactions.filter((t) =>
          t.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : transactions;

    if (filteredTransactions.length === 0) {
      notransaction.style.display = "block";
      transactionlist.innerHTML = "";
      return;
    }

    notransaction.style.display = "none";

    transactionlist.innerHTML = filteredTransactions
      .map(
        (t) =>
          `<tr>
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td class="${t.transactionType}">
              ${t.transactionType === "income" ? "+" : "-"}
              ${Number(t.amount || 0).toFixed(2)} 
              // <!-- FIX 5: haddii amount khaldan noqdo, error ma dhaco -->
            </td>
            <td> <button class="action-btn edit-btn" data-id="${
              t.id
            }">Edit</button></td>
            <td> <button class="action-btn delete-btn" data-id="${
              t.id
            }">Delete</button></td>
          </tr>
           
          
          
          `
      )
      .join("");

    // add event listeners for delete buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        editTransaction(parseInt(btn.dataset.id))
      );
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        deleteTransaction(parseInt(btn.dataset.id))
      );
    });
    // update summary
    const TotalIncome = transactions
      .filter((t) => t.transactionType === "income")
      .reduce((sum, t) => sum + (isNaN(t.amount) ? 0 : t.amount), 0);
    const TotalExpense = transactions
      .filter((t) => t.transactionType === "expense")
      .reduce((sum, t) => sum + (isNaN(t.amount) ? 0 : t.amount), 0);
    const totalBlance = TotalIncome - TotalExpense;
    income.textContent = `inta isoo gashay:$${TotalIncome.toFixed(2)}`;
    expenses.textContent = ` inta iga baxday:$${TotalExpense.toFixed(2)}`;
    blance.textContent = `inta isoo hadhay:$${totalBlance.toFixed(2)}`;
  }
  function editTransaction(id) {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
      transactionType.value = transaction.transactionType;
      description.value = transaction.description;
      transactionAmount.value = transaction.amount;
      categorySelect.value = transaction.category;
      dateInput.value = transaction.date;
      isEdeitid = transaction.id;
    }
  }

  function deleteTransaction(id) {
    const index = transactions.findIndex((t) => t.id === id);
    if (index !== -1) {
      transactions.splice(index, 1);
      saveinterval();
      renderTransactions();
    }
  }
});
