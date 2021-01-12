import React from "react";
import {makeStyles} from "@material-ui/styles";
import {Backdrop} from "@material-ui/core";
import Loader from "../../../../blocks/Loader";

const useStyles = makeStyles({
    fade: {
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        zIndex: "9000",
    },
    form: {
        position: "relative",
    }
});

export default function Form({onSubmit, submitted, children}){
    const classes = useStyles();
    return <form className={classes.form} autoComplete="off" onSubmit={onSubmit}>
        {children}
        <Backdrop open={submitted} className={classes.fade}>
            <Loader position="absolute"/>
        </Backdrop>
    </form>
};