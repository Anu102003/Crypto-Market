import { Link } from "react-router-dom"
import { isAuthenticated } from "../services/Auth"
import './style.css';
export default function NavBar(props) {


    return (<nav className="navbar navbar-expand-md navbar-light bg-white" >
        <a class="logo" href="#"><img src="./cm.png" height="60px" width="165px"/></a>
        
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto"  >
                {isAuthenticated() ? <li className="nav-item" id="nav-item"><Link className="nav-link" to="/">Home</Link></li> : null}
                {!isAuthenticated() ? <li className="nav-item" id="nav-item"><Link className="nav-link" to="/">Home</Link></li> : null}
                {!isAuthenticated() ? <li className="nav-item" id="nav-items"><Link className="nav-link" to="/register">Register</Link></li> : null}
                {!isAuthenticated()? <li id="nav-items"><Link className="nav-link"  to="/login" >Login</Link></li> : null}
                {isAuthenticated() ? <li className="nav-item" id="nav-items"><Link className="nav-link" to="/chart" >Trending</Link></li> : null}
                {isAuthenticated() ? <li className="nav-item" id="nav-items"><Link className="nav-link" to="/details" >Details</Link></li> : null}
                {isAuthenticated() ? <li className="nav-item" id="nav-items"><Link className="nav-link" to="/search" >Search</Link></li> : null}
                {isAuthenticated() ? <li className="nav-item" id="nav-items"><Link className="nav-link" to="/news" >News</Link></li> : null}
                {isAuthenticated() ? <li id="nav-itemss"><a className="nav-link nav-item"  onClick={props.logoutUser} style={{ cursor: "pointer" }} >Logout</a></li> : null}
            </ul>
        </div>
    </nav>)
}