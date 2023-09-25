import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";


const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0;

    const starIcons = [];
    for (let i = 0; i < filledStars; i++) {
        starIcons.push(<StarIcon key={i} />);
    }

    if (hasHalfStar) {
        starIcons.push(<StarOutlineIcon key="half" />);
    }

    const remainingStars = 5 - starIcons.length;
    for (let i = 0; i < remainingStars; i++) {
        starIcons.push(<StarOutlineIcon key={i + filledStars} />);
    }

    return starIcons;
};

export default renderStars;
