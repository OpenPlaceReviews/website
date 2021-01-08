import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    messageOverlay: {
        padding: "15px",
        background: "#FFFFFF",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "12px",
        zIndex: 1100,
        position: "absolute",
        left: "50%",
        transform: "translateY(-50%)",
        top: "50px",
    },
});

export default function OPRMessageOverlay({children}) {
    const classes = useStyles();

    return <div className={classes.messageOverlay}>
        {children}
    </div>;
}