import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }


    return (
        <div>
            <nav style={{ padding: "1rem", background: "#f0f0f0", display: "flex", justifyContent: "space-between"}}>
                <h2>Welcome to {user.role === 'admin' ? 'Admin' : 'User' } Dashboard , {user.username}</h2>
                <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
            </nav>
            <div className="main-content">
                <Outlet /> 
            </div>
        </div>
    )
}