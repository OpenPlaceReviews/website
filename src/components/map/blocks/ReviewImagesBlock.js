import React, {useEffect, useState} from 'react';
import ImagesCarousel from "./ImagesCarousel";
import {makeStyles} from "@material-ui/styles";

import {Button, Box, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles({
    reviewContainer: {
        position: 'relative',
    },
    selector: {
        height: "35px",
        background: "#FFF",
    },
    button: {
        height: "35px",
    },
});

export default function ReviewImagesBlock({place, onSubmit}) {
    const [current, setCurrent] = useState(0);
    const [categorized, setCategorized] = useState({});
    const classes = useStyles();

    const {images} = place;

    useEffect(() => {
        const categories = {};
        images.review.forEach((image, index) => {
            categories[index] = 'review';
        });

        setCategorized(categories);
    }, []);

    const onSubmitHandler = () => {
        const newPlace = JSON.parse(JSON.stringify(place));

        let deletedCount = 0;
        images.review.forEach((image, index) => {
            const category = categorized[index];
            if (category === 'review') {
                return;
            }

            if (category !== 'delete') {
                if (!newPlace.images[category]) {
                    newPlace.images[category] = [];
                }

                newPlace.images[category].push(image);
            }

            newPlace.images.review.splice(index - deletedCount, 1);
            deletedCount++;
        });

        onSubmit([place, newPlace]);
    }

    const onChangeCategory = (e) => {
        setCategorized((state) => ({
            ...state,
            [current]: e.target.value,
        }));
    };

    const isDiasableSubmit = Object.values(categorized).every((value) => value === 'review');

    return <div className={classes.reviewContainer}>
        <ImagesCarousel items={images.review} onChange={setCurrent}/>
        <Box display="flex" flexDirection="row" justifyContent="space-around">
            <Select className={classes.selector} value={categorized[current] || "review"} variant="outlined" onChange={onChangeCategory}>
                <MenuItem value="review">Review</MenuItem>
                <MenuItem value="outdoor">Outdoor</MenuItem>
                <MenuItem value="indoor">Indoor</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
            </Select>
            <Button
                type="submit"
                className={classes.button}
                color="primary"
                variant="contained"
                disabled={isDiasableSubmit}
                onClick={onSubmitHandler}
            >Submit</Button>
        </Box>
    </div>;
};