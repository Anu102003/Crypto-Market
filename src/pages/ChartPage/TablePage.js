import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import TableCard from './TableCard';
import "./ChartPage.css";
export default function TablePage() {
  //current
  const [cryptos, setCryptos] = useState([]);
  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);
  console.log("current")
  console.log(cryptos)
  //top
  const [crypt, setCrypt] = useState([]);
  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    axios.get(url).then((response) => {
      setCrypt(response.data);
    });
  }, []);
  console.log("top")
  console.log(crypt)
  return (
    <div>
        <div class="top">
          <table>
            <thead >
              <tr>
                <td>Name</td>
                <td>Rank</td>
                <td>Price</td>
              </tr>
            </thead>
          </table>
          {crypt.map((data) => (
            <TableCard{...data} />)
          )}  </div>
      {/* <div class="flez">
      <h2>Recent trending</h2>
      <div class="current">
      <table >
        <thead>
          <tr>
            <td>Name</td>
            <td>Rank</td>
            <td>Price</td>
          </tr>
        </thead>
      </table>
      {cryptos.map((data) => (
        <TableCard{...data} />)
      )}</div></div> */}
    </div>
  )
}
