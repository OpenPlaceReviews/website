import React from 'react';

import { makeStyles } from "@material-ui/styles";

import { Box, Link } from "@material-ui/core";
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
        marginTop:"5px"
    },
    icon: {
        width: "24px",
        height: "24px",
        margin: "5px 12px 0 0",
    },
    subheader: {
        fontWeight: "normal",
        fontSize: "14px"
    }
})

export default function AttributesBar({ sourceType, sources, open }) {

    const { tags, version, id, changeset, timestamp, type, deleted, lat, lon } = sources[sources.length - 1];

    let title;
    let icon;
    let idTxt = id;
    let idLink;
    let changesetLink = '#';
    if (sourceType === 'osm') {
        title = deleted ? 'OpenStreetMap - Deleted' : 'OpenStreetMap';
        icon = openStreetMapIcon;
        idLink = 'https://www.openstreetmap.org/' + type + '/' + id;
        changesetLink = changeset ? 'https://www.openstreetmap.org/changeset/' + changeset : idLink;
    } else if (sourceType === 'tripadvisor') {
        title = 'Trip Advisior';
        icon = tripAdvisorIcon;
        idTxt = (id.length === 2 ? id[0] + '-' + id[1] : id);
        idLink = 'https://www.tripadvisor.com/' + idTxt;
    } else {
        title = 'Attributes';
    }

    const classes = useStyles();

    let tagsKeys = [];
    if (_.isObject(tags)) {
        tagsKeys = Object.keys(tags);
    }

    const top = <Box display="flex" flexDirection="row" style={{ marginBottom: "10px" }}>
        {icon && <img src={icon} alt="icon" className={classes.icon} />}
        <div>
            <p className={classes.header}>{title}</p>
            <p className={classes.subheader}>
                {id && idLink ? <Link href={`${idLink}`}>{idTxt}</Link> : <Value color={"#2D69E0"}>{idTxt}</Value>}
                <SpecChar code={'\u2022'} />
                {tagsKeys && <span>{tagsKeys.length} {tagsKeys.length > 1 ? 'tags' : 'tag'}</span>}
            </p>
        </div>
    </Box>;

    return <BlockExpandable header={top} open={open}>
        {version && <p>Version #{version} <SpecChar code={'\u2014'}/> Changeset #<Link href={`${changesetLink}`}>{changeset}</Link></p>}
        {(lat && lon) ? <p>Location: <Value>{lat.toFixed(5)}, {lon.toFixed(5)}</Value></p> : null}
        {timestamp && <p>Timestamp: {timestamp}</p>}
        {deleted && <p>Deleted timestamp: {deleted}</p>}
        {tags && <TagsTable tags={tags} />}
    </BlockExpandable>
}