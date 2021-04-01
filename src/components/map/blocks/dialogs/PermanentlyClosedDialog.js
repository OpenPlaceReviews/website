import React from 'react';
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
})

export default function PermanentlyClosedDialog({
                                                    open,
                                                    onClose
                                                }) {

    const classes = useStyles();

    return <Dialog open={open} onClose={onClose}
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
                    onClick={onClose}>
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