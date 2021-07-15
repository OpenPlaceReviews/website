import MergeListDialog from "./blocks/dialogs/MergeListDialog";
import React, {useEffect, useState} from "react";

export default function MergeList({mergeListDialogOpen, mergePlaces, placeTypes, setMergeListDialogOpen}) {

    const [idsPlacesCache, setIdsPlacesCache] = useState([]);

    useEffect(() => {
        idsPlacesCache.splice(0, idsPlacesCache.length)
        setIdsPlacesCache(idsPlacesCache);
    }, [mergePlaces]);

    return mergeListDialogOpen &&
        <MergeListDialog mergePlaces={mergePlaces} placeTypes={placeTypes} mergeListDialogOpen={mergeListDialogOpen}
                         setMergeListDialogOpen={setMergeListDialogOpen}
                         idsPlacesCache={idsPlacesCache} setIdsPlacesCache={setIdsPlacesCache}/>

}