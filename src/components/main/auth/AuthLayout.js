import React from 'react';
import {makeStyles} from "@material-ui/styles";
import AuthRouter from "./AuthRouter";

const useStyles = makeStyles({
    authContainer: {
        minWidth: "280px",
        maxWidth: "540px",
        margin: "0 auto",
        color: "#212121",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "26px",
        fontSize: "16px",
        letterSpacing: "0.02em",
        minHeight: "calc(100vh - 217px)",
        marginBottom: "40px",
        padding: "0 20px",
    }
});

export default function AuthLayout() {
    const classes = useStyles();
    return <div className={classes.authContainer}>
        <AuthRouter/>
    </div>;
}