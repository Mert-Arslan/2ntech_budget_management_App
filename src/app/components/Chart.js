"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ incomeTotal, expenseTotal }) => {
  const data = {
    labels: ["Gelirler", "Giderler"],
    datasets: [
      {
        label: "Tutar (TL)",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gelir ve Gider Karşılaştırması",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Chart;
