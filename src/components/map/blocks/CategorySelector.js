import React from 'react';
import {Box, Button, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    selector: {
        height: "35px",
        background: "#FFF",
    },
    button: {
        height: "35px",
    },
});

export default function CategorySelector({value, onChange, onSubmit, disabled}) {
    const classes = useStyles();

    return <Box display="flex" flexDirection="row" justifyContent="space-around">
        <Select className={classes.selector} value={value} variant="outlined" onChange={onChange}>
            <MenuItem value="review">Review</MenuItem>
            <MenuItem value="outdoor">Outdoor</MenuItem>
            <MenuItem value="indoor">Indoor</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
        </Select>
        <Button
            type="submit"
            className={classes.button}
            color="primary"
            variant="contained"
            disabled={disabled}
            onClick={onSubmit}
        >Submit</Button>
    </Box>;
}