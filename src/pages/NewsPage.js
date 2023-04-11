import "./NewsPage.css"
import { useEffect, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import NavBar from "../components/NavBar"
import { UserDetailsApi } from "../services/Api"
import { logout, isAuthenticated } from "../services/Auth"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';


export default function DashboardPage() {
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
  //Api
  // const [news, setNews] = useState([]);
   const [newss, setNewss] = useState([]);
  //1st api
  // useEffect(() => {
  //   const loadNews = async () => {
  //     const response = await axios.get(
  //       "https://newsdata.io/api/1/news?apikey=pub_159708aa1ca04fb446ca2a7fdb8e9ba27f113&q=cryptocurrency "
  //     );
  //     setNews(response.data.results);
  //   };
  //   loadNews();
  // }, []);
  //2nd api
  useEffect(() => {
    const loadNewss = async () => {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=bitcoins&from=2023-02-07&sortBy=publishedAt&apiKey=06e4cf665f8f4b27af29e220fa35d39f"
      );
      setNewss(response.data.articles);
    };
    loadNewss();
  }, []);



  const logoutUser = () => {
    logout();
    navigate('/login')
  }
  if (!isAuthenticated()) {
    //redirect user to dashboard
    return <Navigate to="/login" />
  }

  return (
    <div className="App">
      <NavBar logoutUser={logoutUser} />
<div class="news">
  <div>
       {newss &&
        newss.map((items, indexx) => {
          return (
            <div class="mainwrap"><div class="wrapper">
            <div key={indexx} class="flexwrap">
        <div className="contentwrapper">
        <img alt="Image not included" src={items.urlToImage} className="img"/>
          <h5 class="headwrap"> {items.title}</h5>
        <p class="parawrap">{items.content}</p><p>{`(${items.publishedAt})`}</p></div>
        
        <a class="awrap" href={items.url} target="_blank" rel="noopener noreferrer">
                <button class="butwrap">
                  Read More
                </button>
              </a>
        
      </div></div></div>
          );
        })} </div>

        {/* <div>
        {news &&
        news.map((items, indexx) => {
          return (
            <div key={indexx} class="">
        <div className="">
          <h5 class=""> {items.title}</h5>
        <p class="">{items.content}</p><p>{`(${items.pubDate})`}</p></div>
        
        <a class="" href={items.link} target="_blank" rel="noopener noreferrer">
                <button class="">
                  Read More
                </button>
              </a>
        
      </div>
          );
        })} </div> */}


   </div> </div>
  )
}

