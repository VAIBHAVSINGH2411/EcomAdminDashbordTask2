import React, { useState } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { Button, Input } from "@mui/material";
import "./AddProductForm.css";
function AddProductForm() {
    const [showalert, setshowalert] = useState(false);
    const [base64Image, setBase64Image] = useState("");

    const [formData, setFormData] = useState({
        category: "",
        title: "",
        price: "",
        discription: "",
        image: "",
        rating: { rate: 3, count: 130 }
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "image") {
            getBase64(e.target.files[0]).then(file => {
                setBase64Image(file.split(",")[1])
            })
            return
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            category: formData.category,
            title: formData.title,
            price: formData.price,
            discription: formData.discription,
            image: base64Image,
            rating: formData.rating,
        };

        console.log("Submitting new product:", newProduct);


        axios
            .post("http://localhost:3000/products", newProduct)
            .then((res) => {
                setshowalert(true);
                console.log(res.data);
                setTimeout(() => {
                    setshowalert(false);
                }, 3000);
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
        <>

            {showalert ?
                <Alert severity="success">Item add sucessfully </Alert> : null}

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
                                type="file"
                                className="form-control"
                                placeholder="enter image path"
                                id="image"
                                name="image"
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
        </>
    );
}

export default AddProductForm;