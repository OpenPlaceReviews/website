import MergeListDialog from "./blocks/dialogs/MergeListDialog";
import React, {useEffect, useState} from "react";
import Tasks from "./tasks/Tasks";

export default function MergeList({
                                      mergeListDialogOpen,
                                      mergePlaces,
                                      placeTypes,
                                      setMergeListDialogOpen,
                                      taskSelection,
                                      setMergePlaces
                                  }) {

    const [idsPlacesCache, setIdsPlacesCache] = useState([]);

    useEffect(() => {
        idsPlacesCache.splice(0, idsPlacesCache.length)
        setIdsPlacesCache(idsPlacesCache);
    }, [mergePlaces]);

    let task = null;
    let taskStartDate = null;
    let taskEndDate = null;
    if (taskSelection) {
        task = Tasks.getTaskById(taskSelection.taskId);
        taskStartDate = taskSelection.startDate;
        taskEndDate = taskSelection.endDate;
    }

    const updatePlaces = async () => {
        const {alreadyReviewedPlaceIds} = await task.fetchData({startDate: taskStartDate, endDate: taskEndDate});
        mergePlaces = mergePlaces.filter(place => !alreadyReviewedPlaceIds.includes(place.properties.opr_id));
        setMergePlaces(mergePlaces);
    }

    useEffect((mergePlaces) => {
        if (mergePlaces) {
            updatePlaces();
        }
    }, []);

    return mergeListDialogOpen &&
        <MergeListDialog mergePlaces={mergePlaces} placeTypes={placeTypes} mergeListDialogOpen={mergeListDialogOpen}
                         setMergeListDialogOpen={setMergeListDialogOpen}
                         idsPlacesCache={idsPlacesCache} setIdsPlacesCache={setIdsPlacesCache}/>

}