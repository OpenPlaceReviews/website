import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    tags: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        border: "1px solid #ddd",
        "& dd, & dt": { padding: "0.5rem", margin: "0" },
        "& dt": { backgroundColor: "#F6F6F6", color: "#2D69E0", borderTop: "1px solid #ddd" },
        "& dd": {
            borderLeft: "1px solid #ddd",
            borderTop: "1px solid #ddd"
        },
        "& dt:first-child": { borderTop: "none" }
    },
    value: {
        wordBreak:"break-all"
    }

});

export default function TagsTable({tags}) {
    const popupTags = [];
    for (let t in tags) {
        popupTags.push({
            name: t,
            value: tags[t],
        });
    }

    const classes = useStyles();

    return <dl className={classes.tags}>
        {popupTags.map((tag, i) => <React.Fragment key={i}>
            <dt>{tag.name}</dt>
            <dd className={(tag.name.indexOf('\s') > -1) ? classes.value : null}>{tag.value}</dd>
        </React.Fragment>)}
    </dl>
}