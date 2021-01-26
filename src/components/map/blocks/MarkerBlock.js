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
import {Box, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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

    const lngLat = marker.geometry.coordinates;
    const {title, subtitle, opr_id} = marker.properties;

    return <MapSidebar position="left" className={classes.sidebar}>
        <div className={classes.container}>
            <Box display="flex" flexDirection="row" style={{marginBottom: "10px"}} alignItems="center" justifyContent="space-between">
                <div>
                    <p className={classes.header}>{title}</p>
                    <p>{subtitle}</p>
                </div>
                <IconButton onClick={() => setMarker(null)}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </Box>

            <div>
                <p>ID: <a href={`/data/objects/opr_place?key=${opr_id}`}>{opr_id}</a></p>
                <p>
                    <strong>Location: </strong> {lngLat[1].toFixed(7)}, {lngLat[0].toFixed(7)}
                </p>
            </div>
            <BlockExpandable header="Attributes" open={true}>
                <OPRAttributesBar feature={marker} setMarker={setMarker}/>
            </BlockExpandable>

            {imagesSidebar}
        </div>
    </MapSidebar>;
};