
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  Chart as ChartJS,

  BarElement,

} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
);


const BarChart = () => {
  const [chart, setChart] = useState({})
  var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  var apiKey = "coinrankinga0719fb68a5be2ab221cd26ff552aaa153355bcc329c365f";


  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${apiKey}`,
          'Access-Control-Allow-Origin': "*"
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(json.data)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchCoins()
  }, [baseUrl, apiKey])


  console.log("ccccc");
  console.log("chart", chart);
  console.log("bbbb");
  console.log(chart?.coins?.map(x => x.name))
  var data = {
    labels: chart?.coins?.map(x => x.name),
    datasets: [{
      label: `${chart?.coins?.length} Coins Available`,
      data: chart?.coins?.map(x => Math.max(x.price)),
      backgroundColor: [
        '#F8B195',
        '#F67280',
        '#C06C84',
        '#6C5B7B',
        '#D5F3FF',
        "#66D3FA",
        '#3C99DC',
        '#3CARA3',
        '#0F5298'
      ],
      borderColor: [
        '#F8B195',
        '#F67280',
        '#C06C84',
        '#6C5B7B',
        '#D5F3FF',
        "#66D3FA",
        '#3C99DC',
        '#3CARA3',
        '#0F5298'
      ],
      borderWidth: 1
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Bar
        data={data}
        height={400}
        options={options}

      />
    </div>
  )
}

export default BarChart


