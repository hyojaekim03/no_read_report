import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the prop types for the GaugeComponent
interface GaugeComponentProps {
    value: number;
    total_count: number;
    delta: number;
    name?: string;
}

const GaugeComponent: React.FC<GaugeComponentProps> = ({ value, total_count, delta, name }) => {
    // Set up the chart data
    const data = {
        datasets: [
            {
                data: [value, total_count - value], // value between 0 and total_count
                backgroundColor: ['#36A2EB', '#E0E0E0'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '80%', // Makes it a donut
        rotation: -90, // Start from the bottom
        circumference: 180, // Half circle (semi-circle)
        plugins: {
            tooltip: {
                enabled: false, // Disable tooltip
            },
        },
    };

    return (
        <div style={{ position: 'relative', textAlign: 'center', width: '120px', height: '120px' }}>
            {/* Doughnut chart with a fixed size */}
            <Doughnut data={data} options={options} width={120} height={120} />

            {/* Display the value inside the doughnut */}
            <div
                style={{
                    position: 'absolute',
                    top: '65%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}
            >
                {value}
                <div style={{ fontSize: '14px', marginTop: '5px' }}>
                    {delta >= 0 ? (
                        <span style={{ color: 'green' }}>↑ {delta}%</span>
                    ) : (
                        <span style={{ color: 'red' }}>↓ {Math.abs(delta)}%</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GaugeComponent;
