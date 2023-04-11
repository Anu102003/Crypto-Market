import { useState } from 'react'
import { RegisterApi } from '../services/Api';
import { isAuthenticated } from '../services/Auth';
import { storeUserData } from '../services/Storage';
import './style.css'
import { Link, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function RegisterPage() {
    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        name: { required: false },
        custom_error: null
    };
    const [errors, setErrors] = useState(initialStateErrors);

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;
        if (inputs.name == "") {
            errors.name.required = true;
            hasError = true;
        }
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
            //sending register api request
            RegisterApi(inputs).then((response) => {
                storeUserData(response.data.idToken);
            }).catch((err) => {
                if (err.response.data.error.message == "EMAIL_EXISTS") {
                    setErrors({ ...errors, custom_error: "Already this email has been registered!" })
                } else if (String(err.response.data.error.message).includes('WEAK_PASSWORD')) {
                    setErrors({ ...errors, custom_error: "Password should be at least 6 characters!" })
                }

            }).finally(() => {
                setLoading(false)
            })
        }
        console.log(initialStateErrors, errors);
        setErrors(errors);
    }

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    })

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    if (isAuthenticated()) {
        //redirect user to dashboard
        return <Navigate to="/" />
    }

    return (
        <div >
            <NavBar />
            <div className='body'>
                {/* <div className="main" heigth="500px">
                    <div className="form"> */}

                        <div class="background">
                            <div class="shape"></div>
                            <div class="shapee"></div>
                        </div>
                        <form onSubmit={handleSubmit} className="formregister" action="" >
                        <h3>Register</h3>
                            <div className="inputs">
                                <label htmlFor="exampleInputEmail1" className="label">Name</label>

                                <input type="text" className="input_box" onChange={handleInput} name="name" id="" /><br></br>
                                {errors.name.required ?
                                    (<span className="error" >
                                        Name is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="inputs">
                                <label htmlFor="exampleInputEmail1" className="label">Email</label>

                                <input type="text" className="input_box" onChange={handleInput} name="email" id="" /><br></br>
                                {errors.email.required ?
                                    (<span className="error" >
                                        Email is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="inputs">
                                <label htmlFor="exampleInputPassword1" className="label">Password</label>
                                <input className="input_box" type="password" onChange={handleInput} name="password" id="" /><br></br>
                                {errors.password.required ?
                                    (<span className="error" >
                                        Password is required.
                                    </span>) : null
                                }
                            </div>
                            <div className="inputs in">

                                <span className="error" >
                                    {errors.custom_error ?
                                        (<p>{errors.custom_error}</p>)
                                        : null
                                    }
                                </span>
                                {loading ?
                                    (<div className="data">
                                        <div className="spinner-border text-primary " role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>) : null
                                }

                                <input type="submit" className="button" disabled={loading} value="Register" />
                            </div>
                            <div className="last">
                                Already have account ? Please <Link to="/login" className='bu'>Login</Link>
                            </div>
                        </form>
                    {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    )
}