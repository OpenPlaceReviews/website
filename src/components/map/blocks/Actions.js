import React, {useState} from 'react';

import BlockExpandable from "./BlockExpandable";
import tripAdvisorIcon from "../../../assets/images/map_sources/trip-advisor.png";
import openStreetMapIcon from "../../../assets/images/map_sources/openStreetMap.png";
import wikiIcon from "../../../assets/images/map_sources/ic_logo_wikipedia.png";
import actionDone from "../../../assets/images/map_sources/ic_colored_done.png";
import actionRemove from "../../../assets/images/map_sources/ic_action_remove_shaped.png";
import {makeStyles} from '@material-ui/core/styles';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    GridList,
    CardContent,
    GridListTile,
    Link
} from "@material-ui/core";
import Value from "../../main/blockchain/blocks/Value";

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
    card: {
        minWidth: 340,
        "& .MuiGridListTile-tile": {
            backgroundColor: "#F5F5F5",
        },
    },
    header: {
        fontSize: "22px",
        fontWeight: 600,
        lineHeight: "22px",
    },
    dialog: {
        height: 500
    },
    mergeLatLon: {
        textAlign: "center",
        fontSize: "14px",
        color: "#6A7181",
        marginTop: "-5%"
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

export default function Actions({
                                    markerPlace,
                                    similarMarkerPlace,
                                    oprId,
                                    similarOprId,
                                    images,
                                    onActionClick,
                                    onMerge,
                                    categories
                                }) {

    const classes = useStyles();
    const [openTripAdvisorDialog, setOpenTripAdvisorDialog] = useState(false);
    const [openPermanentlyClosedDialog, setPermanentlyClosedDialog] = useState(false);
    const [openMergeDialog, setMergeDialog] = useState(false);
    const [errorText, setErrorText] = useState(null);
    const TripAdvisorUrl = '^(http(s?):\\/\\/)?([\\w-]+\\.)+(tripadvisor).*?$'

    let idOsmLinkMarkerPlace;
    let deletedOsmMarkerPlace;
    let osmIdMarkerPlace;
    let idTripAdLinkMarkerPlace;
    let tripAdIdMarkerPlace;
    let tripMarkerPlace;

    let idOsmLinkSimilarMarkerPlace;
    let deletedOsmSimilarMarkerPlace;
    let osmIdSimilarMarkerPlace;
    let idTripAdLinkSimilarMarkerPlace;
    let tripAdIdSimilarMarkerPlace;
    let tripSimilarMarkerPlace;

    {
        markerPlace && markerPlace.sources && Object.entries(markerPlace.sources).map(([sourceType, source], index) => source.length > 0 ?
            getParam(sourceType, source, markerPlace) : '')
    }

    {
        similarMarkerPlace && similarMarkerPlace.sources && Object.entries(similarMarkerPlace.sources).map(([sourceType, source], index) => source.length > 0 ?
            getParam(sourceType, source, similarMarkerPlace) : '')
    }

    const handleClickOpenTripAdvisorDialog = () => {
        setOpenTripAdvisorDialog(true);
    };

    const handleClickCloseTripAdvisorDialog = () => {
        setOpenTripAdvisorDialog(false);
    };

    const handleClickPermanentlyClosedDialog = () => {
        setPermanentlyClosedDialog(true);
    };

    const handleClickClosePermanentlyClosedDialog = () => {
        setPermanentlyClosedDialog(false);
    };

    const handleClickOpenMergeDialog = () => {
        setMergeDialog(true);
    };

    const handleClickCloseMergeDialog = () => {
        setMergeDialog(false);
    };

    function getParam(sourceType, source, place) {

        const {id, type, deleted} = source[source.length - 1];

        let idOsmLink;
        let deletedOsm;
        let osmId;

        let idTripAdLink;
        let idTripAdTxt;
        let trip;

        if (sourceType === 'osm') {
            idOsmLink = 'https://www.openstreetmap.org/' + type + '/' + id;
            deletedOsm = deleted;
            osmId = id;
        } else if (sourceType === 'tripadvisor') {
            trip = true;
            idTripAdTxt = (id.length === 2 ? id[0] + '-' + id[1] : id);
            idTripAdLink = 'https://www.tripadvisor.com/' + idTripAdTxt;
        }

        if (place === markerPlace) {
            {idOsmLink ? idOsmLinkMarkerPlace = idOsmLink : idOsmLinkMarkerPlace}
            deletedOsmMarkerPlace = deletedOsm;
            {osmId ? osmIdMarkerPlace = osmId : osmIdMarkerPlace}
            {idTripAdLink ? idTripAdLinkMarkerPlace = idTripAdLink : idTripAdLinkMarkerPlace}
            {idTripAdTxt ?  tripAdIdMarkerPlace = idTripAdTxt : tripAdIdMarkerPlace}
            tripMarkerPlace = trip;
        }

        if (place === similarMarkerPlace) {
            {idOsmLink ? idOsmLinkSimilarMarkerPlace = idOsmLink : idOsmLinkSimilarMarkerPlace}
            deletedOsmSimilarMarkerPlace = deletedOsm;
            {osmId ? osmIdSimilarMarkerPlace = osmId : osmIdSimilarMarkerPlace}
            {idTripAdLink ? idTripAdLinkSimilarMarkerPlace = idTripAdLink : idTripAdLinkSimilarMarkerPlace}
            {idTripAdTxt ?  tripAdIdSimilarMarkerPlace = idTripAdTxt : tripAdIdSimilarMarkerPlace}
            tripSimilarMarkerPlace = trip;
        }
    }

    function onChange(event) {
        if (event.target.value.match(TripAdvisorUrl)) {
            setErrorText('')
        } else {
            setErrorText('Link is not valid or doesn\'t contains Trip Advisor ID.')
        }
    }

    function showIconAvailability(isTrue) {
        if (isTrue) {
            return <ListItemIcon className={classes.root}> <img src={actionDone} alt="actionDone"
                                                                className={classes.icon}/> </ListItemIcon>
        } else return <ListItemIcon className={classes.root}> <img src={actionRemove} alt="actionRemove"
                                                                   className={classes.icon}/> </ListItemIcon>
    }

    function checkOSM(place) {

        let idLink;
        let idTxt;
        let deleted;

        if (place === markerPlace) {
            idLink = idOsmLinkMarkerPlace;
            idTxt = osmIdMarkerPlace;
            deleted = deletedOsmMarkerPlace;
        }
        if (place === similarMarkerPlace) {
            idLink = idOsmLinkSimilarMarkerPlace;
            idTxt = osmIdSimilarMarkerPlace;
            deleted = deletedOsmSimilarMarkerPlace;
        }

            if (deleted) {
                return <span> Deleted: {idTxt && idLink ? <Link href={`${idLink}`}>{idTxt}</Link> :
                        <Value color={"#2D69E0"}>{idTxt}</Value>} {showIconAvailability(false)}</span>
            } else {
                return <span>id: {idTxt && idLink ? <Link href={`${idLink}`}>{idTxt}</Link> :
                        <Value color={"#2D69E0"}>{idTxt}</Value>} {showIconAvailability(true)}</span>
            }

    }

    function checkPhoto(place) {
        let countPhotos = 0;
        if (place.images) {
            {Object.keys(categories).map((category, index) => place.images[category] && place.images[category].length > 0 ? countPhotos += place.images[category].length: countPhotos)}
            return <span>{countPhotos} {showIconAvailability(true)}</span>
        } else
            return <span>{countPhotos} {showIconAvailability(false)}</span>
    }

    function checkTripAd(place) {

        let idLink;
        let idTxt;
        let trip;

        if (place === markerPlace) {
            idLink = idTripAdLinkMarkerPlace;
            idTxt = tripAdIdMarkerPlace;
            trip = tripMarkerPlace;
        }
        if (place === similarMarkerPlace) {
            idLink = idTripAdLinkSimilarMarkerPlace;
            idTxt = tripAdIdSimilarMarkerPlace;
            trip = tripSimilarMarkerPlace;
        }

        if (trip) {
            return <div>
                <span>{idTxt && idLink ? <Link href={`${idLink}`}>{idTxt}</Link> :
                    <Value color={"#2D69E0"}>{idTxt}</Value>} {showIconAvailability(true)}</span>
            </div>
        } else
            return <span>link not added {showIconAvailability(false)}</span>
    }

    function saveTripAdvisorLink() {
    }

    function checkTripAdvisor() {
        if (!tripMarkerPlace) {
            return (
                <div><ListItem button onClick={handleClickOpenTripAdvisorDialog} className={classes.list}>
                    <ListItemIcon>
                        <img src={tripAdvisorIcon} alt="tripAdvisorIcon" className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary="Link with Trip Advisor"/>
                </ListItem>
                    <Dialog open={openTripAdvisorDialog} onClose={handleClickCloseTripAdvisorDialog}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Link with Trip Advisor</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To connect this place search & paste the web link on this place on TripAdvisor website.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                id="filled-required"
                                label="Label"
                                defaultValue="https://"
                                variant="filled"
                                fullWidth
                                helperText={errorText}
                                onChange={onChange.bind(this)}/>
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit"
                                    className={classes.button}
                                    variant="contained"
                                    color={"primary"}
                                    onClick={saveTripAdvisorLink}>
                                Link
                            </Button>
                            <Button type="submit"
                                    className={classes.buttonClose}
                                    variant="contained"
                                    onClick={handleClickCloseTripAdvisorDialog}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }

    function checkDuplicate() {
        if (similarMarkerPlace && similarMarkerPlace.title) {
            return (
                <div><ListItem button onClick={handleClickOpenMergeDialog} className={classes.list}>
                    <ListItemIcon>
                        <img src={wikiIcon} alt="openStreetMapIcon" className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary="Possible duplicate:"
                                  secondary={similarMarkerPlace.title}/>
                </ListItem>
                    <Dialog maxWidth="xl" open={openMergeDialog} onClose={handleClickCloseMergeDialog}
                            aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Merge possible duplicates</DialogTitle>
                        <DialogContent>
                            <div>
                                <GridList cols={2} spacing={10} style={{backgroundColor: "white"}}>
                                    <GridListTile style={{height: "auto"}} className={classes.card}>
                                        <CardContent>
                                                <p style={{textAlign: "center", fontSize: "16px"}}
                                                   className={classes.header}>{markerPlace && markerPlace.title}</p>
                                                <p style={{textAlign: "center", fontSize: "14px", color: "#2d69e0"}}>
                                                    <Link href={`/data/objects/opr_place?key=${oprId}`}>View</Link></p>
                                                <p className={classes.mergeLatLon}>
                                                    <Value>{markerPlace && markerPlace.latLon && markerPlace.latLon[0].toFixed(5)}, {markerPlace && markerPlace.latLon && markerPlace.latLon[1].toFixed(5)}</Value>
                                                </p>
                                            <List>
                                                <ListItem>
                                                    <ListItemText className={classes.secondary} primary="OpenStreetMap"
                                                                  secondary={checkOSM(markerPlace)}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className={classes.secondary} primary="TripAdvisor"
                                                                  secondary={checkTripAd(markerPlace)}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className={classes.secondary} primary={"Photos: "}
                                                                  secondary={checkPhoto(markerPlace)}/>
                                                </ListItem>
                                            </List>
                                        </CardContent>
                                    </GridListTile>
                                    <GridListTile style={{height: "auto"}} className={classes.card}>
                                        <CardContent>
                                                <p style={{textAlign: "center", fontSize: "16px"}}
                                                   className={classes.header}>{similarMarkerPlace && similarMarkerPlace.title}</p>
                                                <p style={{textAlign: "center", fontSize: "14px", color: "#2d69e0"}}>
                                                    <Link
                                                        href={`/data/objects/opr_place?key=${similarOprId}`}>View</Link>
                                                </p>
                                                <p className={classes.mergeLatLon}>
                                                    <Value>{similarMarkerPlace.latLon && similarMarkerPlace.latLon[0].toFixed(5)}, {similarMarkerPlace.latLon && similarMarkerPlace.latLon[1].toFixed(5)}</Value>
                                                </p>
                                            <List>
                                                <ListItem>
                                                    <ListItemText className={classes.secondary} primary="OpenStreetMap"
                                                                  secondary={checkOSM(similarMarkerPlace)}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className={classes.secondary} primary="TripAdvisor"
                                                                  secondary={checkTripAd(similarMarkerPlace)}/>
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText className={classes.secondary} primary={"Photos: "}
                                                                  secondary={checkPhoto(similarMarkerPlace)}/>
                                                </ListItem>
                                            </List>
                                        </CardContent>
                                    </GridListTile>
                                </GridList>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit"
                                    className={classes.button}
                                    variant="contained"
                                    color={"primary"}
                                    onClick={onMerge}>
                                Merge
                            </Button>
                            <Button type="submit"
                                    className={classes.buttonClose}
                                    variant="contained"
                                    onClick={handleClickCloseMergeDialog}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }

    function checkReviewImages() {
        if (images) {
            return (
                <ListItem button onClick={() => onActionClick("reviewImages")} className={classes.list}>
                    <ListItemIcon>
                        <img src={openStreetMapIcon} alt="openStreetMapIcon" className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary={'Review ' + images.length + ' photos'}/>
                </ListItem>
            );
        }
    }

    function checkPermanentlyClosed() {
        return (
            <div>
                <ListItem button onClick={handleClickPermanentlyClosedDialog}>
                    <ListItemIcon>
                        <img src={wikiIcon} alt="openStreetMapIcon" className={classes.icon}/>
                    </ListItemIcon>
                    <ListItemText className={classes.link} primary="Mark place as permanently closed"/>
                </ListItem>
                <Dialog open={openPermanentlyClosedDialog} onClose={handleClickClosePermanentlyClosedDialog}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Mark place as permanently closed</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Place won't be deleted from OpenPlaceReviews but it will be marked as permanently closed.
                            This action could be reverted by administrator.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            id="filled-required"
                            defaultValue="Optional comment"
                            variant="filled"
                            fullWidth/>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit"
                                className={classes.button}
                                variant="contained"
                                color={"primary"}
                                onClick={handleClickClosePermanentlyClosedDialog}>
                            Mark as closed
                        </Button>
                        <Button type="submit"
                                className={classes.buttonClose}
                                variant="contained"
                                onClick={handleClickClosePermanentlyClosedDialog}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return <BlockExpandable header='Actions to take' open={false}>
        <div className={classes.list}>
            <List component="nav" aria-label="main mailbox folders">
                {checkTripAdvisor()}
                {checkReviewImages()}
                {checkDuplicate()}
                {checkPermanentlyClosed()}
            </List>
        </div>
    </BlockExpandable>
}