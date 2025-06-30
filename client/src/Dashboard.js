import { useEffect, useState } from "react"
import api from "./api"
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    const handleEdit = (id) => {
        navigate("/edit/" + id);
    }

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete?")){
            try {
                await api.delete(`/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Update product list without reloading
                setProducts((prev) => prev.filter((item) => item._id !== id));
                alert("Product data has been removed");
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err.message);
                }
                console.error("Error: ", err);
            }
        }
    }
 
    useEffect(() => {
        const fetchProduct = async () => {   
            try {
                const res = await api.get(`/products?page=${page}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(res.data);
                setProducts(res.data.data);
                setTotal(res.data.total);
        
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err.message);
                }
                console.error("Error: ", err);
                navigate("/login");
            }
        };
    
        fetchProduct();
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="container">
        <div className="subcontainer">
            <h2>Product Record</h2>
            <div className="table-container">
                <Link to="/create" className="btn btn-primary">Add New Product</Link>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>NAME</th>
                            <th>Description</th>
                            {user.role === 'admin' && <th>Created By</th>}
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    products.length === 0 ? (
                        <tr>
                            <td colSpan="4">No products found.</td>
                        </tr>
                        ) : (
                            products.map((item, index) => (
                                <tr key={item._id}>
                                  <td>{index + 1}</td>
                                  <td>{item.name}</td>
                                  <td>{item.description}</td>
                                  {user.role === 'admin' && <th>{item.createdBy.username}</th>}
                                  <td>
                                    <button className="btn btn-secondary" onClick={() => handleEdit(item._id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                  </td>
                                </tr>
                              ))
                        )}
                    </tbody>
                </table>
                <div style={{ marginTop: "20px" }}>
                    <button className="btn btn-primary" onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>Prev</button>
                    <span> Page {page} of {totalPages} </span>
                    <button className="btn btn-primary" onClick={() => setPage((prev) => prev + 1)} disabled={page === totalPages}>Next</button>
                </div>
            </div>
        </div>
    </div>
    )
}