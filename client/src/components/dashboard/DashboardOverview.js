// DashboardOverview.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardOverview.css';
import { ThemeProvider } from "@emotion/react";
import Header from "../Header";
import { createTheme } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const defaultTheme = createTheme();
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
const SERVER_PORT = process.env.SERVER_PORT || 3001;

const DashboardOverview = ({ monthlyExpense, weeklyExpense }) => {
    const [remainingIncome, setRemainingIncome] = useState(0);
    const [totalExpenses, setExpenses] = useState(0);
    const [totalBudget, setBudget] = useState(0);
    const [incomes, setIncomes] = useState([]);
    const [newIncome, setNewIncome] = useState({
        Amount: '',
        Type: '',
        Month: '',
    });
    const data = [
        { name: 'Total Income', value: remainingIncome },
        { name: 'Total Expenses', value: totalExpenses },
        { name: 'Remaining income', value: remainingIncome  - totalExpenses},
        { name: 'Total Budget', value: totalBudget },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].name}`}</p>
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        const fetchRemainingIncome = async () => {
            try {

                const userString = localStorage.getItem("user");
                const user = JSON.parse(userString);
                const response = await axios.get(`${BASE_URL}/income/${user._id}`);

                setRemainingIncome(response.data.totalAmount);
            } catch (error) {
                console.error('Error fetching remaining income:', error);
            }
        };

        fetchRemainingIncome();
    }, []);

    useEffect(() => {
        fetchIncomes();
    }, []);

    const fetchIncomes = async () => {
        try {
            const userString = localStorage.getItem('user');
            const user = JSON.parse(userString);
            const response = await axios.get(`${BASE_URL}/income/view/${user._id}`);
            setIncomes(response.data);
        } catch (error) {
            console.error('Error fetching incomes:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewIncome((prevIncome) => ({
            ...prevIncome,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userString = localStorage.getItem('user');
            const user = JSON.parse(userString);
            const incomeData = {
                ...newIncome,
                user: user._id,
            };
            await axios.post(`${BASE_URL}/income/add`, incomeData);
            setNewIncome({ Amount: '', Type: '', Month: '' }); // Reset newIncome state
            fetchIncomes(); // Refetch incomes to update the list
        } catch (error) {
            console.error('Error adding income:', error);
        }
    };

    useEffect(() => {
        // Fetch expenses from the backend API
        const fetchExpenses = async () => {
            try {
                const userString = localStorage.getItem("user");
                const user = JSON.parse(userString);
                const response = await axios.get(
                    `${BASE_URL}/expenses/total/${user._id}`
                );
                setExpenses(response.data.totalAmount);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpenses();
    }, []);

    useEffect(() => {
        // Fetch expenses from the backend API
        const fetchBudget = async () => {
            try {
                const userString = localStorage.getItem("user");
                const user = JSON.parse(userString);
                const response = await axios.get(
                    `${BASE_URL}/budget/total/${user._id}`
                );
                setBudget(response.data.totalAmount);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchBudget();
    }, []);



    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />
            <section className="dashboard-overview">
                <h2>Dashboard Overview</h2>
                <div className="metrics">
                    <div>
                        <h3>Total Income</h3>
                        <p>${remainingIncome}</p>
                    </div>
                    <div>
                        <h3>Total Budgeted Amount</h3>
                        <p>${totalBudget}</p>
                    </div>
                    <div>
                        <h3>Total Expenses</h3>
                        <p>${totalExpenses}</p>
                    </div>
                    <div>
                        <h3>Remaining Income</h3>
                        <p>${remainingIncome - totalExpenses}</p>
                    </div>

                </div>
                <div className="income-container">
                    <h2>Income</h2>
                    <form onSubmit={handleSubmit} className="income-form">
                        <div className="form-group">
                            <label htmlFor="Amount">Amount:</label>
                            <input
                                type="number"
                                id="Amount"
                                name="Amount"
                                value={newIncome.Amount}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="Type">Type:</label>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        id="Type"*/}
                        {/*        name="Type"*/}
                        {/*        value={newIncome.Type}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<div className="form-group">*/}
                        {/*    <label htmlFor="Month">Month:</label>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        id="Month"*/}
                        {/*        name="Month"*/}
                        {/*        value={newIncome.Month}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        required*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <button type="submit">Add Income</button>
                    </form>

                </div>
                <div className="pie-chart-container">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip/>}/>
                        <Legend/>
                    </PieChart>
                </div>
            </section>
        </ThemeProvider>
    );
};

export default DashboardOverview;