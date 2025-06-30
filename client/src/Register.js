import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";


export default function Register() {
 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await api.post("/user/register", { username, password });
            alert(res.data.message);
            navigate("/login");

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert(err.message);
            }
            console.error("Error: ", err);
        }
    }

    return (
        <div className="container">
            <div className="subcontainer">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required 
                        value={username} 
                        onChange={e=>setUsername(e.target.value)}
                        onMouseDown={()=>setValidation(true)}
                    />
                    {username.length === 0 && validation && <span className="errorMsg">Please Enter Username</span>}

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}
                        onMouseDown={()=>setValidation(true)}
                    />
                    {password.length === 0 && validation && <span className="errorMsg">Please Enter Password</span>}

                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="confirm_password" 
                        name="confirm_password" 
                        required 
                        value={confirmPassword} 
                        onChange={e=>setConfirmPassword(e.target.value)}
                        onMouseDown={()=>setValidation(true)}
                    />
                    {confirmPassword.length === 0 && validation && <span className="errorMsg">Please Enter Confirm Password</span>}

                    {password && confirmPassword && password !== confirmPassword && validation && (
                        <span className="errorMsg">Passwords do not match</span>
                    )}

                    <button className="btn btn-primary" style={{width: '100%', marginBottom: '20px'}}>Register</button>
                    <br></br>
                    Already have an account?
                    <Link to="/login" className="btn btn-danger">Login</Link>
                </form>
            </div>
        </div>
    )
}