import React, { useState, useEffect } from "react";
import './index.css'

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("income");

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (savedTransactions) setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!amount || !category) return;
    const newTransaction = { id: Date.now(), amount: parseFloat(amount), category, type };
    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setCategory("");
  };

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
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
      <h3>Summary</h3>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expense: ${totalExpense}</p>
      <p>Balance: ${totalIncome - totalExpense}</p>
      <h3>Transactions</h3>
      <ul className="transaction-list">
        {transactions.map((t) => (
          <li key={t.id} className={t.type}>
            {t.category} - {t.type} - ${t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
