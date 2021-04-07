import React, {useEffect, useState} from 'react';

import BlockExpandable from "./BlockExpandable";
import TripAdvisorLinkDialog from "./dialogs/TripAdvisorLinkDialog";
import tripAdvisorIcon from "../../../assets/images/map_sources/trip-advisor.png";
import openStreetMapIcon from "../../../assets/images/map_sources/openStreetMap.png";
import wikiIcon from "../../../assets/images/map_sources/ic_logo_wikipedia.png";
import {makeStyles} from '@material-ui/core/styles';
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

import PermanentlyClosedDialog from "./dialogs/PermanentlyClosedDialog";
import MergeDuplicateDialog from "./dialogs/MergeDuplicateDialog";
import Utils from "../../util/Utils";

const useStyles = makeStyles((theme) => ({
    icon: {
        width: "24px",
        height: "24px",
        margin: "5px 12px 0 0",
    },
    listItem: {
        borderTop:"1px solid #ececec"
    },
    link: {
        color: "#2D69E0"
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

    const [tripAdvisorDialogOpen, setTripAdvisorDialogOpen] = useState(false);
    const [permanentlyClosedDialogOpen, setPermanentlyClosedDialogOpen] = useState(false);
    const [mergeDialogOpen, setMergeDialogOpen] = useState(false);
    const [tripAdvisorLinkAvailable, setTripAdvisorLinkAvailable] = useState(false);
    const [permanentlyClosedMarkerAvailable, setPermanentlyClosedMarkerAvailable] = useState(false);

    const openTripAdvisorDialog = () => {
        setTripAdvisorDialogOpen(true);
    };
    const closeTripAdvisorDialog = () => {
        setTripAdvisorDialogOpen(false);
    };
    const openPermanentlyClosedDialog = () => {
        setPermanentlyClosedDialogOpen(true);
    };
    const closePermanentlyClosedDialog = () => {
        setPermanentlyClosedDialogOpen(false);
    };
    const openMergeDialog = () => {
        setMergeDialogOpen(true);
    };
    const closeMergeDialog = () => {
        setMergeDialogOpen(false);
    };
    function getDistanceToSimilarPlace() {
        return Math.round(Utils.getDistance(similarMarkerPlace.latLon[0], similarMarkerPlace.latLon[1],
            markerPlace.latLon[0], markerPlace.latLon[1]));
    }

    useEffect(() => {
        let linkTripAdvisorAvailable = false;
        let permanentlyClosedMarker = false;
        let isActiveOsm = false;

        if (markerPlace && markerPlace.sources) {
            Object.entries(markerPlace.sources).map(([type, sources]) => {
                if (type === 'tripadvisor') {
                    linkTripAdvisorAvailable = true;
                }

                if (type === 'osm') {
                    sources.forEach(source => !source.deleted ? isActiveOsm = true : null)
                }
            });
            if (!isActiveOsm) {
                permanentlyClosedMarker = true;
            }
        }
        setTripAdvisorLinkAvailable(linkTripAdvisorAvailable);
        setPermanentlyClosedMarkerAvailable(permanentlyClosedMarker);
    }, [markerPlace]);

    function hasImagesForReview() {
        return markerPlace.images ? markerPlace.images.review : false;
    }

    function shouldShowMergeAction() {
        return similarMarkerPlace && !markerPlace.deleted && !similarMarkerPlace.deleted;
    }

    function shouldShowPermanentlyClosedAction() {
        return permanentlyClosedMarkerAvailable && !markerPlace.deleted;
    }

    function isActionsAvailable() {
        return !!(markerPlace && (!tripAdvisorLinkAvailable || hasImagesForReview() || shouldShowMergeAction()
            || shouldShowPermanentlyClosedAction()));
    }

    return (isActionsAvailable() && <BlockExpandable header='Actions to take' open={true}>
        <div>
            <List component="nav" aria-label="main mailbox folders">
                {!tripAdvisorLinkAvailable && <div>
                    <ListItem button onClick={openTripAdvisorDialog} className={classes.listItem}>
                        <ListItemIcon>
                            <img src={tripAdvisorIcon} alt="tripAdvisorIcon" className={classes.icon}/>
                        </ListItemIcon>
                        <ListItemText className={classes.link} primary="Link with Trip Advisor"/>
                    </ListItem>
                    <TripAdvisorLinkDialog open={tripAdvisorDialogOpen}
                                           onClose={closeTripAdvisorDialog}
                                           place={place}
                                           setPlaces={setPlaces}/>
                </div>}

                {hasImagesForReview() && <ListItem
                    button onClick={() => onActionClick("reviewImages")} className={classes.listItem}>
                    <ListItemIcon>
                        <img src={openStreetMapIcon} alt="openStreetMapIcon" className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText className={classes.link}
                                  primary={'Review ' + markerPlace.images.review.length + ' photos'}/>
                </ListItem>}

                {shouldShowMergeAction() && <div>
                    <ListItem button onClick={openMergeDialog} className={classes.listItem}>
                        <ListItemIcon>
                            <img src={wikiIcon} alt="openStreetMapIcon" className={classes.icon}/>
                        </ListItemIcon>
                        <ListItemText className={classes.link} primary="Possible duplicate:"
                                      secondary={similarMarkerPlace.title + ' (' + getDistanceToSimilarPlace() + 'm)'}/>
                    </ListItem>
                    <MergeDuplicateDialog markerPlace={markerPlace}
                                          similarMarkerPlace={similarMarkerPlace}
                                          open={mergeDialogOpen}
                                          onClose={closeMergeDialog}
                                          onMerge={onMerge}
                                          categories={categories}
                                          place={place}
                                          similarPlace={similarPlace}
                                          setPlaces={setPlaces}/>
                </div>}
                {shouldShowPermanentlyClosedAction() && <div>
                    <ListItem button onClick={openPermanentlyClosedDialog} className={classes.listItem}>
                        <ListItemIcon>
                            <img src={wikiIcon} alt="openStreetMapIcon" className={classes.icon}/>
                        </ListItemIcon>
                        <ListItemText className={classes.link} primary="Mark place as permanently closed"/>
                    </ListItem>
                    <PermanentlyClosedDialog open={permanentlyClosedDialogOpen}
                                             onClose={closePermanentlyClosedDialog}
                                             place={place}
                                             setPlaces={setPlaces}/>
                </div>}
            </List>
        </div>
    </BlockExpandable>)
}