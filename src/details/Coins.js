import React from 'react'
import CoinItem from './CoinItem'
import Coin from '../routes/Coin'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Coins.css'

import { useEffect, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { UserDetailsApi } from "../services/Api"
import { logout, isAuthenticated } from "../services/Auth"

const Coins = (props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({ name: "", email: "", localId: "" })

    useEffect(() => {
        if (isAuthenticated()) {
            UserDetailsApi().then((response) => {

                setUser({
                    name: response.data.users[0].displayName,
                    email: response.data.users[0].email,
                    localId: response.data.users[0].localId,
                })
            })
        }
    }, [])

    const [search, setSearch] = useState('');
    const handleSearch = (e) => setSearch(e.target.value);
    const [searchprice, setPrice] = useState('');
    const searchPrice = (e) => setPrice(e.target.value);
    const [searchstatus, setStatus] = useState('');
    const searchStatus = (e) => setStatus(e.target.value);

    const logoutUser = () => {
        logout();
        navigate('/login')
    }

    if (!isAuthenticated()) {
        //redirect user to dashboard
        return <Navigate to="/login" />
    }
    return (<div>
        <NavBar logoutUser={logoutUser} />
        <div className='container'>
           
            <div className='header  text-center '>
                <h2 >Cryptocurrency</h2>
                <div className='d-flex justify-content-center m-3 '>
                    <div className='row justify-content-end '>
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4 mt-4 mb-'>
                            <input
                                class="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearch} />
                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4 mt-4 mb-'>
                            <input
                                class="form-control me-2"
                                type="search"
                                placeholder="Price"
                                aria-label="Search"
                                onChange={searchPrice} />
                        </div>
                    </div>
                    <div className='row justify-content-start '>
                        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-4 mt-4 mb-'>
                            <input
                                class="form-control me-2"
                                type="search"
                                placeholder="Status"
                                aria-label="Search"
                                onChange={searchStatus} />
                        </div>
                    </div></div>

            </div>
            <div>
                <div className='heading'>
                    <p>#</p>
                    <p className='coin-name'>Coin</p>
                    <p>Price</p>
                    <p>Status ( 24h )</p>
                    <p className='hide-mobile'>Volume</p>
                    <p className='hide-mobile'>Mkt Cap</p>
                </div>

                {props.coins
                    .filter((currency) =>
                        currency.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .filter((currency) =>
                        currency.current_price.toString().includes(searchprice)
                    )
                    .filter((currency) =>
                        currency.price_change_percentage_24h.toFixed(2).toString().includes(searchstatus)
                    ).map(coins => {
                        return (
                            <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id} className="data">
                                <CoinItem coins={coins} key={coins.id} />
                            </Link>

                        )
                    })}

            </div>
        </div></div>
    )
}

export default Coins

