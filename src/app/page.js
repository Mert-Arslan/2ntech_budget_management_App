"use client";

import React, { useEffect } from "react";
import Income from "./components/Income";
import Expense from "./components/Expense";
import CalculationSection from "./components/CalculationSection";
import Category from "./components/Category";
import { useLocalStorage } from "../hooks/UseLocalStorage";

export default function Home() {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white dark:bg-slate-500 ">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-4">2NTECH BÜTÇE TAKİP</h1>
        <button
          onClick={toggleDarkMode}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {darkMode ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
        </button>
        <p className="text-gray-600">Gelir ve giderlerinizi kolayca yönetin</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {" "}
        <Category />
        <Income />
        <Expense />
        <CalculationSection />
      </main>

      <footer className="text-center text-gray-500">
        <p>© 2024 Kişisel Bütçe Takip Uygulaması</p>
      </footer>
    </div>
  );
}
