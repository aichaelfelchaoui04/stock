import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const Charts = () => {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    async function fetchChartData() {
      const { data } = await axios.get("/api/charts");
      setChartLabels(data.labels);
      setChartData(data.data);
    }
    fetchChartData();
  }, []);

const data = {
    labels: chartLabels,
    datasets: [{
        label: 'Nombre du stocks',
        data: chartData,
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(54, 162, 245, 0.2)',
        'rgba(153, 102, 260, 0.2)',
        'rgba(201, 203, 217, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgba(54, 162, 245)',
        'rgba(153, 102, 260)',
        'rgba(201, 203, 217)'
        ],
        borderWidth: 2
    }]
};

  return (
    <div className="table-responsive">
      <Bar
        data={data}
        height={500}
        width={600}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default Charts;
