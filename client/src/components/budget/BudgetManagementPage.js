// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";
// import './BudgetManagementPage.css'
//
// import Header from "../Header";
//
// const BudgetManagementPage = () => {
//   const [budgets, setBudgets] = useState([]);
//   const [income, setIncome] = useState(15000);
//   const [showAllBudgets, setShowAllBudgets] = useState(false);
//   const [showAddBudgetPopup, setShowAddBudgetPopup] = useState(false);
//   const [newBudget, setNewBudget] = useState({
//     title: "",
//     budget: "",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [remainingIncome, setRemainingIncome] = useState(income);
//
//   useEffect(() => {
//     const fetchBudgets = async () => {
//       try {
//         const userString = localStorage.getItem("user");
//         const user = JSON.parse(userString);
//         const response = await axios.get(
//           `${BASE_URL}/budgets/${user._id}`
//         );
//         setBudgets(response.data);
//         calculateRemainingIncome(response.data);
//       } catch (error) {
//         console.error("Error fetching budgets:", error);
//       }
//     };
//
//     fetchBudgets();
//   }, []);
//
//   const toggleShowAllBudgets = () => {
//     setShowAllBudgets(!showAllBudgets);
//   };
//
//   const openAddBudgetPopup = () => {
//     setShowAddBudgetPopup(true);
//   };
//
//   const closeAddBudgetPopup = () => {
//     setShowAddBudgetPopup(false);
//     setNewBudget({
//       title: "",
//       budget: "",
//     });
//     setFormErrors({});
//   };
//
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewBudget((prevBudget) => ({
//       ...prevBudget,
//       [name]: value,
//     }));
//   };
//
//   const saveBudget = async () => {
//     try {
//       const userString = localStorage.getItem("user");
//       const user = JSON.parse(userString);
//       const budgetData = {
//         ...newBudget,
//         user: user._id,
//       };
//       await axios.post("${BASE_URL}/budgets/add", budgetData);
//       setBudgets((prevBudgets) => [...prevBudgets, budgetData]);
//       calculateRemainingIncome([...budgets, budgetData]);
//       closeAddBudgetPopup();
//     } catch (error) {
//       console.error("Error saving budget:", error);
//     }
//   };
//
//   const calculateRemainingIncome = (budgets) => {
//     const totalBudgets = budgets.reduce(
//       (total, budget) => total + parseFloat(budget.budget),
//       0
//     );
//     const newRemainingIncome = income - totalBudgets;
//     setRemainingIncome(newRemainingIncome);
//   };
//
//   const chartData = {
//     labels: ["Remaining Income"],
//     datasets: [
//       {
//         data: [remainingIncome],
//         backgroundColor: ["#4CAF50"],
//         hoverBackgroundColor: ["#45a049"],
//       },
//     ],
//   };
//
//   const chartOptions = {
//     plugins: {
//       title: {
//         display: true,
//         text: "Remaining Income",
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   };
//
//   return (
//     <div className="budget-management">
//       <Header />
//       <h2>Budget List</h2>
//       <div className="budget-management-actions">
//         <button className="view-all-budgets" onClick={toggleShowAllBudgets}>
//           {showAllBudgets ? "Show Less" : "View All Budget History"}
//         </button>
//       </div>
//       <table className="budget-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Budget</th>
//           </tr>
//         </thead>
//         <tbody>
//           {budgets.length === 0 ? (
//             <tr>
//               <td colSpan={2}>No budgets found.</td>
//             </tr>
//           ) : (
//             (showAllBudgets ? budgets : budgets.slice(0, 5)).map(
//               (budget, index) => (
//                 <tr
//                   key={budget._id}
//                   className={index % 2 === 0 ? "even-row" : "odd-row"}
//                 >
//                   <td>{budget.title}</td>
//                   <td>${Number(budget.budget).toFixed(2)}</td>
//                 </tr>
//               )
//             )
//           )}
//         </tbody>
//       </table>
//       {showAddBudgetPopup && (
//         <div className="popup-container">
//           <div className="popup">
//             <h3>Add Budget</h3>
//             <div className="popup-content">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 value={newBudget.title}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="number"
//                 name="budget"
//                 placeholder="Budget"
//                 value={newBudget.budget}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="popup-actions">
//               <button onClick={saveBudget}>Save</button>
//               <button onClick={closeAddBudgetPopup}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//       <button className="add-budget-button" onClick={openAddBudgetPopup}>
//         Add Budget
//       </button>
//       <div className="budget-graph">
//         <div className="donut-chart">
//           <h2>Income: ${income}</h2>
//           <h4 style={{ color: remainingIncome < 0 ? "red" : "inherit" }}>
//             {remainingIncome < 0 ? "Debt Remaining:" : "Remaining Balance:"} $
//             {Math.abs(remainingIncome).toFixed(2)}
//           </h4>
//           <Doughnut data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default BudgetManagementPage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import './BudgetManagementPage.css'

import Header from "../Header";
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const BudgetManagementPage = () => {
    const [budgets, setBudgets] = useState([]);
    // const [income, setIncome] = useState(15000);
    const [showAllBudgets, setShowAllBudgets] = useState(false);
    const [showAddBudgetPopup, setShowAddBudgetPopup] = useState(false);
    const [newBudget, setNewBudget] = useState({
        title: "",
        budget: "",
    });
    const [formErrors, setFormErrors] = useState({});
    // const [remainingIncome, setRemainingIncome] = useState(income);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [incomeData, setIncomeData] = useState([]);
    const [remainingIncome, setRemainingIncome] = useState(incomeData);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const userString = localStorage.getItem("user");
                const user = JSON.parse(userString);
                const response = await axios.get(
                    `${BASE_URL}/budgets/${user._id}`
                );
                setBudgets(response.data);
                calculateRemainingIncome(response.data);
            } catch (error) {
                console.error("Error fetching budgets:", error);
            }
        };

        fetchBudgets();
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

    const toggleShowAllBudgets = () => {
        setShowAllBudgets(!showAllBudgets);
    };

    const openAddBudgetPopup = () => {
        setShowAddBudgetPopup(true);
    };

    const closeAddBudgetPopup = () => {
        setShowAddBudgetPopup(false);
        setNewBudget({
            title: "",
            budget: "",
        });
        setFormErrors({});
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewBudget((prevBudget) => ({
            ...prevBudget,
            [name]: value,
        }));
    };



    const saveBudget = async () => {
        try {
            const userString = localStorage.getItem("user");
            const user = JSON.parse(userString);
            const budgetData = {
                ...newBudget,
                user: user._id,
            };
            await axios.post(`${BASE_URL}/budgets/add`, budgetData);
            setBudgets((prevBudgets) => [...prevBudgets, budgetData]);
            calculateRemainingIncome([...budgets, budgetData]);
            closeAddBudgetPopup();
        } catch (error) {
            console.error("Error saving budget:", error);
        }
    };

    const calculateRemainingIncome = (budgets) => {
        const totalBudgets = budgets.reduce(
            (total, budget) => total + parseFloat(budget.budget),
            0
        );
        const newRemainingIncome = incomeData - totalBudgets;
        setRemainingIncome(newRemainingIncome);
    };

    const chartData = {
        labels: ["Income", "Grocery", "Education", "Housing", "Other", "Utilities", "Transportation", "Entertainment", "Savings"],
        datasets: [
            {
                label: "Income vs Budget",
                data: [
                    incomeData,
                    ...["Grocery", "Education", "Housing", "Other", "Utilities", "Transportation", "Entertainment", "Savings"].map(
                        (category) =>
                            budgets.reduce(
                                (total, budget) =>
                                    budget.title.toLowerCase() === category.toLowerCase()
                                        ? total + parseFloat(budget.budget)
                                        : total,
                                0
                            )
                    ),
                ],
                backgroundColor: [
                    "#4CAF50",
                    "#f44336",
                    "#e91e63",
                    "#9c27b0",
                    "#673ab7",
                    "#3f51b5",
                    "#2196f3",
                    "#03a9f4",
                    "#00bcd4",
                ],
                hoverBackgroundColor: [
                    "#45a049",
                    "#e53935",
                    "#d81b60",
                    "#8e24aa",
                    "#5e35b1",
                    "#3949ab",
                    "#1e88e5",
                    "#039be5",
                    "#00acc1",
                ],
            },
        ],
    };

    const chartOptions = {
        plugins: {
            title: {
                display: false,
                text: "Income vs. Budgets",
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
        scales: {
            x: {
                ticks: {
                    beginAtZero: true,
                },
            },
            y: {
                ticks: {
                    stepSize: 100, // Set the y-axis tick interval to 100
                    max: 1000, // Set the maximum value on the y-axis to 1000
                },
            },
        },
    };

    const handleTitleChange = async (event, budgetId) => {
        try {
            const newTitle = event.target.value;
            const updatedBudget = {
                title: newTitle,
            };
            await axios.put(`${BASE_URL}/budgets/${budgetId}`, updatedBudget);
            setBudgets((prevBudgets) =>
                prevBudgets.map((budget) =>
                    budget._id === budgetId ? { ...budget, title: newTitle } : budget
                )
            );
        } catch (error) {
            console.error("Error updating budget title:", error);
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredBudgets = selectedCategory === "all"
        ? budgets
        : budgets.filter(budget =>
            budget.title.toLowerCase().includes(selectedCategory.toLowerCase())
        );

    return (
        <div className="budget-management">
            <Header/>
            <h2>Budget List</h2>
            <div className="budget-management-actions">
                <button className="view-all-budgets" onClick={toggleShowAllBudgets}>
                    {showAllBudgets ? "Show Less" : "View All Budget History"}
                </button>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="all">All Categories</option>
                    <option value="grocery">Grocery</option>
                    <option value="education">Education</option>
                    <option value="housing">Housing</option>
                    <option value="other">Other</option>
                    <option value="utilities">Utilities</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="savings">Savings</option>
                </select>
            </div>
            <table className="budget-table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Budget</th>
                </tr>
                </thead>
                <tbody>
                {filteredBudgets.length === 0 ? (
                    <tr>
                        <td colSpan={2}>No budgets found.</td>
                    </tr>
                ) : (
                    (showAllBudgets ? filteredBudgets : filteredBudgets.slice(0, 5)).map(
                        (budget, index) => (
                            <tr
                                key={budget._id}
                                className={index % 2 === 0 ? "even-row" : "odd-row"}
                            >
                                <td>{budget.title}</td>
                                <td>${Number(budget.budget).toFixed(2)}</td>
                            </tr>
                        )
                    )
                )}
                </tbody>
            </table>
            {showAddBudgetPopup && (
                <div className="popup-container">
                    <div className="popup">
                        <h3>Add Budget</h3>
                        <div className="popup-content">
                            <select
                                name="title"
                                value={newBudget.title}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Title</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Education">Education</option>
                                <option value="Housing">Housing</option>
                                <option value="Other">Other</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Savings">Savings</option>
                            </select>
                            <input
                                type="number"
                                name="budget"
                                placeholder="Budget"
                                value={newBudget.budget}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="popup-actions">
                            <button onClick={saveBudget}>Save</button>
                            <button onClick={closeAddBudgetPopup}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            <button className="add-budget-button" onClick={openAddBudgetPopup}>
                Add Budget
            </button>
            <div className="budget-graph">
                 <div className="donut-chart">
                <h2>Income: ${incomeData}</h2>
                     <Bar data={chartData} options={chartOptions}/>
                 </div>

            </div>
        </div>
    );
};

export default BudgetManagementPage;