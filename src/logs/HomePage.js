import NavBar from '../components/NavBar';
import FootBar from "../components/FootBar"
import "./HomePage.css";
import { useEffect, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { UserDetailsApi } from "../services/Api"
import { logout, isAuthenticated } from "../services/Auth"
import { Link } from "react-router-dom"

export default function HomePage() {
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


	return (
		<div>
			<NavBar logoutUser={logoutUser} />
			<body id="body">

				<section class="hero-area">
					<div class="container">
						<div class="row">

							<div class="col-lg-6">
								<div class="block">
									<h2>Know about Crypto with trust</h2>
									<p>The easiest place to know about the live prices of cryptocurrency. Learn different digital assets within minutes.</p>
									<ul class="list-inline">
										<li class="list-inline-item">
											<button type="button" class="btn btn-secondary"><Link to="/login" className='link'>Get started</Link></button>

										</li>
									</ul>
								</div>
							</div>
							{/* <div class="col-lg-6 align-self-center mb-4 mb-lg-0">
					 <img class="img-fluid rounded" src="./images/slider-bg-2.jpg" alt=""/> 
			</div> */}
						</div>
					</div>
				</section>






				<section class="services " id="services">
					<div class="container">
						<div class="row">
							{/* <h1 class="rowh">Services</h1> */}
							<div class="row" id="roww">
								<div class="col">
									<div class="title text-center">
										<h6></h6>
										<h2>Services</h2>
										<span class="border"><hr></hr></span>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12" >
								<div class="service-block  text-center">
									<div class="service-icon text-center">
										<img src="./images/bitcoin-safety-shield.png" alt="" />
									</div>
									<h4>Easy </h4>
									<p>Simple to access and get the informations easily</p>
								</div>
							</div>
							<div class="col-md-4 col-sm-6 col-xs-12" >
								<div class="service-block color-bg text-center">
									<div class="service-icon text-center">
										<img src="images/bitcoin-qr.png" alt="" />
									</div>
									<h4>Fast Informations</h4>
									<p>Track your coins live and get quick Informations</p>
								</div>
							</div>
							 <div class="col-md-4 col-sm-6 col-xs-12" >
								<div class="service-block text-center">
									<div class="service-icon text-center">
										<img src="images/bitcoin-exchange.png" alt="" />
									</div>
									<h4>Instant Exchange</h4>
									<p>Supports a variety of the most popular digital currencies and exchanges</p>
								</div>
							</div>
{/*
							<div class="col-md-4 col-sm-6 col-xs-12 mx-auto"  >
								<div class="service-block color-bg text-center">
									<div class="service-icon text-center">
										<img src="images/bitcoin-network.png" alt="" />
									</div>
									<h4>Strong Network</h4>
									<p>Send and receive cryptocurrencies anytime, anywhere and stay connected with anyone</p>
								</div>
							</div>
							

							<div class="col-md-4 col-sm-6 col-xs-12" >
								<div class="service-block color-bg text-center">
									<div class="service-icon text-center">
										<img src="images/003-bitcoin-network-symbol.png" alt="" />
									</div>
									<h4>Miners</h4>
									<p>Connect your miners and earn Bitcoin for every share</p>
								</div>
							</div> 

							<div class="col-md-4 col-sm-6 col-xs-12" >
								<div class="service-block color-bg text-center">
									<div class="service-icon text-center">
										<img src="images/bitcoin-safety-shield.png" alt="" />
									</div>
									<h4>Payments</h4>
									<p>Buy and sell popular digital currencies, keep track of them in the one place.</p>
								</div>
							</div>*/}
						</div>
					</div>
				</section>




				<section class="service-2  bg-gray">
					<div class="container">
						<div class="row">
							<div class="col">
								<div class="title text-center">
									<h6>Bitcoin flow</h6>
									<h2>How It Works</h2>
									<span class="border"><hr></hr></span>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4 p-0">
								<div class="service-item text-center">
									<span class="count">1.</span>
									<h4>Sign Up</h4>
									<p>To get started, go to sign up</p>
								</div>
							</div>
							<div class="col-md-4 p-0">
								<div class="service-item text-center">
									<span class="count">2.</span>
									<h4>Connect</h4>
									<p>Connect with us for more informations</p>
								</div>
							</div>
							<div class="col-md-4 p-0">
								<div class="service-item text-center">
									<span class="count">3.</span>
									<h4> Learn Digital Currency</h4>
									<p>Start learning digital currency and earn more</p>
								</div>
							</div>
						</div>
					</div>
				</section>



				<section class="blog" id="blog">
					<div class="container">
						<div class="row">
							<div class="col">
								<div class="title text-center">
									<h6>Our untold story</h6>
									<h2>Bitcoin Knowledge Base.</h2>
									<span class="border"><hr></hr></span>
								</div>
							</div>
						</div>
						<div class="row">
							<article class="col-12 col-md-6" >
								<div class="post-item">
									<div class="post-thumb">
										<img class="img-fluid shadow rounded" src="./images/post-1.jpg" alt="Generic placeholder image" />
									</div>
									<div class="post-title">
										<h3 class="mt-0">About Cryptocurrency</h3>
									</div>
									<div class="post-content">
										<p>A cryptocurrency is a digital currency, which is an alternative form of payment created using encryption algorithms. The use of encryption technologies means that cryptocurrencies function both as a currency and as a virtual accounting system. To use cryptocurrencies, you need a cryptocurrency wallet. </p>
									</div>
									<ul class="list-inline">
										<li class="list-inline-item">
											<a data-scroll href="https://www.kaspersky.com/resource-center/definitions/what-is-cryptocurrency" class="btn" target="_blank">Read more</a>
										</li>
									</ul>
								</div>
							</article>

							<article class="col-12 col-md-6" >
								<div class="post-item">
									<div class="post-thumb">
										<img class="img-fluid shadow rounded" src="./images/post-2.jpg" alt="Generic placeholder image" />
									</div>
									<div class="post-title">
										<h3 class="mt-0">Digital Trading</h3>
									</div>
									<div class="post-content">
										<p>Digital trade is not just about buying and selling goods and services online, it is also the transmission of information and data across borders. It relies on the use of digital technologies to facilitate trade and improve productivity.It provides more opportunities for businesses to reach more customers across the globe as well as further grow our economy.</p>
									</div>
									<ul class="list-inline">
										<li class="list-inline-item">
											<a data-scroll href="https://digitaltradetracker.org/what-is-digital-trade/" class="btn" target="_blank">Read more</a>
										</li>
									</ul>
								</div>
							</article>

						</div>
					</div>
				</section>





				<FootBar />




			</body>
		</div>
	)
}
