import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { red } from '@mui/material/colors';
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import FavoriteIcon from '@mui/icons-material/Favorite';

import "./ItemDetails.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
    styled,
    Typography
} from "@mui/material";


function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<StarIcon key={i} color="primary" />);
        } else {
            stars.push(<StarIcon key={i} color="action" />);
        }
    }
    return stars;
}

function ItemDetails({ apidata }) {
    const { id } = useParams();
    const selectedProduct = apidata.find((product) => product.id === parseInt(id));

    if (!selectedProduct) {
        return <div>Product not found.</div>;
    }

    return (
        <div div className="itemonebyone">

            <Card sx={{ maxWidth: 345, margin: 2 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={selectedProduct.category}
                    subheader="September 26, 2023"
                />
                <CardMedia
                    component="img"
                    height="250"
                    src={`data:image/png;base64, ${selectedProduct.image}`}
                    alt={selectedProduct.title}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {selectedProduct.title}
                        <br />
                        $ price : {selectedProduct.price}   <br />   <br />
                        Rating : {renderStars(selectedProduct.rating.rate)}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {selectedProduct.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default ItemDetails;
