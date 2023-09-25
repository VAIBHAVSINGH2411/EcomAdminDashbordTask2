import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "@mui/material";
import "./AddProductForm.css";
function AddProductForm() {
    const [formData, setFormData] = useState({
        category: "",
        title: "",
        price: "",
        discription: "",
        image: "",
        rating: { rate: 3, count: 130 }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            category: formData.category,
            title: formData.title,
            price: formData.price,
            discription: formData.discription,
            image: formData.image,
            rating: formData.rating,

        };

        console.log("Submitting new product:", newProduct);


        axios
            .post("http://localhost:3000/products", newProduct)
            .then((res) => {

                console.log("sourab", res.data);
            })
            .catch((error) => {
                alert(error);
            });


        setFormData({
            category: "",
            title: "",
            price: "",
            image: "",
            discription: "",
        });
    };




    return (
        <div className="formctr"><h2>Add Product</h2>
            <div className="AddForm">

                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="price" className="form-label">
                            discription:
                        </label>
                        <Input

                            type="text"
                            className="form-control"
                            id="discription"
                            name="discription"
                            value={formData.discription}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Image :
                        </label>
                        <Input
                            type="text"
                            className="form-control"
                            placeholder="enter image path"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" variant={"contained"} fullWidth sx={{ marginTop: "20px", marginBottom: "20px" }}>
                        Add
                    </Button>
                </form>
            </div>
        </div >
    );
}

export default AddProductForm;