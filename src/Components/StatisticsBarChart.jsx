import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useTheme } from "../Contexts/ThemeContext";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../main";
import { useOutletContext } from "react-router-dom";

export default function StatisticsBarChart() {
  const { sevenDaysData, setSevenDaysData } = useOutletContext();
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const { theme } = useTheme();
  const [barData, setBarData] = useState({
    series: [
      {
        name: "Calories",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 30,
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
        labels: {
          rotate: -45,
          rotateAlways: true,
        },
        categories: [],
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
        text: "Last 7 days Calories",
        floating: true,
        offsetY: 330,
        align: "center",
      },
    },
  });

  useEffect(() => {
    axios
      .get(`${server}/track/getCaloriesData`, {
        withCredentials: true,
      })
      .then((res) => {
        setSevenDaysData(res.data);
        setBarData((prevData) => ({
          ...prevData,
          series: [
            {
              ...prevData.series,
              data: res.data.map((el) => el.totalCalories),
            },
          ],
          options: {
            ...prevData.options,
            xaxis: {
              ...prevData.options.xaxis,
              categories: res.data.map((el) => el._id),
            },
          },
        }));
      })
      .catch((err) => console.log(err));
    setBarData((prevData) => ({
      ...prevData,
      series: [
        {
          ...prevData.series,
          data: [],
        },
      ],
      options: {
        ...prevData.options,
        xaxis: {
          ...prevData.options.xaxis,
          categories: [],
        },
      },
    }));
  }, [isAuthenticated]);

  useEffect(() => {
    setBarData((prevData) => ({
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
        options={barData.options}
        series={barData.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
