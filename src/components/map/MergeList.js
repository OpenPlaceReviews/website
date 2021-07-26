import MergeListDialog from "./blocks/dialogs/MergeListDialog";
import React, {useEffect, useState} from "react";

export default function MergeList({
                                      mergeListDialogOpen,
                                      mergePlaces,
                                      placeTypes,
                                      setMergeListDialogOpen,
                                      alreadyReviewed
                                  }) {

    const [idsPlacesLocallyMerged, setIdsPlacesLocallyMerged] = useState([]);

    useEffect(() => {
        idsPlacesLocallyMerged.splice(0, idsPlacesLocallyMerged.length)
        setIdsPlacesLocallyMerged(idsPlacesLocallyMerged);
    }, [mergePlaces]);

    return mergeListDialogOpen &&
        <MergeListDialog mergePlaces={mergePlaces} placeTypes={placeTypes} mergeListDialogOpen={mergeListDialogOpen}
                         setMergeListDialogOpen={setMergeListDialogOpen}
                         idsPlacesLocallyMerged={idsPlacesLocallyMerged} setIdsPlacesLocallyMerged={setIdsPlacesLocallyMerged}
                         alreadyReviewed={alreadyReviewed}/>

}