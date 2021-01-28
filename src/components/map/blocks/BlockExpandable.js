import React, {useState} from 'react';
import {Accordion, AccordionSummary, AccordionDetails} from "@material-ui/core";
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        width: "100%",
        boxShadow: "none",
        margin: (props) => `${props.marginTop ? props.marginTop : 0} auto 0 auto !important`,
    },
    summary: {
        fontWeight: 600,
        fontSize: "16px",
        padding: 0,
        minHeight: "32px !important",
        "& .MuiIconButton-root": {
            padding: "0 15px",
        },
        "& .MuiAccordionSummary-content": {
            margin: "10px 0",
        },
        "& .MuiSvgIcon-root": {
            color: "#2D69E0",
        }
    },
    details: {
        position: "relative",
        display: "block",
        padding: 0,
        fontSize: "14px",
    },
});

export default function BlockExpandable({header, children, open = false, marginTop}) {
    const [expanded, setExpanded] = useState(open);
    const classes = useStyles({marginTop});

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return <Accordion square expanded={expanded} onChange={handleChange} className={classes.root}>
        <AccordionSummary expandIcon={<ArrowDropDown />} className={classes.summary}>
            {header}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
            {children}
        </AccordionDetails>
    </Accordion>
};