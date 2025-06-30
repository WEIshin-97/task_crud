import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";

export default function Login() {
 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/user/login", { username, password });
            const token = res.data.token;
      
            // Save token locally
            localStorage.setItem("token", token);
            // Set default auth header for future requests
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
            navigate("/");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert(err.message);
            }
            console.error("Invalid credentials: ", err);
        }
    }
    

    return (
        <div className="container">
            <div className="subcontainer">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Name:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required 
                        value={username} 
                        onChange={e=>setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}
                    />

                    <button className="btn btn-primary">Login</button>
                    <Link to="/register" className="btn btn-danger">Register</Link>
                </form>
            </div>
        </div>
    )
}