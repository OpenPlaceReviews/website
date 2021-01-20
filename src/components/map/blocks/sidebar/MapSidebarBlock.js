import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        fontFamily: "IBM Plex Sans",
        padding: "10px 15px",
        background: "#FFFFFF",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "12px",
        marginBottom: "20px",
        width: (props) => props.width ? props.width : "300px",
    },
});

export default function MapSidebarBlock({children, width}) {
    console.log(width);
    const classes = useStyles({width});

    return <div className={classes.root}>
        {children}
    </div>;
};