import React, { useContext, useState, useEffect } from 'react';

import useExtractObject from "../hooks/useExtractObject";
import useDiff from "../hooks/useDiff";
import useCommitOp from "../hooks/useCommitOp";

import BlockExpandable from "./BlockExpandable";
import AttributesBar from "./AttributesBar";
import MapSidebar from "./sidebar/MapSidebar";
import ReviewImagesBlock from "./ReviewImagesBlock";

import AuthContext from "../../main/auth/providers/AuthContext";
import { makeStyles } from "@material-ui/styles";
import { Box, IconButton, Link } from "@material-ui/core";
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
        marginBottom: "10px",
        "& p": {
            color: "#6A7181",
            fontSize: "15px"
        },
    },
});

const findObject = (obj = {}, key) => {
    let result = null;
    const recursiveSearch = (obj = {}) => {
        if (result || !obj || typeof obj !== 'object') {
            return;
        };
        const value = obj[key];
        if (value) {
            result = value;
            return;
        };
        Object.keys(obj).forEach(function (k) {
            recursiveSearch(obj[k]);
        });
    };
    recursiveSearch(obj);
    return result;
};

export default function MarkerBlock({ marker, setMarker, whenReady }) {
    const [op, setOp] = useState(null);
    const [places, setPlaces] = useState([]);
    const [version, setVersion] = useState(0);
    const [markerPlace, setMarkerPlace] = useState(null);
    const classes = useStyles();

    const [place] = places;
    const { authData } = useContext(AuthContext);

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
    if (place && place.images) {
        const { images } = place;
        const isLoggedIn = !!authData.token;
        imagesSidebar = <React.Fragment>
            {images.review && images.review.length > 0 ? <BlockExpandable header={`Photos - To review (${images.review.length})`}>
                <ReviewImagesBlock place={place} onSubmit={setPlaces} isLoggedIn={isLoggedIn} initialCategory="review" />
            </BlockExpandable> : ''}

            {images.outdoor && images.outdoor.length > 0 ? <BlockExpandable header={`Photos - Outdoor (${images.outdoor.length})`}>
                <ReviewImagesBlock place={place} onSubmit={setPlaces} isLoggedIn={isLoggedIn} initialCategory="outdoor" />
            </BlockExpandable> : ''}

            {images.indoor && images.indoor.length > 0 ? <BlockExpandable header={`Photos - Indoor (${images.indoor.length})`}>
                <ReviewImagesBlock place={place} onSubmit={setPlaces} isLoggedIn={isLoggedIn} initialCategory="indoor" />
            </BlockExpandable> : ''}
        </React.Fragment>;
    }

    let oprId = marker.properties.opr_id;
    useEffect(() => {

        let title = null;
        let subtitle = null;
        let sources = null;
        let latLon = null;
        if (place) {
            const { name, placetype, lat, lon, source } = place;
            if (name) {
                title = name;
            }
            if (placetype) {
                subtitle = placetype;
            }
            if (lat && lon) {
                latLon = [lat, lon];
            }
            if (source) {
                sources = source;
            }
        }

        if (!title) {
            let name = findObject(sources, 'name');
            if (name) {
                title = name;
            } else {
                title = oprId;
            }
        }
        if (!subtitle) {
            let placetype = findObject(sources, 'placetype');
            if (placetype) {
                subtitle = placetype;
            } else {
                let osmValue = findObject(sources, 'osm_value');
                if (osmValue) {
                    subtitle = osmValue;
                } else {
                    subtitle = '';
                }
            }
        }
        if (!latLon) {
            let lat = findObject(sources, 'lat');
            let lon = findObject(sources, 'lon');
            if (lat && lon) {
                latLon = [lat, lon];
            }
        }

        if (place) {
            setMarkerPlace({
                oprId: oprId,
                title: title,
                subtitle: subtitle,
                latLon: latLon,
                images: place.images,
                sources: sources,
            });
        }
    }, [places]);

    useEffect(() => {
        if (markerPlace) {
            whenReady(markerPlace);
        }
    }, [markerPlace]);

    return <MapSidebar position="left" className={classes.container}>
        <div className={classes.sidebar}>
            <Box display="flex" flexDirection="row" style={{ marginBottom: "10px" }} alignItems="center" justifyContent="space-between">
                <div>
                    <p className={classes.header}>{markerPlace && markerPlace.title}</p>
                    <p className={classes.subheader}>{markerPlace && markerPlace.subtitle}</p>
                </div>
                <IconButton onClick={() => setMarker(null)}>
                    <CancelRoundedIcon className={classes.closeIcon} />
                </IconButton>
            </Box>

            <div className={classes.attributes}>
                <p>ID: <Link href={`/data/objects/opr_place?key=${oprId}`}>{oprId}</Link></p>
                <p>Location: <Value>{markerPlace && markerPlace.latLon && markerPlace.latLon[0].toFixed(5)}, {markerPlace && markerPlace.latLon && markerPlace.latLon[1].toFixed(5)}</Value></p>
            </div>

            {markerPlace && markerPlace.sources && markerPlace.sources.osm && markerPlace.sources.osm.map((sources, index) => <AttributesBar source={sources} key={index} />)}

            {imagesSidebar}
        </div>
    </MapSidebar>;
};