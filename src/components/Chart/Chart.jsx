// We're using useState for the state and the useEffect hook
// The Effect Hook lets you perform side effects in function components (https://reactjs.org/docs/hooks-effect.html)
import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  // We specify the state:
  const [dailyData, setDailyData] = useState([]);

  // Above is the equivalent of the following. But we're writting it (like above) because this is not a Class based component
  // state = {
  //   dailyData: {},
  // };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    // console.log(dailyData);
    fetchAPI();

    // We add an empty array so that useEffect only runs once each time it's called
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Infected',
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  console.log(confirmed, recovered, deaths);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
