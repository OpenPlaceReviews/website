import React, {useState} from 'react';

import BlockExpandable from "./BlockExpandable";
import DialogTripAdvisor from "./dialogs/DialogTripAdvisor";
import tripAdvisorIcon from "../../../assets/images/map_sources/trip-advisor.png";
import openStreetMapIcon from "../../../assets/images/map_sources/openStreetMap.png";
import wikiIcon from "../../../assets/images/map_sources/ic_logo_wikipedia.png";
import {makeStyles} from '@material-ui/core/styles';
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

import DialogPermanentlyClosed from "./dialogs/DialogPermanentlyClosed";
import DialogMergeDuplicate from "./dialogs/DialogMergeDuplicate";

const useStyles = makeStyles((theme) => ({
    icon: {
        width: "24px",
        height: "24px",
        margin: "5px 12px 0 0",
    },
    list: {
        borderBottom: "1px solid #ececec"
    },
    link: {
        color: "#2D69E0"
    },
    secondary: {
        borderBottom: "1px solid #ececec"
    },
    root: {
        position: "absolute",
        left: "85%",
        marginTop: "-5%"
    },
    button: {
        height: "35px",
        marginBottom: "10px",
        backgroundColor: "#2D69E0",
        color: "#FFFFFF"
    },
    buttonClose: {
        height: "35px",
        marginBottom: "10px",
        color: "#2D69E0",
        backgroundColor: "#F1F4FC"
    },
}));

export default function MarkerActions({
                                          markerPlace,
                                          similarMarkerPlace,
                                          onActionClick,
                                          onMerge,
                                          categories,
                                          place,
                                          similarPlace,
                                          setPlaces
                                      }) {

    const classes = useStyles();

    const [tripAdvisorDialog, setTripAdvisorDialog] = useState(false);
    const [permanentlyClosedDialog, setPermanentlyClosedDialog] = useState(false);
    const [mergeDialog, setMergeDialog] = useState(false);

    const openTripAdvisorDialog = () => {
        setTripAdvisorDialog(true);
    };
    const closeTripAdvisorDialog = () => {
        setTripAdvisorDialog(false);
    };
    const openPermanentlyClosedDialog = () => {
        setPermanentlyClosedDialog(true);
    };
    const closePermanentlyClosedDialog = () => {
        setPermanentlyClosedDialog(false);
    };
    const openMergeDialog = () => {
        setMergeDialog(true);
    };
    const closeMergeDialog = () => {
        setMergeDialog(false);
    };

    function getDistance() {
        return Math.round(Math.sqrt(Math.pow(similarMarkerPlace.latLon[0].toFixed(5) - markerPlace.latLon[0].toFixed(5), 2) +
            Math.pow(similarMarkerPlace.latLon[1].toFixed(5) - markerPlace.latLon[1].toFixed(5), 2)));
    }

    function isTripAdvisor() {
        markerPlace && markerPlace.sources && Object.entries(markerPlace.sources).map(([type, source], index) => {
            if (type === 'tripadvisor') {
                return true;
            }
        });
    }

    function getTripAdvisorDesc() {
        if (!isTripAdvisor()) {
            return (
                <div><ListItem button onClick={openTripAdvisorDialog} className={classes.list}>
                    <ListItemIcon>
                        <img src={tripAdvisorIcon} alt="tripAdvisorIcon" className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary="Link with Trip Advisor"/>
                </ListItem>
                    <DialogTripAdvisor tripAdvisorDialog={tripAdvisorDialog}
                                       closeTripAdvisorDialog={closeTripAdvisorDialog}/>
                </div>
            );
        }
    }

    function getDuplicatesDesc() {
        if (similarMarkerPlace && similarMarkerPlace.title) {
            return (
                <div><ListItem button onClick={openMergeDialog} className={classes.list}>
                    <ListItemIcon>
                        <img src={wikiIcon} alt="openStreetMapIcon" className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary="Possible duplicate:"
                                  secondary={similarMarkerPlace.title + ' (' + getDistance() + 'm)'}/>
                </ListItem>
                    <DialogMergeDuplicate markerPlace={markerPlace}
                                          similarMarkerPlace={similarMarkerPlace}
                                          mergeDialog={mergeDialog}
                                          closeMergeDialog={closeMergeDialog}
                                          onMerge={onMerge}
                                          categories={categories}
                                          place={place}
                                          similarPlace={similarPlace}
                                          setPlaces={setPlaces}/>
                </div>
            );
        }
    }

    function getPhotosDesc() {
        if (markerPlace && markerPlace.images ? markerPlace.images.review : false) {
            return (
                <ListItem button onClick={() => onActionClick("reviewImages")} className={classes.list}>
                    <ListItemIcon>
                        <img src={openStreetMapIcon} alt="openStreetMapIcon" className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText className={classes.link}
                                  primary={'Review ' + markerPlace.images.review.length + ' photos'}/>
                </ListItem>
            );
        }
    }

    function getPermanentlyClosedDesc() {
        return (
            <div>
                <ListItem button onClick={openPermanentlyClosedDialog}>
                    <ListItemIcon>
                        <img src={wikiIcon} alt="openStreetMapIcon" className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary="Mark place as permanently closed"/>
                </ListItem>
                <DialogPermanentlyClosed permanentlyClosedDialog={permanentlyClosedDialog}
                                         closePermanentlyClosedDialog={closePermanentlyClosedDialog}/>
            </div>
        );
    }

    return <BlockExpandable header='Actions to take' open={true}>
        <div className={classes.list}>
            <List component="nav" aria-label="main mailbox folders">
                {getTripAdvisorDesc()}
                {getPhotosDesc()}
                {getDuplicatesDesc()}
                {getPermanentlyClosedDesc()}
            </List>
        </div>
    </BlockExpandable>
}