import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

const chartConfig = {
  type: 'line',
  data: {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [
      {
        label: 'AQI indices of city',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

const ChartWrapper = ({ individualCity, aqiData }) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const updateDataset = (datasetIndex, newData) => {
    if (!chartInstance || !chartInstance.data) return;
    chartInstance.data.labels = [
      ...chartInstance.data.labels,
      chartInstance.data.labels.length + 1,
    ];
    chartInstance.data.datasets[datasetIndex].label = `AQI indices of ${individualCity}`;
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, {
        ...chartConfig,
        dataSets: { ...chartConfig, data: aqiData },
      });
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, aqiData]);

  useEffect(() => {
    if (!aqiData) return;
    updateDataset(0, aqiData);
  }, [aqiData, aqiData, updateDataset]);

  return (
    <div className='chart-wrapper'>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ChartWrapper;
