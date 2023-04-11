import RegisterPage from "./logs/RegisterPage";
import LoginPage from "./logs/LoginPage";
// import DashboardPage from "./pages/Dashboard";
import HomePage from "./logs/HomePage";
import ChartPage from "./pages/ChartPage/ChartPage";
import NewsPage from "./pages/NewsPage";
import { Route, Routes } from 'react-router-dom';
import CoinPage from "./pages/CoinPage";


import React,{useState,useEffect} from "react";
import axios from 'axios'
import Coin from "./routes/Coin";
import Coins from "./details/Coins";
 function App() {
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=210&page=1&sparkline=false'

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      console.log(response.data[0])
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <div className="App">
     
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          <Route path="/details" element={<CoinPage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/news/" element={<NewsPage />} />
          <Route path="/" element={<HomePage />} />

          <Route path='/search' element={<Coins coins={coins} />} />
          <Route path='/coin' element={<Coin />}>
            <Route path=':coinId' element={<Coin />} />
          </Route>
        </Routes> 


    


    </div>
  );
}

export default App;
