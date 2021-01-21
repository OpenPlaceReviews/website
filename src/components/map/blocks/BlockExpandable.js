import React, {useState} from 'react';
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
    }
});

export default function BlockExpandable({header, children, open = false}) {
    const [expanded, setExpanded] = useState(open);
    const classes = useStyles();

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return <Accordion square expanded={expanded} onChange={handleChange} className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
            {header}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
            {children}
        </AccordionDetails>
    </Accordion>
};