import React, {useContext, useState} from 'react';

import useExtractObject from "../hooks/useExtractObject";
import useDiff from "../hooks/useDiff";
import useCommitOp from "../hooks/useCommitOp";

import BlockExpandable from "./BlockExpandable";
import OPRAttributesBar from "./OPRAttributesBar";
import MapSidebar from "./sidebar/MapSidebar";
import ReviewImagesBlock from "./ReviewImagesBlock";

import AuthContext from "../../main/auth/providers/AuthContext";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    sidebar: {
        height: "100%",
        margin: "0 0 0 10px !important",
    },
    container: {
        fontFamily: "IBM Plex Sans",
        padding: "10px 15px",
        background: "#FFFFFF",
        height: "100%",
        width: "300px",
        overflow: "auto",
    }
});

export default function MarkerBlock({marker, setMarker}) {
    const [op, setOp] = useState(null);
    const [places, setPlaces] = useState([]);
    const [version, setVersion] = useState(0);
    const classes = useStyles();

    const [place] = places;
    const {authData} = useContext(AuthContext);

    const handleExtractPlace = (object) => {
        setPlaces([object, object]);
    }

    const handleUpdatePlace = () => {
        setVersion(place.version + 1);
    }

    useExtractObject(marker, version, handleExtractPlace);
    useDiff(places[0], places[1], setOp);
    useCommitOp(op, authData, handleUpdatePlace);

    let imagesSidebar;
    if(place && place.images) {
        const {images} = place;
        const isLoggedIn = !!authData.token;
        imagesSidebar = <React.Fragment>
            {images.review.length > 0 ? <BlockExpandable header={`Photos - To review (${images.review.length})`}>
                <ReviewImagesBlock place={place} onSubmit={setPlaces} isLoggedIn={isLoggedIn} initialCategory="review"/>
            </BlockExpandable> : ''}

            {images.outdoor.length > 0 ? <BlockExpandable header={`Photos - Outdoor (${images.outdoor.length})`}>
                <ReviewImagesBlock place={place} onSubmit={setPlaces} isLoggedIn={isLoggedIn} initialCategory="outdoor"/>
            </BlockExpandable> : ''}

            {images.indoor.length > 0 ? <BlockExpandable header={`Photos - Indoor (${images.indoor.length})`}>
                <ReviewImagesBlock place={place} onSubmit={setPlaces} isLoggedIn={isLoggedIn} initialCategory="indoor"/>
            </BlockExpandable> : ''}
        </React.Fragment>;
    }

    return <MapSidebar position="left" className={classes.sidebar}>
        <div className={classes.container}>
            <BlockExpandable header="Attributes" open={true}>
                <OPRAttributesBar feature={marker} setMarker={setMarker}/>
            </BlockExpandable>

            {imagesSidebar}
        </div>
    </MapSidebar>;
};