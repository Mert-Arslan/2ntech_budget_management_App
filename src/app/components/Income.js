"use client";

import React, { useState } from "react";
import { useBudget } from "../contexts/BudgetManagement";
import dayjs from "dayjs";

const Income = () => {
  const { state, dispatch } = useBudget();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD")); // Varsayılan tarih

  const handleAddIncome = () => {
    if (description && amount && category) {
      dispatch({
        type: "ADD_INCOME",
        payload: { description, amount: parseFloat(amount), category, date },
      });

      setDescription("");
      setAmount("");
      setCategory("");
      setDate(dayjs().format("YYYY-MM-DD")); // Tarihi sıfırla
    }
  };

  const handleRemoveIncome = (category, index) => {
    dispatch({
      type: "REMOVE_INCOME",
      payload: { category, index },
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Aylık Gelirler</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
        <input
          type="text"
          placeholder="Açıklamanız"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Tutar (TL)"
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
          {state.categories.income.map((cat, index) => (
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
          onClick={handleAddIncome}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ekle
        </button>
      </div>

      <div>
        {Object.keys(state.income).map((cat) => (
          <div key={cat}>
            <h3 className="font-bold mt-3">{cat}</h3>
            <ul>
              {state.income[cat].map((income, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {income.description}: {income.amount} TL -{" "}
                    {dayjs(income.date).format("DD/MM/YYYY")}
                  </span>
                  <button
                    onClick={() => handleRemoveIncome(cat, index)}
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

export default Income;
