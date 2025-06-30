import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "./api";

export default function EditProduct() {

    const { id } = useParams();
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ validation, setValidation ] = useState(false);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const displayProduct = async (id) => {
            try {
                const res = await api.get(`/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                // console.log(res.data);
                setName(res.data.name);
                setDescription(res.data.description);
            }catch(err){

                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err.message);
                }
                console.error("Error: ", err);
                navigate("/");
            }
        };
        
        displayProduct(id);
    }, [navigate]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await api.put(`/products/${id}`, 
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

            // console.log('edit product');
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
                <h2>Update Product</h2>
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

                    <button className="btn btn-primary">Update</button>
                    <Link to="/" className="btn btn-danger">Back</Link>
                </form>
            </div>
        </div>
    )
}