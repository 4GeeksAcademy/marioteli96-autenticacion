import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = (e) => {
        e.preventDefault();
        actions.logIn(email, password, navigate);
    };
    return (
        <div className="text-center mt-5">
            <h1></h1>
            <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <h2>Log In</h2>
                    <form onSubmit={handleLogIn}>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="form-control"
                            style={{ maxWidth: '300px', margin: '0 auto 10px' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="form-control"
                            style={{ maxWidth: '300px', margin: '0 auto 10px' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                         <button type= "submit" className="btn btn-primary" style={{ margin: '5px' }}>Log In</button>
                    </form>
                   
                </div>
            </div>

        </div>
    )
}
