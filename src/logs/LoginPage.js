import './style.css';

import { useState } from 'react';
import { LoginApi } from '../services/Api';
import { storeUserData } from '../services/Storage'
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function LoginPage() {

    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);

    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        console.log(inputs);
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;

        if (inputs.email == "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password == "") {
            errors.password.required = true;
            hasError = true;
        }

        if (!hasError) {
            setLoading(true)
            //sending login api request
            LoginApi(inputs).then((response) => {
                storeUserData(response.data.idToken);
            }).catch((err) => {
                if (err.code = "ERR_BAD_REQUEST") {
                    setErrors({ ...errors, custom_error: "Invalid Credentials." })
                }

            }).finally(() => {
                setLoading(false)
            })
        }
        setErrors({ ...errors });

    }

    if (isAuthenticated()) {
        //redirect user to dashboard
        return <Navigate to="/" />
    }


    return (
        <div>
            <NavBar />

            <div className='body'>
                {/* <div className="main" > */}
                    {/* <div className="form "> */}

                        <div class="background">
                            <div class="shape"></div>
                            <div class="shape"></div>
                        </div>
                        <form onSubmit={handleSubmit} className="formlogin" action="" height="560px">
                            <h3>Login</h3>
                            <div className="inputs">
                                <label htmlFor="exampleInputEmail1" className="label">Email</label>
                                <input type="email" className="input_box" onChange={handleInput} name="email" id="" placeholder="Email" />
                                {errors.email.required ?
                                    (<span className="error" >
                                        Email is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="inputs">
                                <label htmlFor="exampleInputPassword1" className="label">Password</label>
                                <input className="input_box" type="password" onChange={handleInput} name="password" placeholder="password" id="" />
                                {errors.password.required ?
                                    (<span className="error" >
                                        Password is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="inputs in">
                                {loading ?
                                    (<div className="data">
                                        <div className="spinner-border text-primary " role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>) : null
                                }
                                <span className="error" >
                                    {errors.custom_error ?
                                        (<p>{errors.custom_error}</p>)
                                        : null
                                    }
                                </span>
                                 <input type="submit" className="button" disabled={loading} value="Login" />
                            </div>
                            <div className="last">
                                Create new account ? Please <Link to="/register" className='bu'>Register</Link>
                            </div>
                        </form>

                    {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    )
}