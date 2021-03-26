import React, {useState} from 'react';

import BlockExpandable from "./BlockExpandable";
import tripAdvisorIcon from "../../../assets/images/map_sources/trip-advisor.png";
import openStreetMapIcon from "../../../assets/images/map_sources/openStreetMap.png";
import wikiIcon from "../../../assets/images/map_sources/ic_logo_wikipedia.png";
import {makeStyles} from "@material-ui/styles";
import {List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button} from "@material-ui/core";

const useStyles = makeStyles({
    icon: {
        width: "24px",
        height: "24px",
        margin: "5px 12px 0 0",
    },
    list: {
        borderBottom:"1px solid #ececec"
    },
    link: {
        color:"#2D69E0"
    }
})

export default function Actions({ trip, duplicate, images, onActionClick}) {

    const classes = useStyles();
    const [openTripAdvisorDialog, setOpenTripAdvisorDialog] = useState(false);
    const [openPermanentlyClosedDialog, setPermanentlyClosedDialog] = useState(false);
    const [errorText, setErrorText] = useState(null);
    const TripAdvisorUrl = '^(http(s?):\\/\\/)?([\\w-]+\\.)+(tripadvisor).*?$'

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

    function onChange(event) {
        if (event.target.value.match(TripAdvisorUrl)) {
            setErrorText('' )
        } else {
            setErrorText('Link is not valid or doesn\'t contains Trip Advisor ID.'  )
        }
    }

    function checkTripAdvisor() {
        if (!trip) {
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
                            <Button onClick={handleClickCloseTripAdvisorDialog} color="primary">
                                Link
                            </Button>
                            <Button onClick={handleClickCloseTripAdvisorDialog} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }

    function checkDuplicate(){
        if(duplicate){
            return <ListItem button className={classes.list}>
                <ListItemIcon>
                    <img src={wikiIcon} alt="openStreetMapIcon" className={classes.icon} />
                </ListItemIcon>
                <ListItemText className={classes.link} primary="Possible duplicate:" secondary={duplicate} />
            </ListItem>
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
                        <Button onClick={handleClickClosePermanentlyClosedDialog} color="primary">
                            Mark as closed
                        </Button>
                        <Button onClick={handleClickClosePermanentlyClosedDialog} color="primary">
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