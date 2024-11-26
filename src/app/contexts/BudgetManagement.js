"use client";
import React, { createContext, useReducer, useContext } from "react";
import { budgetReducer } from "./BudgetReducer";

const BudgetContext = createContext();

const initialState = {
  income: {},
  expenses: {},
  categories: {
    income: ["Maaş", "Kira Geliri"],
    expenses: ["Ev Harcamaları", "Eğlence", "Sağlık"],
  },
  budgetLimits: {},
};

export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
