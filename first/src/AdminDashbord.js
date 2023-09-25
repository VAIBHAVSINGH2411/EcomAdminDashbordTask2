import React, { useEffect, useState } from "react";
import "./AdminDashbord.css";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import axios from "axios";
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import renderStars from "./renderStars";
import { Link } from "react-router-dom";

function AdminDashbord() {
    const [apidata, setApidata] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    function getAllProducts() {
        axios
            .get("http://localhost:3000/products")
            .then((res) => {
                setApidata(res.data);
            })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(() => {
        getAllProducts()
    }, []);



    const handleEditClick = (product) => {
        setEditedProduct(product);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditedProduct(null);
    };

    const handleSaveChanges = () => {
        console.log("Edited Product Data:", editedProduct);
        handleCloseEditDialog();
    };

    const handleEditFieldChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };


    const handleDelete = (productId) => {
        axios
            .delete(`http://localhost:3000/products/${productId}`)
            .then((res) => {
                getAllProducts()
            })
            .catch((error) => {
                alert(error);
            });
    };


    const filteredProducts = apidata.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.price.toString().includes(searchQuery)
    );


    return (
        <div className="AdminDashbord">
            <h3>Admin Dashboard</h3>
            <Link to={"/addproduct"}>
                <Button variant="outlined" color="secondary">Add Item</Button>
            </Link>

            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>ID</TableCell> */}
                            <TableCell>Category</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>

                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <img src={product.image} alt={product.title} width="100" height="100" />
                                </TableCell>
                                <TableCell>{renderStars(product.rating.rate)}</TableCell>
                                <TableCell>
                                    <Link to={`/edit/${product.id}`} state={{ editedProduct: product }}>
                                        <Button variant="contained" color="primary">
                                            <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon> Edit
                                        </Button>
                                    </Link>


                                    <Button variant="contained" color="error" onClick={() => handleDelete(product.id)}>
                                        <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon> Delete
                                    </Button>

                                    <Link to={`/view/${product.id}`} state={{ product }}>
                                        <Button variant="contained" color="success" sx={{ margin: "2px" }}>
                                            <VisibilityOutlinedIcon></VisibilityOutlinedIcon>   View
                                        </Button>
                                    </Link>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>




        </div>
    );
}

export default AdminDashbord;

