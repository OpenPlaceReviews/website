import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        display: "inline-block",
        margin: "0 3px",
    }
})

export default function SpecChar({code}) {
    const classes = useStyles();
    return <span className={classes.root}>{code}</span>
};