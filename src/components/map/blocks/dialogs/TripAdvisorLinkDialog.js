import React, {useState} from 'react';
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
})

export default function TripAdvisorLinkDialog({
                                              open,
                                              onClose
                                          }) {

    const classes = useStyles();

    const [errorText, setErrorText] = useState(null);
    const [url, setUrl] = useState(null);

    function onChange(event) {
        setUrl(event.target.value)

        if (url.match(TRIP_ADVISOR_URL)) {
            setErrorText('')
        } else {
            setErrorText('Link is not valid or doesn\'t contains Trip Advisor ID.')
        }
    }

    function saveTripAdvisorLink() {
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