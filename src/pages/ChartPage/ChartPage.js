import React from 'react'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './LineChart'
import "./ChartPage.css"
import TablePage from './TablePage'
import { useEffect, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import NavBar from '../../components/NavBar'
import { UserDetailsApi } from "../../services/Api"
import { logout, isAuthenticated } from "../../services/Auth"
import FootBar from "../../components/FootBar"
const ChartPage = () => {
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
  const logoutUser = () => {
    logout();
    navigate('/login')
  }
  if (!isAuthenticated()) {
    //redirect user to dashboard
    return <Navigate to="/login" />
  }
  return (
    <div>
      <NavBar logoutUser={logoutUser} />
      <div class="main">
        <h2>Watch Top 10 Crypto Status</h2>
        <div class="flex-container">
          <div class="flexx"><div style={{ width: 450 }}><LineChart /></div></div>
          <div class="flexxx"><div style={{ width: 450 }}><PieChart /></div></div>
        </div>
        <div class="tabl"><TablePage /></div> 

      </div>
      <FootBar/>
      </div>
  )
}

export default ChartPage
