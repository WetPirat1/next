"use client";

import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [view, setView] = useState("table");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data");
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(value)
        )
      )
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredData(sortedData);
  };

  const ageGroups = {
    "20-30": 0,
    "30-40": 0,
    "40-50": 0,
    "50-60": 0,
    "60+": 0,
  };

  filteredData.forEach((item) => {
    if (item.age >= 20 && item.age < 30) ageGroups["20-30"]++;
    else if (item.age >= 30 && item.age < 40) ageGroups["30-40"]++;
    else if (item.age >= 40 && item.age < 50) ageGroups["40-50"]++;
    else if (item.age >= 50 && item.age < 60) ageGroups["50-60"]++;
    else if (item.age >= 60) ageGroups["60+"]++;
  });

  const chartData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: "Количество людей",
        data: Object.values(ageGroups),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <p className="text-center text-red-500 text-xl mt-10">
        You must log in to view this page.
      </p>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-1/2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setView(view === "table" ? "chart" : "table")}
          className="p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Switch to {view === "table" ? "Chart" : "Table"}
        </button>
      </div>
      {view === "table" ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th
                className="p-2 border border-gray-300 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID{" "}
                {sortConfig.key === "id" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 border border-gray-300 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="p-2 border border-gray-300 cursor-pointer"
                onClick={() => handleSort("age")}
              >
                Age{" "}
                {sortConfig.key === "age" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-2 border border-gray-300">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300 text-center">
                  {item.id}
                </td>
                <td className="p-2 border border-gray-300">{item.name}</td>
                <td className="p-2 border border-gray-300 text-center">
                  {item.age}
                </td>
                <td className="p-2 border border-gray-300">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full h-96">
          <Pie
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
