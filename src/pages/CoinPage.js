
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import CoinDetails from './CoinDetails';
import "./coins.css"
import { useNavigate, Navigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import FootBar from "../components/FootBar"
import { UserDetailsApi } from "../services/Api"
import { logout,isAuthenticated } from "../services/Auth"
export default function CoinPage() {
  



  const navigate = useNavigate();

  const [user,setUser] = useState({name:"",email:"",localId:""})

  useEffect(()=>{
      if(isAuthenticated()){
          UserDetailsApi().then((response)=>{
             
              setUser({
                  name:response.data.users[0].displayName,
                  email:response.data.users[0].email,
                  localId:response.data.users[0].localId,
              })
          })
      }
  },[])
//api
  const [cryptos, setCryptos] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=210&page=1&sparkline=false"
    axios.get(url).then((response) => {
      setCryptos(response.data);
    });
  }, []);

  //logout
  const logoutUser = ()=>{
    logout();
    navigate('/login')
}

if (!isAuthenticated()) {
    //redirect user to dashboard
    return <Navigate to="/login" />
}

  return (<div>
    <NavBar logoutUser={logoutUser} />


    <div className='whole'>
   <select className='sel' onChange={(e) => {
      const c = cryptos?.find((x) => x.id === e.target.value);
      // console.log(c);
      setSelected(c);
    }}
     defaultValue='default'><option  value='default'>Choose an option</option>
      {cryptos && cryptos.map((data) => {
        return (<>
          <option key={data.id} value={data.id}><p>{data.name}</p></option>
        </>
        )
      })}
    </select></div>
    <hr class="hrr"></hr>
    {selected==null? null:<CoinDetails {...selected} />} 
    <FootBar/>
  </div>
  )
}


