import MergeListDialog from "./blocks/dialogs/MergeListDialog";
import React, {useEffect, useState} from "react";

export default function MergeList({
                                      mergeListDialogOpen,
                                      mergePlaces,
                                      placeTypes,
                                      setMergeListDialogOpen,
                                      taskSelection
                                  }) {

    const [idsPlacesLocallyMerged, setIdsPlacesLocallyMerged] = useState([]);
    const [alreadyReviewed, setAlreadyReviewed] = useState([]);

    useEffect(() => {
        idsPlacesLocallyMerged.splice(0, idsPlacesLocallyMerged.length)
        setIdsPlacesLocallyMerged(idsPlacesLocallyMerged);
        alreadyReviewed.splice(0, alreadyReviewed.length)
        setAlreadyReviewed(alreadyReviewed);
    }, [mergePlaces]);

    return mergeListDialogOpen &&
        <MergeListDialog mergePlaces={mergePlaces} placeTypes={placeTypes} mergeListDialogOpen={mergeListDialogOpen}
                         setMergeListDialogOpen={setMergeListDialogOpen}
                         idsPlacesLocallyMerged={idsPlacesLocallyMerged} setIdsPlacesLocallyMerged={setIdsPlacesLocallyMerged}
                         setAlreadyReviewed={setAlreadyReviewed}
                         taskSelection={taskSelection} alreadyReviewed={alreadyReviewed}/>

}