import MergeListDialog from "./blocks/dialogs/MergeListDialog";
import React, {useEffect, useState} from "react";

export default function MergeList({
                                      mergeListDialogOpen,
                                      mergePlaces,
                                      placeTypes,
                                      setMergeListDialogOpen,
                                      taskSelection
                                  }) {

    const [idsPlacesCache, setIdsPlacesCache] = useState([]);
    const [alreadyReviewed, setAlreadyReviewed] = useState([]);

    useEffect(() => {
        idsPlacesCache.splice(0, idsPlacesCache.length)
        setIdsPlacesCache(idsPlacesCache);
        alreadyReviewed.splice(0, alreadyReviewed.length)
        setAlreadyReviewed(alreadyReviewed);
    }, [mergePlaces]);

    return mergeListDialogOpen &&
        <MergeListDialog mergePlaces={mergePlaces} placeTypes={placeTypes} mergeListDialogOpen={mergeListDialogOpen}
                         setMergeListDialogOpen={setMergeListDialogOpen}
                         idsPlacesCache={idsPlacesCache} setIdsPlacesCache={setIdsPlacesCache}
                         setAlreadyReviewed={setAlreadyReviewed}
                         taskSelection={taskSelection} alreadyReviewed={alreadyReviewed}/>

}