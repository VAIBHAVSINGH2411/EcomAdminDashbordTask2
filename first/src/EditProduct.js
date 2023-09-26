


import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Input, Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import "./App.css";
function EditProduct() {
    const [showalert, setshowalert] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const editedProduct = location.state.editedProduct;
    console.log(editedProduct);

    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const [formData, setFormData] = useState({
        category: editedProduct.category,
        title: editedProduct.title,
        price: editedProduct.price,
        image: "",
        description: editedProduct.description,
        rating: { rate: 3, count: 130 }

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image") {
            getBase64(e.target.files[0]).then(file => {
                setFormData({ ...formData, [name]: file.split(",")[1] })
            })
            return
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:3000/products/${editedProduct.id}`, formData)
            .then((res) => {
                setshowalert(true);
                console.log(res.data);
                setTimeout(() => {
                    setshowalert(false);
                }, 3000);
            })
            .catch((error) => {
                alert(error);
            });
    }


    return (
        <> {showalert ?
            <Alert severity="success">Item Edit sucessfully </Alert> : null}

            <div div className="editform">
                <form onSubmit={handleSubmit} className="editformmain">
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                            Category:
                        </label>
                        <Input
                            type="text"
                            className="form-control"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title:
                        </label>
                        <Input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price:
                        </label>
                        <Input

                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Image :
                        </label>
                        <Input
                            type="file"
                            placeholder="enter image path"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" variant={"contained"} fullWidth sx={{ marginTop: "20px", marginBottom: "20px" }}>
                        save
                    </Button>
                </form>

            </div>
        </>
    );

}
export default EditProduct;
