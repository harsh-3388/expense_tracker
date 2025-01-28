import React, { useState } from "react";
import { useTransactions } from "./context.api";
import "./index.css";

const ExpenseTracker = () => {
  const { transactions, addTransaction } = useTransactions();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("income");
  const [filter, setFilter] = useState("all");

  const handleAddTransaction = () => {
    addTransaction(amount, category, type);
    setAmount("");
    setCategory("");
  };

  const filteredTransactions = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter
  );

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="expense-tracker">
      <h2>Expense Tracker</h2>
      <div className="input-section">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>

      <h3>Summary</h3>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expense: ${totalExpense}</p>
      <p>Balance: ${totalIncome - totalExpense}</p>

      <h3>Transactions</h3>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <ul className="transaction-list">
        {filteredTransactions.map((t) => (
          <li key={t.id} className={t.type}>
            {t.category} - {t.type} - ${t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
