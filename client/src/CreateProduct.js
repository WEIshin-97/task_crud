import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";


export default function CreateProduct() {

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ validation, setValidation ] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await api.post('/products', 
                { 
                    name, 
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            // console.log(res.data);
            alert(res.data.message);
            navigate('/');
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
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Product:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={name} 
                        onChange={e=>setName(e.target.value)}
                        onMouseDown={()=>setValidation(true)}
                    />
                    {name.length === 0 && validation && <span className="errorMsg">Please Enter Product Name</span>}

                    <label htmlFor="description">Description:</label>
                    <input 
                        type="text" 
                        id="description" 
                        name="description" 
                        required 
                        value={description} 
                        onChange={e=>setDescription(e.target.value)}
                        onMouseDown={()=>setValidation(true)}
                    />
                    {description.length === 0 && validation && <span className="errorMsg">Please Enter Description</span>}

                    <button className="btn btn-primary">Create</button>
                    <Link to="/" className="btn btn-danger">Back</Link>
                </form>
            </div>
        </div>
    )
}