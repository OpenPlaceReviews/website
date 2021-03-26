import React, {useContext, useState, useEffect, useRef} from 'react';

import useExtractObject from "../hooks/useExtractObject";
import useDiff from "../hooks/useDiff";
import useCommitOp from "../hooks/useCommitOp";
import { getObjectsById } from "../../../api/data";

import BlockExpandable from "./BlockExpandable";
import AttributesBar from "./AttributesBar";
import Actions from "./Actions";
import MapSidebar from "./sidebar/MapSidebar";
import ReviewImagesBlock from "./ReviewImagesBlock";

import AuthContext from "../../main/auth/providers/AuthContext";
import { makeStyles } from "@material-ui/styles";
import {Box, Button, IconButton, Link, Switch} from "@material-ui/core";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Value from "../../main/blockchain/blocks/Value";
import Utils from "../../util/Utils";

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
    button: {
        height: "35px",
        marginBottom: "10px"
    },
    switchBase: {
        color: "#2D69E0",
        '&$checked': {
            color: "#2D69E0",
        },
        '&$checked + $track': {
            backgroundColor: "#2D69E0",
        },
    },
    track: {},
    checked: {},
    position: {
        position: "absolute",
        left:"85%"
    },
    switch: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        fontSize: "14px",
        color:"#697281",
        background:"#F5F5F5",
        borderRadius:"6px"
    },
});

const findObject = (obj = {}, key) => {
    let result = null;
    const recursiveSearch = (obj = {}) => {
        if (result || !obj || typeof obj !== 'object') {
            return;
        }
        const value = obj[key];
        if (value) {
            result = value;
            return;
        }
        Object.keys(obj).reverse().forEach(function (k) {
            recursiveSearch(obj[k]);
        });
    };
    recursiveSearch(obj);
    return result;
};

