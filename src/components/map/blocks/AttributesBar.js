import React from 'react';

import {makeStyles} from "@material-ui/styles";

import {Box} from "@material-ui/core";
import BlockExpandable from "./BlockExpandable";
import TagsTable from "./TagsTable";
import Value from "../../main/blockchain/blocks/Value";
import SpecChar from "../../main/blockchain/blocks/SpecChar";

import openStreetMapIcon from '../../../assets/images/map_sources/openStreetMap.png';
import tripAdvisorIcon from '../../../assets/images/map_sources/trip-advisor.png';

const useStyles = makeStyles({
    header: {
        fontWeight: "600",
        fontSize: "18px",
    },
    icon: {
        width: "24px",
        height: "24px",
        margin: "5px 12px 0 0",
    },
    subheader: {
        fontWeight: "normal",
        fontSize: "14px",
    }
})

export default function AttributesBar({source}) {
    const {tags, version, id, changeset, timestamp, lat, lon, source_type} = source;

    let title;
    let icon;
    if (source_type === 'osm') {
        title = 'OpenSteetMap';
        icon = openStreetMapIcon;
    } else if (source_type === 'tripadvisor') {
        title = 'Trip Adwisior';
        icon = tripAdvisorIcon;
    } else if (source_type === 'old-osm-ids') {
        title = 'Deleted OpenStreetMap Place';
        icon = openStreetMapIcon;
    } else {
        title = 'Attributes';
    }

    const classes = useStyles();

    let tagsKeys = [];
    if (_.isObject(tags)) {
        tagsKeys = Object.keys(tags);
    }

    const top = <Box display="flex" flexDirection="row" style={{marginBottom: "10px"}}>
        {icon && <img src={icon} alt="icon" className={classes.icon}/>}
        <div>
            <p className={classes.header}>{title}</p>
            <p className={classes.subheader}>
                {id && <Value color={"#2D69E0"}>{id}</Value>}<SpecChar code={'\u2022'}/>
                {tagsKeys && <span>{tagsKeys.length} {tagsKeys.length > 1 ? 'tags' : 'tag'}</span>}
            </p>
        </div>
    </Box>;

    return <BlockExpandable header={top} open={true}>


        {version && <p>Version #{version} <SpecChar code={'\u2014'}/> Changeset <Value color={"#2D69E0"}>#{changeset}</Value></p>}
        {(lat && lon) ? <p>Location: <Value>{lat.toFixed(5)}, {lon.toFixed(5)}</Value></p> : null}
        {timestamp && <p>Timestamp: {timestamp}</p>}
        {tags && <TagsTable tags={tags}/>}
    </BlockExpandable>
}