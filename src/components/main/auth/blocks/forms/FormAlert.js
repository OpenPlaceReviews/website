import React, {useState} from 'react';
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    formAlert: {
        marginBottom: "20px",
    }
});

export default function FormAlert(props) {
    const [open, setOpen] = useState(props.open);

    const classes = useStyles();
    if (!open) {
        return null;
    }

    return <Alert
        className={classes.formAlert}
        severity="error"
        onClose={() => setOpen(false)}
    >
        {props.children}
    </Alert>;
}