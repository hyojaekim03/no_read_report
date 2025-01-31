import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the prop types for the GaugeComponent
interface GaugeComponentProps {
    values: number[];
    total_non: number; // The current value
    total_count: number; // The total count
    previous_value: number; // The previous value to calculate delta
}

const GaugeComponent: React.FC<GaugeComponentProps> = ({ values, total_non, total_count, previous_value }) => {
    // Define segment colors
    // const filledColor = '#4caf50';
    // const emptyColor = '#E0E0E0';
    const green = '#4caf50';
    const blue = '#36A2EB';
    const yellow = '#FFEB3B';
    const orange = '#FF9800';
    const red = '#F44336';

    // Calculate percentage
    const percentage = (total_non / total_count) * 100;

    // Calculate delta percentage change
    // const delta = previous_value !== 0 ? ((total_non - previous_value) / previous_value) * 100 : 0;

    // Set up the chart data with different color segments based on the value
    const data = {
        datasets: [
            {
                data: [
                    0, values[0], values[1], values[2], values[3], values[4], total_count - total_non
                ],
                backgroundColor: [
                    green,
                    blue,
                    yellow,
                    orange,
                    red
                ],
                borderWidth: 0,
            },
        ],
    };

    // Chart options to make it a semi-circle and enable tooltip
    const options = {
        responsive: true,
        cutout: '80%', // Makes it a donut
        rotation: -90, // Start from the bottom
        circumference: 180, // Half circle (semi-circle)
        plugins: {
            tooltip: {
                enabled: true, // Enable tooltips
                callbacks: {
                    // Customize the tooltip to show the actual value
                    label: function (tooltipItem: any) {
                        const value = tooltipItem.raw;
                        return `${value} of ${total_count}`; // Show the actual value and total count
                    },
                },
            },
        },
    };

    return (
        <div style={{ textAlign: 'center', width: '200px', height: '200px' }}>
            {/* Doughnut chart with a fixed size */}
            <Doughnut data={data} options={options} width={200} height={200} />

            {/* Display the current value in the center of the gauge */}
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '-60px' }}>
                {total_non}
            </div>

            {/* Display the delta value below the gauge */}
            {/*<div style={{ fontSize: '16px', marginTop: '10px' }}>*/}
            {/*    {delta >= 0 ? (*/}
            {/*        <span style={{ color: 'green' }}>↑ {delta.toFixed(2)}%</span>*/}
            {/*    ) : (*/}
            {/*        <span style={{ color: 'red' }}>↓ {Math.abs(delta).toFixed(2)}%</span>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default GaugeComponent;
