import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    link: {
        display: "inline !important",
        fontSize: "15px !important",
        color: "#2D69E0 !important",
        textDecoration: "none !important",
        verticalAlign: "middle !important",
        "&:active": {
            color: "#2D69E0 !important",
            textDecoration: "none !important",
        }
    },
});

export default function OPRLink({to, children}) {
    const classes = useStyles();
    return <Link to={to} className={classes.link}>{children}</Link>;
}