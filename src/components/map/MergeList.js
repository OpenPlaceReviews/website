import MergeListDialog from "./blocks/dialogs/MergeListDialog";
import React, {useState} from "react";

export default function MergeList({mergeListDialogOpen, mergePlaces, placeTypes, setMergeListDialogOpen}) {

    const [lastMergePlaces, setLastMergePlaces] = useState(null);
    const [currentMergePlaces, setCurrentMergePlaces] = useState([]);
    const [idsPlacesCache, setIdsPlacesCache] = useState([]);

    return mergeListDialogOpen &&
        <MergeListDialog mergePlaces={mergePlaces} placeTypes={placeTypes} mergeListDialogOpen={mergeListDialogOpen}
                         setMergeListDialogOpen={setMergeListDialogOpen}
                         lastMergePlaces={lastMergePlaces} setLastMergePlaces={setLastMergePlaces}
                         idsPlacesCache={idsPlacesCache} setIdsPlacesCache={setIdsPlacesCache}
                         currentMergePlaces={currentMergePlaces} setCurrentMergePlaces={setCurrentMergePlaces}/>

}