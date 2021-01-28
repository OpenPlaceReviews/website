import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    item: {
        height: "250px",
        "& img": {
            maxHeight: "250px",
            maxWidth: "350px",
            display: "block",
            margin: "0 auto",
        }
    },
})

const IMAGE_URL = '/api/ipfs/image?hash=';

export default function ImagesCarousel({items, index, onChange = () => {}, onClick = () => {}}) {
    const classes = useStyles();

    return <Carousel autoPlay={false} indicators={true} navButtonsAlwaysVisible={true} index={index} animation="slide" onChange={onChange}>
        {
            items.map( (item, i) => <div key={i} className={classes.item}><img
                src={`${IMAGE_URL}${item.hash}`}
                alt="photo"
                onClick={() => onClick(`${IMAGE_URL}${item.hash}`)}
            /></div> )
        }
    </Carousel>;
}
