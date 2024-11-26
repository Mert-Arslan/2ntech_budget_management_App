"use client";

import React, { useState } from "react";
import { useBudget } from "../contexts/BudgetManagement";

const Category = () => {
  const { state, dispatch } = useBudget();
  const [newCategory, setNewCategory] = useState("");
  const [type, setType] = useState("income"); // Varsayılan olarak gelir kategorisi
  const [limit, setLimit] = useState(""); // Yeni kategori limiti
  const [selectedCategory, setSelectedCategory] = useState(""); // Mevcut kategori seçimi
  const [selectedLimit, setSelectedLimit] = useState(""); // Mevcut kategori limiti

  // Yeni kategori ekleme
  const handleAddCategoryWithLimit = () => {
    if (newCategory && type) {
      dispatch({
        type: "ADD_CATEGORY",
        payload: { name: newCategory, type },
      });

      if (type === "expenses" && limit) {
        dispatch({
          type: "SET_BUDGET_LIMIT",
          payload: { category: newCategory, limit: parseFloat(limit) },
        });
      }

      setNewCategory("");
      setType("income");
      setLimit("");
    }
  };

  // Mevcut kategoriye limit belirleme
  const handleSetLimitForExistingCategory = () => {
    if (selectedCategory && selectedLimit) {
      dispatch({
        type: "SET_BUDGET_LIMIT",
        payload: {
          category: selectedCategory,
          limit: parseFloat(selectedLimit),
        },
      });

      setSelectedCategory("");
      setSelectedLimit("");
    }
  };

  return (
    <div className="bg-blue p-5 rounded shadow-lg mb-5">
      <h2 className="text-xl font-bold mb-4 text-center">
        Kategori Ekle ve Limit Belirle
      </h2>

      {/* Yeni Kategori Ekleme */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Yeni Kategori Ekle</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Kategori Adı"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="income">Gelir</option>
            <option value="expenses">Gider</option>
          </select>
          {type === "expenses" && (
            <input
              type="number"
              placeholder="Limit (TL)"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="border p-2 rounded w-full"
            />
          )}
          <button
            onClick={handleAddCategoryWithLimit}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Ekle
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Mevcut Giderin Limit</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            type="number"
            placeholder="Limit Belirle (TL)"
            value={selectedLimit}
            onChange={(e) => setSelectedLimit(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleSetLimitForExistingCategory}
            className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Limit Ayarla
          </button>
        </div>
      </div>

      {/* Gelir ve Gider Kategorileri */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Kategoriler</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2">Gelir Kategorileri</h4>
            <ul className="list-disc pl-5">
              {state.categories.income.map((cat, index) => (
                <li key={index}>{cat}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Gider Kategorileri</h4>
            <ul className="list-disc pl-5">
              {state.categories.expenses.map((cat, index) => (
                <li key={index}>
                  {cat}{" "}
                  {state.budgetLimits && state.budgetLimits[cat]
                    ? `- Limit: ${state.budgetLimits[cat]} TL`
                    : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
