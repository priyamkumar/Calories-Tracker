import React, { useState } from "react";
import Chart from "react-apexcharts"

export default function StatisticsBarChart({dataArr}) {
  let allDates = JSON.parse(localStorage.getItem("allDates"));
  let date = allDates.map((el) => el.split("-")[1] + "-" + el.split("-")[2]);
  let data = allDates.map((el) => JSON.parse(localStorage.getItem(el)));
  let calories = (data.map((el) => el.calories));


  {
    const [data, setData] = useState({
          
      series: [{
        name: 'Calories',
        data: calories,
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + " " + "Cal";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        
        xaxis: {
          categories: date,
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + " " + "Cal";
            }
          }
        
        },
        title: {
          text: 'Weekly Calories',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      },
    
    
    });
    return (
      <div>
        <div id="chart">
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}
