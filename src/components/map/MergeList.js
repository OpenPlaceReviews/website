import MergeListDialog from "./blocks/dialogs/MergeListDialog";
import React, {useEffect, useState} from "react";
import Utils from "../util/Utils";

export default function MergeList({mergeListDialogOpen, mergePlaces, placeTypes, setMergeListDialogOpen}) {

    const [idsPlacesCache, setIdsPlacesCache] = useState([]);
    const prevMergePlaces = Utils.usePrevious(mergePlaces);
    const placesChanged = prevMergePlaces && (JSON.stringify(mergePlaces) !== JSON.stringify(prevMergePlaces));

    useEffect(() => {
        idsPlacesCache.splice(0, idsPlacesCache.length)
        setIdsPlacesCache(idsPlacesCache);
    }, [placesChanged]);

    return mergeListDialogOpen &&
        <MergeListDialog mergePlaces={mergePlaces} placeTypes={placeTypes} mergeListDialogOpen={mergeListDialogOpen}
                         setMergeListDialogOpen={setMergeListDialogOpen}
                         idsPlacesCache={idsPlacesCache} setIdsPlacesCache={setIdsPlacesCache}/>

}