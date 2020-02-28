import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { useHistory } from "react-router-dom"

const Login = () => {
    const [ login, setLogin ] = useState({
        username: "",
        password: ""
    })

    const history = useHistory();

    const handleChange = e => {
        e.preventDefault();
        setLogin({
            ...login, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post("login", login)
            .then(res => {
                console.log(res)
                window.localStorage.setItem('token', res.data.payload)
                history.push("/bubbles")
            })
            .catch(err => {
                console.log(err)
            })
    }

  return (
    <div>
      <h1>Welcome To the Bubble Show!</h1>
      <h2>Please Log in</h2>
      <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text"
                    name="username"
                    label="username"
                    value={login.username}
                    onChange={handleChange}
                    className="input"
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="text"
                    name="password"
                    label="password"
                    value={login.password}
                    onChange={handleChange}
                    className="input"
                />
                <button>Submit</button>
            </form>
    </div>
  );
};

export default Login;
