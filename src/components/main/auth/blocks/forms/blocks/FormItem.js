import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {FormControl} from "@material-ui/core";

const useStyles = makeStyles({
    formItem: {
        marginBottom: "20px",
        display: "block",
        "& .input-description": {
            fontSize: "14px",
            letterSpacing: "0.01em",
            color: "rgba(49, 50, 51, 0.7)",
        }
    },
})

export default function FormItem({children}) {
    const classes = useStyles();
    return <FormControl className={classes.formItem}>
        {children}
    </FormControl>;
}