import MergeListDialog from "./blocks/dialogs/MergeListDialog";
import React, {useEffect, useState} from "react";

export default function MergeList({
                                      mergeListDialogOpen,
                                      setMergeListDialogOpen,
                                      mergePlaces,
                                      placeTypes,
                                      setMergeListDialogWasClosed,
                                      alreadyReviewed
                                  }) {

    const [idsPlacesLocallyMerged, setIdsPlacesLocallyMerged] = useState([]);

    useEffect(() => {
        idsPlacesLocallyMerged.splice(0, idsPlacesLocallyMerged.length)
        setIdsPlacesLocallyMerged(idsPlacesLocallyMerged);
    }, [mergePlaces]);

    return mergeListDialogOpen &&
        <MergeListDialog mergePlaces={mergePlaces}
                         mergeListDialogOpen={mergeListDialogOpen} setMergeListDialogOpen={setMergeListDialogOpen}
                         placeTypes={placeTypes}
                         setMergeListDialogWasClosed={setMergeListDialogWasClosed}
                         idsPlacesLocallyMerged={idsPlacesLocallyMerged} setIdsPlacesLocallyMerged={setIdsPlacesLocallyMerged}
                         alreadyReviewed={alreadyReviewed}/>

}