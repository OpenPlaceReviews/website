import React from 'react';
import MapSidebarBlock from "./MapSidebarBlock";
import StatusBar from "../StatusBar";
import Filter from "../Filter";

const OPRStatusBar = React.memo(StatusBar);
const OPRMarkersFilter = React.memo(Filter);

export default function FilterBlock({placeTypes, status, setFilter}) {
    return <MapSidebarBlock header="Filter places" open={true}>
        <OPRMarkersFilter placeTypes={placeTypes} onSelect={setFilter}/>
        <OPRStatusBar status={status}/>
    </MapSidebarBlock>;
};