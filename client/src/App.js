import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={<ProtectedRoute><Navbar/></ProtectedRoute>}>
          <Route index element={<Dashboard/>}></Route>
          <Route path="/create" element={<CreateProduct/>}></Route>
          <Route path="/edit/:id" element={<EditProduct/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

