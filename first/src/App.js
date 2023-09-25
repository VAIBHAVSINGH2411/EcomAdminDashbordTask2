import AdminDashbord from "./AdminDashbord";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetails from "./ItemDetails";
import { useState, useEffect } from "react";
import AddProductForm from "./AddProductForm";
import EditProduct from "./EditProduct";
function App() {
  const [apidata, setApidata] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setApidata(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashbord />} />
        <Route path="/view/:id" element={<ItemDetails apidata={apidata} />} />

        <Route path="addproduct" element={<AddProductForm />} />

        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/*" element={<h1 className="error404page">OOPS 404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;