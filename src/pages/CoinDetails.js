import React from 'react'
import "./coins.css"
import { useEffect, useState } from 'react';
import Calendar from "react-calendar";
import CurrencyOption from '../components/CurrencyOption'
import CurrencyOptions from '../components/CurrencyOptions'

const CoinDetails = (props) => {
  //calendar
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  //converter
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [currencyNames, setCurrencyNames] = useState({})
  useEffect(() => {
    fetch(`https://api.frankfurter.app/currencies`).then(res => res.json()).then(data => {
      setCurrencyOptions(Object.keys(data))
      setFromCurrency(Object.keys(data)[29])
      setToCurrency(Object.keys(data)[14])
      setCurrencyNames(data)
    })
  }, [])
  useEffect(() => {
    if (parseInt(fromAmount) === 0) {
      setToAmount(0)
    } else if (fromAmount === '') {
      setToAmount('')
    } else if (fromCurrency === toCurrency) {
      setToAmount(fromAmount)
    } else {
      fetch(`https://api.frankfurter.app/latest?amount=${fromAmount}&from=${fromCurrency}&to=${toCurrency}`).then(res => res.json()).then(data => setToAmount(Object.values(data.rates)[0]))
    }
  }, [fromCurrency, toCurrency, fromAmount, toAmount])

  //
  const [currencyOption, setCurrencyOption] = useState([])
  const [fromAmountt, setFromAmountt] = useState(0)
  const [toAmountt, setToAmountt] = useState(0)
  const [fromCurrencyy, setFromCurrencyy] = useState('')
  const [toCurrencyy, setToCurrencyy] = useState('')
  const [currencyName, setCurrencyName] = useState({})
  useEffect(() => {
    fetch(`https://api.frankfurter.app/currencies`).then(res => res.json()).then(data => {
      setCurrencyOption(Object.keys(data))
      setFromCurrencyy(Object.keys(data)[0])
      setToCurrencyy(Object.keys(data)[0])
      setCurrencyName(data)
    })
  }, [])
  useEffect(() => {
    if (parseInt(fromAmountt) === 0) {
      setToAmountt(0)
    } else if (fromAmountt === '') {
      setToAmount('')
    } else if (fromCurrencyy === toCurrencyy) {
      setToAmountt(fromAmountt)
    } else {
      fetch(`https://api.frankfurter.app/latest?amount=${fromAmountt}&from=${fromCurrencyy}&to=${toCurrencyy}`).then(res => res.json()).then(data => setToAmountt(Object.values(data.rates)[0]))
    }
  }, [fromCurrencyy, toCurrencyy, fromAmountt, toAmountt])

  return (
    <div>

      <div class="mainwrapp">

        <div class="child">
          <div className='topwrap'>
            <img class="imgwrap" src={props.image} alt="default" />
            <div class="hwrap">
              <h2 class="heading">{props.name}</h2>
              <h5 class="symm">{`(${props.symbol})`}</h5></div>
          </div>
          <div class="table-wrapper">
            <table class="fl-table">
              <tbody>
                <tr>
                  <td>Rank</td>
                  <td>{`# ${props.market_cap_rank}`}</td>
                </tr>
                <tr>
                  <td>Current Price (in $)</td>
                  <td>{`$ ${props.current_price}`}</td>
                </tr>
                <tr>
                  <td>Convert ($) to</td>
                  <td>
                    <CurrencyOptions prop="To currency" toCurrency={toCurrency} currencyOptions={currencyOptions} updateCurrency={e => setToCurrency(e.target.value)} />
                    <button type="number" autoComplete="off" value={props.current_price} className="butcon" onClick={e => setFromAmount(e.target.value)}>convert</button><br></br>
                    {fromAmount} {fromCurrency} = {toAmount} {toCurrency}
                  </td>
                </tr>

                <tr>
                  <td>Buy at Binace</td>
                  <td><button className="buy"><a href='https://www.binance.com/en-IN/markets?utm_source=gadgets360&utm_medium=gadgets360&utm_campaign=gadgets360&utm_term=gadgets360' target="_blank" className="bu">Buy</a></button></td>
                </tr>
                <tr>
                  <td>Buy at CoinBase</td>
                  <td><button className="buy"><a href='https://www.coinbase.com/' target="_blank" className="bu">Buy</a></button></td>
                </tr>
                <tr>
                  <td>Price Change % (24hr)</td>
                  <td><span class={`${props.price_change_percentage_24h < 0 ? 'text-danger' : 'text-success'}`}>

                    {props.price_change_percentage_24h ? <p>$ {props.price_change_percentage_24h.toFixed(2)} %</p> : <p>-</p>}
                  </span></td>
                </tr>
                <tr>
                  <td>Market Cap Change % (24hr)</td>
                  <td><span class={`${props.market_cap_change_percentage_24h < 0 ? 'text-danger' : 'text-success'}`}>
                    {props.market_cap_change_percentage_24h ? <p>$ {props.market_cap_change_percentage_24h.toFixed(2)} %</p> : <p>-</p>}
                  </span></td>
                </tr>
                <tr>
                  <td>Market Cap</td>
                  <td>
                    {props.market_cap ? <p>$ {props.market_cap.toLocaleString()}</p> : <p>-</p>}
                  </td>
                </tr>
                <tr>
                  <td>Fully Diluted Value</td>
                  <td>
                    {props.fully_diluted_valuation ? <p>{props.fully_diluted_valuation.toLocaleString()}</p> : <p>-</p>}
                  </td>
                </tr>
                <tr>
                  <td>Total Volume</td>
                  <td>
                    {props.total_volume ? <p>{props.total_volume.toLocaleString()}</p> : <p>-</p>}
                  </td>
                </tr>
                <tr>
                  <td>Circulating Supply</td>
                  <td>
                    {props.circulating_supply ? <p>{props.circulating_supply.toLocaleString()}</p> : <p>-</p>}
                  </td>
                </tr>
                <tr>
                  <td>Total Supply</td>
                  <td>
                    {props.total_supply ? <p>{props.total_supply.toLocaleString()}</p> : <p>-</p>}
                  </td>
                </tr>
                <tr>
                  <td>High (24hr) / Low (24hr)</td>
                  <td>
                    {props.high_24h ? <p>$ {props.high_24h.toFixed(4)} / $ {props.low_24h.toFixed(4)}</p> : <p>-</p>}

                  </td>
                </tr>
                <tr>
                  <td>Last Updated</td>
                  <td>{props.last_updated}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='aside'>
          <div className='calendar'>
            <Calendar onChange={onChange} value={date} />
          </div>

          {/* <div className="converter">
            <h3>Converter</h3>
            <div className="container">
              <div className="item1">
                <div className="opt-1">
                  <h5>From Currency : </h5>
                  <CurrencyOptions prop="From currency" fromCurrency={fromCurrency} currencyOptions={currencyOptions} updateCurrency={e => setFromCurrency(e.target.value)} />
                </div>
                <div className="opt-2">
                  <h5>To Currency : </h5>
                  <CurrencyOptions prop="To currency" toCurrency={toCurrency} currencyOptions={currencyOptions} updateCurrency={e => setToCurrency(e.target.value)} />
                </div>
              </div>
              <div className="item2">
                <h2>Enter Amount in {currencyNames[`${fromCurrency}`]} : </h2>
                <h2>Output in {currencyNames[`${toCurrency}`]} : </h2>
              </div>
              <div className="item3">
                <button type="number" autoComplete="off" value={props.current_price} className="input" onClick={e => setFromAmount(e.target.value)}>Click to convert</button>

                <h3>=</h3>
                <input className="output" disabled value={toAmount} type="text" />
              </div>
              <div className="item4">
                <h2>{fromAmount} {fromCurrency} = {toAmount} {toCurrency}</h2>
              </div>
            </div>
          </div> */}


          <div className="calculator">
            <h3>Exchange Calculator</h3>
            <div className="item1">
              <div className="opt-1">
                <h5>From Currency </h5>
                <CurrencyOption prop="From currency" fromCurrencyy={fromCurrencyy} currencyOption={currencyOption} updateCurrencyy={e => setFromCurrencyy(e.target.value)} />
              </div>
              <div className="opt-1">
                <h5>To Currency </h5>
                <CurrencyOption prop="To currency" toCurrencyy={toCurrencyy} currencyOption={currencyOption} updateCurrencyy={e => setToCurrencyy(e.target.value)} className="cur" />
              </div>
            </div>
            <div className="item2">
              <h6>Enter Amount in ({currencyName[`${fromCurrencyy}`]}) : </h6>
              <div className="in">
                <input type="number" autoComplete="off" value={fromAmountt} className="input" onChange={e => setFromAmountt(e.target.value)} />
              </div>

              <h6>Result in ({currencyName[`${toCurrencyy}`]}) : </h6>
              <div className="in">
                <input className="output" disabled value={toAmountt} type="text" /></div>
            </div>
            <div className="item4">
              <h5>{fromAmountt} {fromCurrencyy} = {toAmountt} {toCurrencyy}</h5>
            </div>


          </div>
        </div>


      </div>

    </div>
  )
}

export default CoinDetails
