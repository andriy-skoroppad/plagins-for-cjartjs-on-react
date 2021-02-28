
import Chart from 'chart.js';
import React from 'react';

import './index.css';
import { semiPolarAreaPlugin } from './semi-polar-area-plugin/plagin';

export class ChartJs extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidMount() {
        Chart.defaults.polarAreaTwo = Chart.defaults.polarArea;

        const chart = new Chart(this.canvas.current, {
            type: 'polarArea',
            
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    // minBarLength: 10,
                    data: [35, 10, 50, 10, 5, 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0)',
                        'rgba(54, 162, 235, 0)',
                        'rgba(255, 206, 86, 0)',
                        'rgba(75, 192, 192, 0)',
                        'rgba(153, 102, 255, 0)',
                        'rgba(255, 159, 64, 0)'
                    ],
                    borderWidth: 1
                }]
            },
            plugins: [semiPolarAreaPlugin],
            options: {
              startAngle: -Math.PI * 2,
              scale: {
                display: false,
                position: 'bottom'
              },
              elements: {
                arc: {
                  borderWidth: 2,
                  borderColor: 'rgba(0,0,0,0)'
                }
              },
              legend: {
                position: 'bottom'
              },
              layout: {
                padding: {
                  // bottom: -150,
                }
              }
            },
        });
    }


    render() {
      return <div className="chart">
          <canvas ref={this.canvas}></canvas>
          </div>;
    }
  }