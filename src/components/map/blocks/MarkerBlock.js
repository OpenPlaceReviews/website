import React, {useContext, useState} from 'react';

import useExtractObject from "../hooks/useExtractObject";
import useDiff from "../hooks/useDiff";
import useCommitOp from "../hooks/useCommitOp";

import BlockExpandable from "./BlockExpandable";
import AttributesBar from "./AttributesBar";
import MapSidebar from "./sidebar/MapSidebar";
import ReviewImagesBlock from "./ReviewImagesBlock";

import AuthContext from "../../main/auth/providers/AuthContext";
import {makeStyles} from "@material-ui/styles";
import {Box, IconButton, Link} from "@material-ui/core";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Value from "../../main/blockchain/blocks/Value";

const useStyles = makeStyles({
    container: {
        height: "100%",
        margin: "0 0 0 10px !important",
        "& p": { margin: "0" },
        "& a": {
            color: "#2D69E0",
            fontSize: "15px",
            textDecorationColor: "#2D69E0",
            cursor: "pointer",
        },
    },
    sidebar: {
        fontFamily: "IBM Plex Sans",
        padding: "10px 15px",
        background: "#FFFFFF",
        height: "100%",
        width: "400px",
        overflow: "auto",
    },
    header: {
        fontSize: "22px",
        fontWeight: 600,
        lineHeight: "22px",
    },
    subheader: {
        fontSize: "14px",
        marginTop: "5px",
    },
    closeIcon: {
        fontSize: "48px",
        color: "#2D69E0",
    },
    attributes: {
        "& p": {
            color: "#6A7181",
            fontSize: "15px"
        },
    },
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
    const {title: oprTitle, subtitle: oprSubtitle, opr_id, sources, place_type} = marker.properties;

    let title = oprTitle;
    let subtitle = oprSubtitle;

    if (!title) {
        const {tags: { name }} = sources.find((source) => _.isObject(source.tags) && source.tags.name);
        if (name) {
            title = name;
        } else {
            title = opr_id;
        }
    }

    if (!subtitle) {
        const {tags: { amenity }} = sources.find((source) => _.isObject(source.tags) && source.tags.amenity);
        if (amenity) {
            subtitle = amenity;
        } else {
            subtitle = place_type;
        }
    }

    return <MapSidebar position="left" className={classes.container}>
        <div className={classes.sidebar}>
            <Box display="flex" flexDirection="row" style={{marginBottom: "10px"}} alignItems="center" justifyContent="space-between">
                <div>
                    <p className={classes.header}>{title}</p>
                    <p className={classes.subheader}>{subtitle}</p>
                </div>
                <IconButton onClick={() => setMarker(null)}>
                    <CancelRoundedIcon className={classes.closeIcon}/>
                </IconButton>
            </Box>

            <div className={classes.attributes}>
                <p>ID: <Link href={`/data/objects/opr_place?key=${opr_id}`}>{opr_id}</Link></p>
                <p>Location: <Value>{lngLat[1].toFixed(7)}, {lngLat[0].toFixed(7)}</Value></p>
            </div>

            {sources.map((source, index) => <AttributesBar source={source} key={index}/>)}

            {imagesSidebar}
        </div>
    </MapSidebar>;
};