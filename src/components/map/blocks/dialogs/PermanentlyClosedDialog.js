import React, {useEffect, useState} from 'react';
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
    dialog: {
        "& .MuiDialogActions-root": {
            padding: "5px 24px 5px 0",
        },
    }
})

export default function PermanentlyClosedDialog({
                                                    open,
                                                    onClose,
                                                    place,
                                                    setPlaces
                                                }) {
    const [deletedComment, setDeletedComment] = useState(null);

    const classes = useStyles();

    function onChange(event) {
        setDeletedComment(event.target.value)
    }

    useEffect(() => {
        setDeletedComment(null);
    }, [open]);

    let savePermanentlyClosedMarker = () => {

        let newPlace = JSON.parse(JSON.stringify(place));
        let newPlaceDeletedMarker = newPlace.deleted;
        let newPlaceDeletedComment = newPlace.deletedComment;

        if (newPlaceDeletedMarker === undefined) {
            newPlace["deleted"] = new Date().toISOString();
            if (newPlaceDeletedComment === undefined) {
                newPlace["deletedComment"] = deletedComment;
            }

            setPlaces([place, newPlace])
            onClose()
        }
    }

    return <Dialog open={open} onClose={onClose}
                   aria-labelledby="form-dialog-title" className={classes.dialog}>
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
                placeholder="Optional comment"
                variant="filled"
                fullWidth
                onChange={onChange}/>
        </DialogContent>
        <DialogActions>
            <Button type="submit"
                    className={classes.button}
                    variant="contained"
                    color={"primary"}
                    onClick={savePermanentlyClosedMarker}>
                Mark as closed
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