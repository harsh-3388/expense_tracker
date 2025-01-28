import React from "react";
import ExpenseTracker from "./exp.tracker";
import { TransactionProvider } from "./context.api";

function App() {
  return (
    <TransactionProvider>
      <ExpenseTracker />
    </TransactionProvider>
  );
}

export default App;
