import React from 'react';
import ImagesCarousel from "./ImagesCarousel";
import {makeStyles} from "@material-ui/styles";
import {MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles({
   reviewContainer: {
       position: 'relative',
   },
   selector: {
       position: "absolute",
       bottom: "40px",
       left: "10px",
       height: "35px",
       background: "#FFF",
   },
});

export default function ReviewImagesBlock({items}) {
    const classes = useStyles();
    return <div className={classes.reviewContainer}>
        <ImagesCarousel items={items}/>
        <Select className={classes.selector} variant="outlined" value="review">
            <MenuItem value="review">Review</MenuItem>
            <MenuItem value="outdoor">Outdoor</MenuItem>
            <MenuItem value="indoor">Indoor</MenuItem>
        </Select>
    </div>;
};