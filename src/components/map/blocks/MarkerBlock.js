import React, {useContext, useState} from 'react';

import useExtractObject from "../hooks/useExtractObject";
import useDiff from "../hooks/useDiff";
import useCommitOp from "../hooks/useCommitOp";

import BlockExpandable from "./BlockExpandable";
import OPRAttributesBar from "./OPRAttributesBar";
import MapSidebar from "./sidebar/MapSidebar";
import ReviewImagesBlock from "./ReviewImagesBlock";
import OPRLink from "../../main/blocks/OPRLink";
import ImagesCarousel from "./ImagesCarousel";

import AuthContext from "../../main/auth/providers/AuthContext";
import MapSidebarBlock from "./sidebar/MapSidebarBlock";

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

    useExtractObject(marker, version, handleExtractPlace);
    useDiff(places[0], places[1], setOp);
    useCommitOp(op, authData, handleUpdatePlace);

    let imagesSidebar;
    if(place && place.images) {
        const {images} = place;
        imagesSidebar = <React.Fragment>
            {images.review.length > 0 ? <BlockExpandable header={`Photos - To review (${images.review.length})`}>
                {authData.token ? <ReviewImagesBlock place={place} onSubmit={setPlaces}/> : <p><OPRLink to="/login">Log in</OPRLink> to review photos</p>}
            </BlockExpandable> : ''}

            {images.outdoor.length > 0 ? <BlockExpandable header={`Photos - Outdoor (${images.outdoor.length})`}>
                <ImagesCarousel items={images.outdoor}/>
            </BlockExpandable> : ''}

            {images.indoor.length > 0 ? <BlockExpandable header={`Photos - Indoor (${images.indoor.length})`}>
                <ImagesCarousel items={images.indoor}/>
            </BlockExpandable> : ''}
        </React.Fragment>;
    }

    return <MapSidebar position="topleft">
        <MapSidebarBlock>
            <BlockExpandable header="Attributes" open={true}>
                <OPRAttributesBar feature={marker} setMarker={setMarker}/>
            </BlockExpandable>

            {imagesSidebar}
        </MapSidebarBlock>
    </MapSidebar>;
};