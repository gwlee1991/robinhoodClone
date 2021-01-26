import React from 'react'
import './LineGraph.css';
import { Line } from 'react-chartjs-2';

class LineGraph extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        graphData: []
      };
  }

  createMockData = () => {
    const timelineMapper = {
      '1D': 13,
      '1W': 14,
      '1M': 30,
      '3M': 90,
      '1Y': 365,
      '5Y': 365 * 5,
      'ALL': 365
    }
    let data = [];
    let value = 100;
    for (let i = timelineMapper[this.props.timeline]; i >= 0; i--) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(-i);
      const delta = Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      value += delta;
      data.push({ x: date, y: value });
    }
    this.setState({
        graphData: data
    })
  }

  componentDidMount = () => {
    this.createMockData();
  }
  
  componentDidUpdate(prevProps){
    if (prevProps.timeline !== this.props.timeline) {
        this.createMockData();
    }
  }
  
  render(){
    return (
      <div className="linegraph">
        <Line 
          data={{
            datasets: [
              {
                type: "line",
                data: this.state.graphData,
                backgroundColor: "black",
                borderColor: "#5AC53B",
                borderWidth: 2,
                lineTension: 0,
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
            animation: {
              duration: 0
            },
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
              }]
            }
          }}
          />
        </div>
    )
  }
}

export default LineGraph;
