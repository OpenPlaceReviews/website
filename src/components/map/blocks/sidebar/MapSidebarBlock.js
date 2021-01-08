import React from 'react';
import {Accordion, AccordionSummary, AccordionDetails} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    accordion: {
        width: "100%",
    },
    details: {
        display: "block",
    },
    summary: {
      fontSize: "1rem",
      fontWeight: 600,
    },
});

export default function MapSidebarBlock({name, onChange, expanded, header, children}) {
    const classes = useStyles();
    return <Accordion square expanded={expanded === name} onChange={onChange(name)} className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
            {header}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
            {children}
        </AccordionDetails>
    </Accordion>
};