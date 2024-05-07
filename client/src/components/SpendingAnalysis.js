import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
// import './SpendingAnalysis.css';

const SpendingAnalysis = ({ data }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null); // Reference to the Chart instances

//   useEffect(() => {
//     const ctx = canvasRef.current.getContext('2d');

//     // Clear the canvas
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//     // Create new Chart instances
//     const weeklyChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
//         datasets: [{
//           label: 'Weekly Spending',
//           data: data.weeklySpending,
//           backgroundColor: 'rgba(54, 162, 235, 0.5)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });

    // const monthlyChart = new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [{
    //       label: 'Monthly Spending',
    //       data: data.monthlySpending,
    //       borderColor: 'rgba(255, 159, 64, 1)',
    //       borderWidth: 2,
    //       fill: false
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });

    // Store the new Chart instances in chartRef
    // chartRef.current = { weeklyChart, monthlyChart };

//   }, [data]);


    return (
        <section className="spending-analysis">
            <h2>Spending Analysis</h2>
            <canvas ref={canvasRef}></canvas>
        </section>
    );
}

export default SpendingAnalysis;
