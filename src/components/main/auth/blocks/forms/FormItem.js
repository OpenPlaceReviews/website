import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    formItem: {
        marginBottom: "20px",
        "& .input-description": {
            fontSize: "14px",
            letterSpacing: "0.01em",
            color: "rgba(49, 50, 51, 0.7)",
        }
    },
})

export default function FormItem({children}) {
    const classes = useStyles();
    return <div className={classes.formItem}>
        {children}
    </div>;
}