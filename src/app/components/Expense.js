"use client";

import React, { useState } from "react";
import { useBudget } from "../contexts/BudgetManagement";
import dayjs from "dayjs";

const Expense = () => {
  const { state, dispatch } = useBudget();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD")); // Varsayılan tarih bugünün tarihi
  const [warning, setWarning] = useState("");

  const handleAddExpense = () => {
    if (description && amount && category) {
      const currentExpenses = state.expenses[category]
        ? state.expenses[category].reduce((sum, item) => sum + item.amount, 0)
        : 0;
      const newTotal = currentExpenses + parseFloat(amount);

      // Bütçe limiti kontrolü
      if (state.budgetLimits[category]) {
        const limit = state.budgetLimits[category];
        if (newTotal >= limit) {
          setWarning(`Uyarı: ${category} kategorisi limitini aştı!`);
        } else if (newTotal >= limit * 0.8) {
          setWarning(`Uyarı: ${category} kategorisi limitin %80'ine ulaştı!`);
        } else {
          setWarning(""); // Limit aşılmadıysa uyarıyı temizle
        }
      }

      // Harcamayı ekle
      dispatch({
        type: "ADD_EXPENSE",
        payload: { description, amount: parseFloat(amount), category, date },
      });

      // Alanları sıfırla
      setDescription("");
      setAmount("");
      setCategory("");
      setDate(dayjs().format("YYYY-MM-DD")); // Tarihi sıfırla
    }
  };

  const handleRemoveExpense = (category, index) => {
    dispatch({
      type: "REMOVE_EXPENSE",
      payload: { category, index },
    });
  };

  return (
    <div className="bg-white dark:bg-[#12091b] p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Aylık Harcamalar</h2>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Açıklamanız"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Tutar"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Kategori Seç</option>
          {state.categories.expenses.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddExpense}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ekle
        </button>
      </div>

      {/* Uyarı Mesajı */}
      {warning && <div className="text-red-500 font-semibold">{warning}</div>}

      {/* Harcama Listesi */}
      <div>
        {Object.keys(state.expenses).map((cat) => (
          <div key={cat}>
            <h3 className="font-bold mt-3">{cat}</h3>
            <ul>
              {state.expenses[cat].map((expense, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {expense.description}: {expense.amount} TL -{" "}
                    {dayjs(expense.date).format("DD/MM/YYYY")}
                  </span>
                  <button
                    onClick={() => handleRemoveExpense(cat, index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