export default function MarkerBlock({ marker, setMarker, whenReady }) {
    const [op, setOp] = useState(null);
    const [places, setPlaces] = useState([]);
    const [similarPlace, setSimilarPlace] = useState(null);
    const [categories, setCategories] = useState(null);
    const [version, setVersion] = useState(0);
    const [markerPlace, setMarkerPlace] = useState(null);
    const [similarMarkerPlace, setSimilarMarkerPlace] = useState(null);
    const classes = useStyles();
    const [inactiveLinksVisible, setInactiveLinksVisible] = useState(false);
    const [tripAdv, setTripAdv] = useState(false);

    const [place] = places;
    const { authData } = useContext(AuthContext);

    const isLoggedIn = () => !!authData.token;

    const isPlaceDeleted = (place) => {
        let deleted = false;
        if (place && place.source) {
            deleted = true;
            Object.entries(place.source).map(([type, source]) => deleted = deleted && type === 'osm' && source[0].deleted != null);
        }
        return deleted;
    };

    const isMergeAllowed = (first, second) => {
        if (!isLoggedIn() || !first || !second) {
            return false;
        }
        let firstDeleted = isPlaceDeleted(first);
        let secondDeleted = isPlaceDeleted(second);
        return ((firstDeleted && !secondDeleted) || (!firstDeleted && secondDeleted));
    };

    const handleExtractPlace = (object, similarObject = null) => {
        if (!object) {
            setMarker(null);
        }
        Promise.resolve()
          .then(() => setSimilarPlace(isMergeAllowed(object, similarObject) ? similarObject : null))
          .then(() => setPlaces([object, object]));
    }

    const handleUpdatePlace = () => {
        if (JSON.stringify(places[0].id) !== JSON.stringify(places[1].id)) {
            setMarker(null);
        } else {
            setVersion(place.version + 1);
        }
    }

    useExtractObject(marker, version, handleExtractPlace);
    useDiff(places[0], places[1], categories, setOp);
    useCommitOp(op, authData, handleUpdatePlace);

    let imagesSidebar;
    if (place && place.images && categories) {
        const { images } = place;
        const isEditable = isLoggedIn() && !similarPlace;
        imagesSidebar = <React.Fragment>
            {images.review && images.review.length > 0 ? <BlockExpandable key={-1} header={`Photos - To review (${images.review.length})`}>
                <ReviewImagesBlock place={place} onSubmit={setPlaces} isEditable={isEditable} initialCategory="review" categories={categories} />
            </BlockExpandable> : ''}

            {Object.keys(categories).map((category, index) => images[category] && images[category].length > 0 ? <BlockExpandable key={index} header={`Photos - ${Utils.capitalize(category)} (${images[category].length})`}>
                <ReviewImagesBlock place={place} onSubmit={setPlaces} isEditable={isEditable} initialCategory={category} categories={categories} />
            </BlockExpandable> : '')}
        </React.Fragment>;
    }

    let similarImagesSidebar;
    if (similarPlace && similarPlace.images && categories) {
        const { images } = similarPlace;
        similarImagesSidebar = <React.Fragment>
            {images.review && images.review.length > 0 ? <BlockExpandable key={-1} header={`Photos - To review (${images.review.length})`}>
                <ReviewImagesBlock place={similarPlace} isEditable={false} initialCategory="review" categories={categories} />
            </BlockExpandable> : ''}

            {Object.keys(categories).map((category, index) => images[category] && images[category].length > 0 ? <BlockExpandable key={index} header={`Photos - ${Utils.capitalize(category)} (${images[category].length})`}>
                <ReviewImagesBlock place={similarPlace} isEditable={false} initialCategory={category} categories={categories} />
            </BlockExpandable> : '')}
        </React.Fragment>;
    }

    useEffect(() => {
        const requestCategories = async () => {
            const data = await getObjectsById('sys.operation', 'opr.place');
            const object = data.objects.shift();
            setCategories(object && object.interface && object.interface.images ? object.interface.images.values : null);
        };

        requestCategories();
    }, []);

    let oprId = marker.properties.opr_id;
    let similarOprId = marker.properties.similar_opr_id;
    useEffect(() => {
        if (place) {
            const params = fetchPlaceParams(place);
            setMarkerPlace({
                oprId: oprId,
                title: params.title,
                subtitle: params.subtitle,
                latLon: params.latLon,
                images: params.images,
                sources: params.sources,
            });
        }
        if (similarPlace) {
            const params = fetchPlaceParams(similarPlace);
            setSimilarMarkerPlace({
                oprId: similarOprId,
                title: params.title,
                subtitle: params.subtitle,
                latLon: params.latLon,
                images: params.images,
                sources: params.sources,
            });
        } else {
            setSimilarMarkerPlace(null);
        }
    }, [places]);

    useEffect(() => {
        if (markerPlace) {
            whenReady(markerPlace);
        }
    }, [markerPlace]);

    const fetchPlaceName = place => {
        const { name, source } = place;
        if (name) {
            return name;
        }
        let sourceName = findObject(source, 'name');
        if (sourceName) {
            return sourceName;
        } else {
            return place.id.join(", ");
        }
    };

    const fetchPlaceType = place => {
        const { placetype, source } = place;
        if (placetype) {
            return placetype;
        }
        let sourcePlacetype = findObject(source, 'placetype');
        if (sourcePlacetype) {
            return sourcePlacetype;
        } else {
            let osmValue = findObject(source, 'osm_value');
            if (osmValue) {
                return osmValue;
            } else {
                return '';
            }
        }
    };

    const fetchPlaceParams = (place) => {
        let title = fetchPlaceName(place);
        let subtitle = fetchPlaceType(place);
        let latLon = null;
        const { lat, lon, source } = place;
        if (lat && lon) {
            latLon = [lat, lon];
        } else {
            let lat = findObject(source, 'lat');
            let lon = findObject(source, 'lon');
            if (lat && lon) {
                latLon = [lat, lon];
            }
        }
        return {
            title: title,
            subtitle: subtitle,
            latLon: latLon,
            images: place.images,
            sources: source,
        };
    };
    function isTripAdvisor(type){
        if (type === 'tripadvisor'){
            setTripAdv(true);
        }
        return tripAdv;
    }
    function onMerge() {
        if (isPlaceDeleted(place)) {
            setPlaces([place, similarPlace]);
        } else {
            setPlaces([similarPlace, place]);
        }
    }

    const toggleInactiveLinksVisibility = () => {
        setInactiveLinksVisible((prev) => !prev);
    };
    function getInactiveLinksCount() {
        let inactiveLinksCount = 0;
        markerPlace && markerPlace.sources && Object.entries(markerPlace.sources).map(([type, source], index) => {
            if (source.length > 0 && source[0].deleted) {
                inactiveLinksCount++;
            }
        });
        similarMarkerPlace && similarMarkerPlace.sources && Object.entries(similarMarkerPlace.sources).map(([type, source], index) => {
            if (source.length > 0 && source[0].deleted) {
                inactiveLinksCount++;
            }
        });
        return inactiveLinksCount;
    }

    const imagesSidebarRef = useRef(null);
    const handleActionClick = (action) => {
        if (action === "reviewImages") {
            if (imagesSidebarRef) {
                imagesSidebarRef.current.scrollIntoView();
            }
        }
    };

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
                <p>Location: <Value>{markerPlace && markerPlace.latLon && markerPlace.latLon[0].toFixed(5)}, {markerPlace && markerPlace.latLon && markerPlace.latLon[1].toFixed(5)}</Value>
                </p>
                <div className={classes.switch}>
                    <span>Show inactive links ({getInactiveLinksCount()})</span>
                    <Switch
                        className={classes.position}
                        classes={{
                            switchBase: classes.switchBase,
                            track: classes.track,
                            checked: classes.checked
                        }}
                        value={inactiveLinksVisible} onClick={toggleInactiveLinksVisibility}/>
                </div>
            </div>
            {markerPlace && markerPlace.sources && Object.entries(markerPlace.sources).map(([type, source], index) => source.length > 0 && (inactiveLinksVisible || !source[0].deleted) ?
                <div>
                    {isTripAdvisor(type)}
                    <Actions trip={tripAdv}
                             duplicate={similarMarkerPlace && similarMarkerPlace.title}
                             images={markerPlace.images && markerPlace.images.review}
                             onActionClick={handleActionClick}
                    />
                    <AttributesBar sources={source} sourceType={type} key={index}/>
                    <div ref={imagesSidebarRef}>
                        {imagesSidebar}
                    </div>
                </div> : '')}

            {similarMarkerPlace && <>
                <div className={classes.attributes}><p>Similar object</p></div>
                <Box display="flex" flexDirection="row" style={{ marginBottom: "10px" }} alignItems="center" justifyContent="space-between">
                    <div>
                        <p className={classes.header}>{similarMarkerPlace && similarMarkerPlace.title}</p>
                        <p className={classes.subheader}>{similarMarkerPlace.subtitle}</p>
                    </div>
                </Box>
                <div className={classes.attributes}>
                    <p>ID: <Link href={`/data/objects/opr_place?key=${similarOprId}`}>{similarOprId}</Link></p>
                    <p>Location: <Value>{similarMarkerPlace.latLon && similarMarkerPlace.latLon[0].toFixed(5)}, {similarMarkerPlace.latLon && similarMarkerPlace.latLon[1].toFixed(5)}</Value>
                    </p>
                </div>
                {similarMarkerPlace.sources && Object.entries(similarMarkerPlace.sources).map(([type, source], index) => source.length > 0 && (inactiveLinksVisible || !source[0].deleted) ? <AttributesBar sources={source} sourceType={type} key={index} /> : '')}
                {similarImagesSidebar}
                <Button
                  type="submit"
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  disabled={similarPlace == null}
                  onClick={onMerge}
                >Merge</Button>
            </>}
        </div>
    </MapSidebar>;
};