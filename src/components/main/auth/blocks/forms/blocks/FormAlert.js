import React from 'react';
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    formAlert: {
        marginBottom: "20px",
    }
});

export default function FormAlert({open, onClose, children}) {
    const classes = useStyles();
    if (!open) {
        return null;
    }

    return <Alert
        className={classes.formAlert}
        severity="error"
        onClose={onClose}
    >
        {children}
    </Alert>;
}