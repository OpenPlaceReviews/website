import React, {useContext, useState} from 'react';

import {usePromiseTracker} from "react-promise-tracker";
import useExtractObject from "../../hooks/useExtractObject";
import useDiff from "../../hooks/useDiff";
import useCommitOp from "../../hooks/useCommitOp";

import MapSidebarBlock from "./MapSidebarBlock";
import OPRAttributesBar from "../OPRAttributesBar";
import MapSidebar from "./MapSidebar";
import Loader from "../../../main/blocks/Loader";
import ReviewImagesBlock from "../ReviewImagesBlock";
import OPRLink from "../../../main/blocks/OPRLink";
import ImagesCarousel from "../ImagesCarousel";

import AuthContext from "../../../main/auth/providers/AuthContext";

export default function MarkerBlock({marker, setMarker}) {
    const [op, setOp] = useState(null);
    const [places, setPlaces] = useState([]);
    const [version, setVersion] = useState(0);

    const [place] = places;

    const {authData} = useContext(AuthContext);

    const handleExtractPlace = (object) => {
        setPlaces([object, object]);
    }

    const handleUpdatePlace = () => {
        setVersion(place.version + 1);
    }

    const { promiseInProgress } = usePromiseTracker();
    useExtractObject(marker, version, handleExtractPlace);
    useDiff(places[0], places[1], setOp);
    useCommitOp(op, authData, handleUpdatePlace);

    let imagesSidebar;
    if(place && place.images) {
        const {images} = place;
        imagesSidebar = <React.Fragment>
            {images.review.length > 0 ? <MapSidebarBlock header={`Photos - To review (${images.review.length})`}>
                {authData.token ? <ReviewImagesBlock place={place} onSubmit={setPlaces}/> : <p><OPRLink to="/login">Log in</OPRLink> to review photos</p>}
            </MapSidebarBlock> : ''}

            {images.outdoor.length > 0 ? <MapSidebarBlock header={`Photos - Outdoor (${images.outdoor.length})`}>
                <ImagesCarousel items={images.outdoor}/>
            </MapSidebarBlock> : ''}

            {images.indoor.length > 0 ? <MapSidebarBlock header={`Photos - Indoor (${images.indoor.length})`}>
                <ImagesCarousel items={images.indoor}/>
            </MapSidebarBlock> : ''}
        </React.Fragment>;
    }

    return <MapSidebar position="topleft">
        <MapSidebarBlock header="Attributes" open={true}>
            <OPRAttributesBar feature={marker} setMarker={setMarker}/>
        </MapSidebarBlock>

        {promiseInProgress && <Loader position="relative"/>}

        {imagesSidebar}
    </MapSidebar>;
};