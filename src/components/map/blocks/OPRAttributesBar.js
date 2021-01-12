import React from 'react';

import {useMap} from "react-leaflet";
import {makeStyles} from "@material-ui/styles";

import {Box, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';

const useStyles = makeStyles({
    attributes: {
        "& p": { margin: "0" },
        width: "100%",
        overflowY: "auto",
    },
    header: {
        display: "inline !important",
        width: "auto !important",
        height: "auto !important",
        color: "#2D69E0 !important",
        textDecoration: "none !important",
        border: "none !important",
        fontWeight: "bold !important",
        fontSize: "20px !important",
        lineHeight: "31px !important",
        letterSpacing: "0.02em !important"
    },
    tags: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        border: "1px solid #ddd",
        "& dd, &dt": { padding: "0.3rem", margin: "0" },
        "& dt": { backgroundColor: "#F6F6F6", borderTop: "1px solid #ddd" },
        "& dd": {
            borderLeft: "1px solid #ddd",
            borderTop: "1px solid #ddd"
        },
        "& dt:first-child": { borderTop: "none" }
    },
    tagsItem: {
        padding: "0.3rem",
        margin: "0",
    }
})

export default function OPRAttributesBar({feature, setMarker}) {
    const lngLat = feature.geometry.coordinates;
    const {title, opr_id, tags, osm_id, osm_type} = feature.properties;

    const latLng = [lngLat[1], lngLat[0]];
    const popupTags = [];
    for (let t in tags) {
        popupTags.push({
            name: t,
            value: tags[t].value,
        });
    }

    const map = useMap();
    const classes = useStyles();

    return <div className={classes.attributes}>
        <Box display="flex" flexDirection="row" style={{marginBottom: "10px"}} alignItems="center" justifyContent="space-between">
            <a href={`/data/objects/opr_place?key=${opr_id}`} className={classes.header}>ID: {opr_id}</a>
            <div>
                <IconButton onClick={() => map.panTo(latLng)}>
                    <CenterFocusWeakIcon fontSize="small"/>
                </IconButton>
                <IconButton onClick={() => setMarker(null)}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </div>
        </Box>

        <div>
            <p><strong>{title}</strong></p>
            <p>
                <strong>Location: </strong>
                {latLng[0]}, {latLng[1]}
            </p>
            <dl className={classes.tags}>
                {popupTags.map((tag, i) => {
                    return <React.Fragment key={i}>
                        <dt className={classes.tagsItem}>{tag.name}</dt>
                        <dd className={classes.tagsItem}>{tag.value}</dd>
                    </React.Fragment>;
                })}
            </dl>
            {!!osm_id && <p><a href={`https://www.openstreetmap.org/${osm_type}/${osm_id}`}>OpenStreetMap</a></p>}
        </div>
    </div>;
}