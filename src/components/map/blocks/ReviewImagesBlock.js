import React, {useState} from 'react';
import ImagesCarousel from "./ImagesCarousel";
import {makeStyles} from "@material-ui/styles";
import {Button, Box, MenuItem, Select} from "@material-ui/core";
import {isArray} from "leaflet/src/core/Util";

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

export default function ReviewImagesBlock({images, setImages}) {
    const [current, setCurrent] = useState(0);
    const [category, setCategory] = useState('review');
    const classes = useStyles();

    const onSubmitHandler = () => {
        const updatedImages = {...images};
        if (!isArray(updatedImages[category])) {
            updatedImages[category] = [];
        }

        updatedImages[category].push(images.review[current]);
        images.review.splice(current, 1);

        setImages(updatedImages);
    }

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    let content;
    if (images.review.length) {
        content = <React.Fragment>
            <ImagesCarousel items={images.review} onChange={setCurrent}/>
            <Box display="flex" flexDirection="row" justifyContent="space-around">
                <Select className={classes.selector} value={category} variant="outlined" onChange={onChangeCategory}>
                    <MenuItem value="review">Review</MenuItem>
                    <MenuItem value="outdoor">Outdoor</MenuItem>
                    <MenuItem value="indoor">Indoor</MenuItem>
                </Select>
                <Button
                    type="submit"
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    disabled={category === 'review'}
                    onClick={onSubmitHandler}
                >Submit</Button>
            </Box>
        </React.Fragment>;
    } else {
        content = <p>No more images to review</p>;
    }

    return <div className={classes.reviewContainer}>
        {content}
    </div>;
};