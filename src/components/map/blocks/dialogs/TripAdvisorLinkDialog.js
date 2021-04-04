import React, {useState} from 'react';
import warningIcon from "../../../../assets/images/map_sources/ic_warning.png";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const TRIP_ADVISOR_URL = '^(http(s?):\\/\\/)?([\\w-]+\\.)+(tripadvisor).*?$';
const TRIP_ADVISOR_ID = '.*\\.tripadvisor\\.ru\\/.*?-(g\\d+)-(d\\d+).*';

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
})

export default function TripAdvisorLinkDialog({
                                              open,
                                              onClose,
                                              place,
                                              setPlaces
                                          }) {

    const classes = useStyles();

    const [errorText, setErrorText] = useState(null);
    const [url, setUrl] = useState(null);

    const errorTextNotValidLink = () => {
        return <div><img src={warningIcon} alt="warningIcon" className={classes.warning}/> Link is not valid
            or doesn't contains Trip Advisor ID.</div>
    }

    const errorTextDuplicateLink = () => {
        return <div><img src={warningIcon} alt="warningIcon" className={classes.warning}/> Such link already exists.
        </div>
    }
    function onChange(event) {
        setUrl(event.target.value)
        if (url.match(TRIP_ADVISOR_URL)) {
            setErrorText('')
        } else {
            setErrorText(errorTextNotValidLink)
        }
    }

    let saveTripAdvisorLink = () => {

        let matchResultTripAdvisorLink = url.match(TRIP_ADVISOR_ID);

        if (matchResultTripAdvisorLink) {
            let newTripAdvisorId = [matchResultTripAdvisorLink[1], matchResultTripAdvisorLink[2]];
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
                    onClick={onClose}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
}