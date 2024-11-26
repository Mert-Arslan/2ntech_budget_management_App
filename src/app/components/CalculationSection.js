"use client";

import React, { useState } from "react";
import { useBudget } from "../contexts/BudgetManagement";
import Chart from "./Chart";

const CalculationSection = () => {
  const { state } = useBudget();
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const handleCalculate = () => {
    const totalIncome = Object.values(state.income)
      .flat()
      .reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = Object.values(state.expenses)
      .flat()
      .reduce((sum, item) => sum + item.amount, 0);

    setIncomeTotal(totalIncome);
    setExpenseTotal(totalExpenses);
  };

  return (
    <div className="bg-white p-4 dark:bg-[#354310] rounded shadow mt-5">
      <h2 className="text-xl font-semibold mb-3">Hesaplama</h2>
      <button
        onClick={handleCalculate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Hesapla
      </button>
      <div className="mt-5">
        <Chart incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
      </div>
    </div>
  );
};

export default CalculationSection;
