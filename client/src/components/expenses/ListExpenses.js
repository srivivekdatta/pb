import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./ListExpense.css";

import Header from "../Header";
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const ListExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [showAllExpenses, setShowAllExpenses] = useState(false);
  const [showAddExpensePopup, setShowAddExpensePopup] = useState(false);
  const [newExpense, setNewExpense] = useState({
    Description: "",
    Amount: "",
    Date: "",
    Category: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [remainingIncome, setRemainingIncome] = useState(incomeData);

  useEffect(() => {
    // Fetch expenses from the backend API
    const fetchExpenses = async () => {
      try {
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);
        const response = await axios.get(
            `${BASE_URL}/expenses/${user._id}`
        );
        setExpenses(response.data);
        calculateRemainingIncome(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);
        const response = await axios.get(`${BASE_URL}/income/${user._id}`);

        setIncomeData(response.data.totalAmount);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    fetchIncomeData();
  }, []);

  const toggleShowAllExpenses = () => {
    setShowAllExpenses(!showAllExpenses);
  };

  const openAddExpensePopup = () => {
    setShowAddExpensePopup(true);
  };

  const closeAddExpensePopup = () => {
    setShowAddExpensePopup(false);
    setNewExpense({
      Description: "",
      Amount: "",
      Date: "",
      Category: "",
    });
    setFormErrors({});
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!newExpense.Description) {
      errors.Description = "Description is required";
    }

    if (!newExpense.Amount) {
      errors.Amount = "Amount is required";
    } else if (isNaN(newExpense.Amount) || newExpense.Amount <= 0) {
      errors.Amount = "Amount must be a positive number";
    } else if (parseFloat(newExpense.Amount) > remainingIncome) {
      errors.Amount = `Expense amount (${
          newExpense.Amount
      }) exceeds remaining balance (${remainingIncome.toFixed(
          2
      )}). Do you want to proceed?`;
    }

    if (!newExpense.Date) {
      errors.Date = "Date is required";
    }

    if (!newExpense.Category) {
      errors.Category = "Category is required";
    }

    setFormErrors(errors);

    return (
        Object.keys(errors).length === 0 ||
        (errors.Amount && errors.Amount.includes("Do you want to proceed?"))
    );
  };

  const saveExpense = async () => {
    if (validateForm()) {
      try {
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);
        const expenseData = {
          ...newExpense,
          user: user._id,
          Amount: parseFloat(newExpense.Amount),
        };
        await axios.post(`${BASE_URL}/expenses/add`, expenseData);
        setExpenses((prevExpenses) => [...prevExpenses, expenseData]);
        calculateRemainingIncome([...expenses, expenseData]);
        closeAddExpensePopup();
      } catch (error) {
        console.error("Error saving expense:", error);
      }
    }
  };

  const calculateRemainingIncome = (expenses) => {
    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.Amount,
        0
    );
    const newRemainingIncome = incomeData - totalExpenses;
    setRemainingIncome(newRemainingIncome);
  };

  const chartData = {
    labels: ["Income", "Grocery", "Education", "Housing", "Other", "Utilities", "Transportation", "Entertainment", "Savings"],
    datasets: [
      {
        data: [
          expenses
              .filter((expense) => expense.Category === "Income")
              .reduce((total, expense) => total + expense.Amount, 0),
          expenses
              .filter((expense) => expense.Category === "Grocery")
              .reduce((total, expense) => total + expense.Amount, 0),
          expenses
              .filter((expense) => expense.Category === "Education")
              .reduce((total, expense) => total + expense.Amount, 0),
          expenses
              .filter((expense) => expense.Category === "Housing")
              .reduce((total, expense) => total + expense.Amount, 0),
          expenses
              .filter((expense) => expense.Category === "Other")
              .reduce((total, expense) => total + expense.Amount, 0),
          expenses
              .filter((expense) => expense.Category === "Transportation")
              .reduce((total, expense) => total + expense.Amount, 0),
          expenses
              .filter((expense) => expense.Category === "Entertainment")
              .reduce((total, expense) => total + expense.Amount, 0),
          expenses
              .filter((expense) => expense.Category === "Savings")
              .reduce((total, expense) => total + expense.Amount, 0),
          remainingIncome,
        ],
        backgroundColor: [ "#4CAF50",
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#03a9f4",
          "#00bcd4",],
        hoverBackgroundColor: ["#45a049",
          "#e53935",
          "#d81b60",
          "#8e24aa",
          "#5e35b1",
          "#3949ab",
          "#1e88e5",
          "#039be5",
          "#00acc1",],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Income vs Expenses",
      },
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
      <div className="expense-list">
        <Header />
        <h2>Expense List</h2>
        <div className="expense-list-actions">
          <button className="view-all-expenses" onClick={toggleShowAllExpenses}>
            {showAllExpenses ? "Show Less" : "View All Expense History"}
          </button>
        </div>
        <table className="expense-table">
          <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
          {expenses.length === 0 ? (
              <tr>
                <td colSpan={4}>No expenses found.</td>
              </tr>
          ) : (
              (showAllExpenses ? expenses : expenses.slice(0, 5)).map(
                  (expense, index) => (
                      <tr
                          key={expense._id}
                          className={index % 2 === 0 ? "even-row" : "odd-row"}
                      >
                        <td>{expense.Description}</td>
                        <td>{expense.Category}</td>
                        <td>{new Date(expense.Date).toLocaleDateString()}</td>
                        <td>${Number(expense.Amount).toFixed(2)}</td>
                      </tr>
                  )
              )
          )}
          </tbody>
        </table>
        {showAddExpensePopup && (
            <div className="popup-container">
              <div className="popup">
                <h3>Add Expense</h3>
                <div className="popup-content">
                  <input
                      type="text"
                      name="Description"
                      placeholder="Description"
                      value={newExpense.Description}
                      onChange={handleInputChange}
                  />
                  {formErrors.Description && (
                      <span className="error">{formErrors.Description}</span>
                  )}
                  <input
                      type="number"
                      name="Amount"
                      placeholder="Amount"
                      value={newExpense.Amount}
                      onChange={handleInputChange}
                  />
                  {formErrors.Amount && (
                      <span className="error">{formErrors.Amount}</span>
                  )}
                  <input
                      type="date"
                      name="Date"
                      value={newExpense.Date}
                      onChange={handleInputChange}
                  />
                  {formErrors.Date && (
                      <span className="error">{formErrors.Date}</span>
                  )}
                  <select
                      name="Category"
                      value={newExpense.Category}
                      onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="grocery">Grocery</option>
                    <option value="education">Education</option>
                    <option value="housing">Housing</option>
                    <option value="utilities">Utilities</option>
                    <option value="savings">Savings</option>
                    <option value="Other">Other</option>

                  </select>
                  {formErrors.Category && (
                      <span className="error">{formErrors.Category}</span>
                  )}
                </div>
                <div className="popup-actions">
                  <button onClick={saveExpense}>Save</button>
                  <button onClick={closeAddExpensePopup}>Close</button>
                </div>
              </div>
            </div>
        )}
        <button className="add-expense-button" onClick={openAddExpensePopup}>
          Add Expense
        </button>
        <div className="expense-graph">
          <div className="donut-chart">
            <h2>Income: ${incomeData}</h2>
            <h3>
              Total Expenses: $
              {expenses
                  .reduce((total, expense) => total + expense.Amount, 0)
                  .toFixed(2)}
            </h3>
            {/*<h4 style={{ color: remainingIncome < 0 ? "red" : "inherit" }}>*/}
            {/*  {remainingIncome < 0 ? "Debt Remaining:" : "Remaining Balance:"} $*/}
            {/*  {Math.abs(remainingIncome).toFixed(2)}*/}
            {/*</h4>*/}
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
  );
};

export default ListExpenses;
