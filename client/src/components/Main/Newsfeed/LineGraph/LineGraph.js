import React, { useState, useEffect } from 'react'
import './LineGraph.css';
import { Line } from 'react-chartjs-2';

function LineGraph() {
    const [ graphData, setGraphData ] = useState([]);
    const createMockData = () => {
        let data = [];
        let value = 100;
        for (let i = 365; i >= 0; i--) {
            let date = new Date();
            date.setHours(0,0,0,0);
            date.setDate(-i);
            const delta = Math.round((Math.random() < 0.5 ? 1: -1 ) * Math.random() * 10);
            value += delta;
            data.push({x: date, y: value});
        }
        setGraphData(data);
    }
    useEffect(() => {
        createMockData();
    }, []);
    return (
        <div className="linegraph">
            <Line 
                data={{
                    datasets: [
                        {
                            type: "line",
                            data: graphData,
                            backgroundColor: "black",
                            borderColor: "#5AC53B",
                            borderWidth: 2,
                            pointBorderColor: 'rgba(0, 0, 0, 0)',
                            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                            pointHoverBackgroundColor: '#5ac53b',
                            pointHoverBorderWidth:4,
                            pointHoverRadius: 4,
                            showLine: true
                        }
                    ]
                }}
                options={{
                    legend: {
                        display: false
                    },
                    hover: {
                        intersect: true
                    },
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                display: false
                            },
                            gridLines: {
                                display: false
                            },
                        }],
                        xAxes: [
                            {
                                type: "time",
                                time: {
                                    format: "MM/DD/YY",
                                    tooltipFormat: 'l',
                                },
                                ticks: {
                                    display: false
                                }
                            }
                        ]
                    }
                }}
            />
        </div>
    )
}

export default LineGraph
