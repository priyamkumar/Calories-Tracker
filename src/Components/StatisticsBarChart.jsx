import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "../Contexts/ThemeContext";

export default function StatisticsBarChart() {
  let allDates = JSON.parse(localStorage.getItem("allDates"));
  let barDates = allDates.sort((a, b) => new Date(b) - new Date(a));
  barDates = barDates.slice(0, 7).reverse();
  let date = barDates.map((el) => el.split("-")[1] + "-" + el.split("-")[2]);
  let barData = barDates.map((el) => JSON.parse(localStorage.getItem(el)));
  let calories = barData.map((el) => el.calories);

  const { theme } = useTheme();

  const [data, setData] = useState({
    series: [
      {
        name: "Calories",
        data: calories,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        background: theme === "Dark" ? "black" : "white",
        foreColor: theme === "Dark" ? "white" : "black",
        toolbar: {
          show: false,
        },
      },
      theme: {
        mode: theme === "Dark" ? "dark" : "light", 
      },
      plotOptions: {
        bar: {
          columnWidth: "25%",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
        },
      },

      xaxis: {
        categories: date,
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + " " + "Cal";
          },
        },
      },
      title: {
        text: "Weekly Calories",
        floating: true,
        offsetY: 330,
        align: "center",
      },
    },
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        chart: {
          ...prevData.options.chart,
          background: theme === "Dark" ? "black" : "white",
          foreColor: theme === "Dark" ? "white" : "black",
        },
        theme: {
          mode: theme === "Dark" ? "dark" : "light",
        },
        dataLabels: {
          ...prevData.dataLabels,
          style: {
            fontSize: "12px",
            colors: [theme === "Dark" ? "white" : "black"],
          },
        },
        xaxis: {
          ...prevData.options.xaxis,
          labels: {
            ...prevData.options.xaxis.labels,
            style: {
              colors: theme === "Dark" ? "white" : "black",
            },
          },
        },
        title: {
          ...prevData.options.title,
          style: {
            color: theme === "Dark" ? "white" : "black",
          },
        },
      },
    }));
  }, [theme]);

  return (
    <div className="chart-container">
      <Chart
        className="chart"
        options={data.options}
        series={data.series}
        type="bar"
        height={350}
      />
      <div id="html-dist"></div>
    </div>
  );
}
