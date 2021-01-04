import React, {useState} from 'react';
import {Collapse, Box, Button, Checkbox, FormHelperText} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    agreement: {
        border: "1px solid #CCD0D9",
        boxSizing: "border-box",
        borderRadius: "4px",
        marginBottom: "20px",
        "& label": {
            fontStyle: "normal",
            fontWeight: "bold",
            lineHeight: "normal",
            fontSize: "16px",
            letterSpacing: "0.02em",
        }
    },
    btnOpen: {
        margin: "0 0 20px 20px",
    },
    checkbox: {
        alignItems: "baseline",
        margin: "9px 9px",
        padding: "10px 10px",
        height: "20px",
        width: "20px",
    },
    label: {
        fontStyle: "normal",
        fontWeight: "bold",
        lineHeight: "normal",
        fontSize: "16px",
        letterSpacing: ".02em",
        marginTop: "20px",
        marginBottom: "15px"
    },
    description: {
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "normal",
        fontSize: "16px",
        letterSpacing: ".01em",
        marginBottom: "20px",
        marginRight: "20px",
    },
    inject: { padding: "0 20px 20px 20px" },
});

export default function Agreement(props) {
    const {onChange, checked, link, html, name, title, error, disabled} = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    return <div className={classes.agreement}>
        <Box display="flex" flexDirection="row">
            <Checkbox
                name={name}
                className={classes.checkbox}
                type="checkbox"
                required={true}
                onChange={onChange}
                color="primary"
                checked={checked}
                disabled={disabled}
            />
            <div>
                <p className={classes.label}>
                    I agree with <a href={link} target="_blank">{title}</a>
                </p>
                {!!error && <FormHelperText error={true}>{error}</FormHelperText>}
                <p className={classes.description}>
                    Please read Contribution Terms carefully and accept it before website. Your contributions will be provided under CC-0 License.
                </p>
            </div>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit className={classes.inject}>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </Collapse>
        <Button variant="outlined" className={classes.btnOpen} onClick={() => setOpen(!open)}>{open ? "Collapse" : "Read more"}</Button>
    </div>
};