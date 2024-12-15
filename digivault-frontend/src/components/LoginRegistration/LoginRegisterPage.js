import React, { useState } from "react";
import axios from "axios";
import "./LoginRegisterPage.css";
import {useNavigate} from "react-router-dom"; // Import the CSS file

const LoginRegisterPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Select the endpoint based on the isLogin state
        const endpoint = isLogin ? "/api/login" : "/api/register";

        const newUser = {
            username: username,
            password: password,
            cryptoWallets: [],
            lastUpdated: Date.now(),
        };

        try {
            const response = await axios.post(endpoint, newUser);
            if(response.data){
                localStorage.setItem('token', response.data);
                localStorage.setItem('username', username);
                if(isLogin){
                    navigate('/');
                }else {
                    navigate('/login');
                    window.location.reload();
                }
            }
        } catch (error) {
            alert(error.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="login-register-container">
            <h1 className="text-3xl m-4">{isLogin ? "Login" : "Register"}</h1>
            <form onSubmit={handleSubmit} className="login-register-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="login-register-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-register-input"
                />
                <button type="submit" className="login-register-button">
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>
            <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                    onClick={() => setIsLogin(!isLogin)} // Toggle between Login and Register
                    className="login-register-toggle-button"
                >
                    {isLogin ? "Register here" : "Login here"}
                </button>
            </p>
        </div>
    );
};

export default LoginRegisterPage;
