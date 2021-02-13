import React from 'react';
import {Box, Button, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Capitalize from "../../util/Utils";

const useStyles = makeStyles({
    root: {
        margin: "10px 0",
    },
    selector: {
        height: "35px",
        background: "#FFF",
    },
    button: {
        height: "35px",
    },
});

export default function CategorySelector({value, categories, onChange, onSubmit, disabled}) {
    const classes = useStyles();

    return <Box display="flex" flexDirection="row" justifyContent="space-around" className={classes.root}>
        <Select className={classes.selector} value={value} variant="outlined" onChange={onChange}>
            <MenuItem value="review">Review</MenuItem>            
            {categories && Object.keys(categories).map((category, index) => <MenuItem key={index} value={category}>{Capitalize(category)}</MenuItem>)}
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