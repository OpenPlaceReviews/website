import React, {useEffect, useState} from 'react';
import warningIcon from "../../../../assets/images/map_sources/ic_warning.png";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Link,
    TextField
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const TRIP_ADVISOR_URL_PATTERN = '^(http(s?):\\/\\/)?(.*\\.tripadvisor\\..*)\\/(.*)(g\\d+)-(d\\d+).*$';

const useStyles = makeStyles({
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
    warning: {
        width: "24px",
        height: "24px",
        margin: "5px 0 -5px 0",
    },
    dialog: {
        "& .MuiDialogActions-root": {
            padding: "5px 24px 5px 0",
        },
    }
})

export default function TripAdvisorLinkDialog({
                                              open,
                                              onClose,
                                              place,
                                              markerPlace,
                                              setPlaces
                                          }) {

    const classes = useStyles();

    const [errorText, setErrorText] = useState(null);
    const [url, setUrl] = useState(null);

    const errorTextNotValidLink = () => {
        return <><img src={warningIcon} alt="warningIcon" className={classes.warning}/> Link is not valid or doesn't contain Trip Advisor ID.</>
    }

    const errorTextDuplicateLink = () => {
        return <><img src={warningIcon} alt="warningIcon" className={classes.warning}/> Such link already exists.</>
    }

    function onChange(event) {
        setUrl(event.target.value)
    }

    useEffect(() => {
        setUrl(null);
    }, [open]);

    useEffect(() => {
        if (!url || url.match(TRIP_ADVISOR_URL_PATTERN)) {
            setErrorText('')
        } else {
            setErrorText(errorTextNotValidLink)
        }
    }, [url]);

    let saveTripAdvisorLink = () => {
        let matchResultTripAdvisorLink = url.match(TRIP_ADVISOR_URL_PATTERN);
        if (matchResultTripAdvisorLink) {
            let newTripAdvisorId = [matchResultTripAdvisorLink[5], matchResultTripAdvisorLink[6]];
            let newPlace = JSON.parse(JSON.stringify(place));
            let newPlaceTripAdvisorSources = newPlace.source['tripadvisor'];
            let newTripAdvisorSource = {"id": newTripAdvisorId};

            if (!newPlaceTripAdvisorSources) {
                newPlace.source['tripadvisor'] = [newTripAdvisorSource];
                setPlaces([place, newPlace])
                onClose()
            } else if (place.source['tripadvisor'].find(source => JSON.stringify(source.id) === JSON.stringify(newTripAdvisorId))) {
                setErrorText(errorTextDuplicateLink)
            } else {
                newPlaceTripAdvisorSources.push(newTripAdvisorSource)
                setPlaces([place, newPlace])
                onClose()
            }
        } else {
            setErrorText(errorTextNotValidLink)
        }
    }

    return <Dialog open={open} onClose={onClose}
                   aria-labelledby="form-dialog-title" className={classes.dialog}>
        <DialogTitle id="form-dialog-title">Link with Trip Advisor</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To connect this place search & paste the web link on this place on TripAdvisor website.
                <Link href={`https://www.google.com/search?q=tripadvisor+${markerPlace.title}`}
                      onClick={window.opener} target="_blank" rel="noopener"> Search on Google</Link>
            </DialogContentText>
            <TextField
                autoFocus
                id="filled-required"
                label="Link"
                placeholder="https://"
                variant="filled"
                fullWidth
                helperText={errorText}
                onChange={onChange}/>
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
                    onClick={onClose}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
}