import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    item: {
        maxHeight: "250px",
        maxWidth: "350px",
        display: "block",
        margin: "0 auto",
    },
})

export default function ImagesCarousel({items}) {
    const classes = useStyles();
    return <Carousel autoPlay={false} indicators={true} animation="slide">
        {
            items.map( (item, i) => <img key={i} src={item} alt="photo" className={classes.item} /> )
        }
    </Carousel>;
}
