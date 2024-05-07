import React, { useState, useEffect } from 'react';
import api from '../api';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Reports = () => {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);

    useEffect(() => {
        // Fetch expenses and incomes from the backend API
        const fetchData = async () => {
            try {
                const expensesResponse = await api.get('/expenses');
                setExpenses(expensesResponse.data);

                const incomesResponse = await api.get('/incomes');
                setIncomes(incomesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Group expenses and incomes by month
    const groupByMonth = (data) => {
        const grouped = {};
        data.forEach((item) => {
            const month = new Date(item.Date).toLocaleString('default', { month: 'short' });
            if (!grouped[month]) {
                grouped[month] = 0;
            }
            grouped[month] += item.Amount;
        });
        return grouped;
    };

    const expensesByMonth = groupByMonth(expenses);
    const incomesByMonth = groupByMonth(incomes);

    // Prepare data for the line chart
    const chartData = {
        labels: Object.keys(expensesByMonth),
        datasets: [
            {
                label: 'Expenses',
                data: Object.values(expensesByMonth),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
            },
            {
                label: 'Incomes',
                data: Object.values(incomesByMonth),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <h2>Reports</h2>
            <div>
                <h3>Monthly Trends</h3>
                <Line data={chartData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default Reports;