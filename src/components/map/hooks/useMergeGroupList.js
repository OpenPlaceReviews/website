import {useEffect} from "react";
import Tasks from "../tasks/Tasks";

export default function useMergeGroupList(mergePlaces, mergeGroupList, setMergeGroupList, idsPlacesCache,
                                          alreadyReviewed, setAlreadyReviewed, taskSelection) {

    let task = null;
    let taskStartDate = null;
    let taskEndDate = null;
    if (taskSelection) {
        task = Tasks.getTaskById(taskSelection.taskId);
        taskStartDate = taskSelection.startDate;
        taskEndDate = taskSelection.endDate;
    }

    function getPlacesGroups(places) {
        for (let i = 0; i < places.length - 1;) {
            let delGroup = [];
            let similarGroup = [];
            // collect group of deleted objects
            let j = 0;
            for (; j + i < places.length - 1; j++) {
                if (places[i + j].properties.deleted && !alreadyReviewed.includes(places[i + j].properties.opr_id)) {
                    delGroup.push(places[i + j]);
                } else {
                    break;
                }
            }
            for (; j + i < places.length - 1; j++) {
                if (!places[i + j].properties.deleted && !alreadyReviewed.includes(places[i + j].properties.opr_id)) {
                    similarGroup.push(places[i + j]);
                } else {
                    break;
                }
            }
            if (similarGroup.length === 1) {
                // keep only groups of 1
                delGroup.forEach(element =>
                    // if (!idsPlacesCache.includes[element.properties.opr_id]))
                        mergeGroupList.push([element, similarGroup[0]]));
            }
            if (j === 0) {
                j = 1;
            }
            i += j;
        }
        setMergeGroupList(mergeGroupList);
    }

    useEffect(() => {
        const updatePlaces = async () => {
            const {alreadyReviewedPlaceIds} = await task.fetchData({startDate: taskStartDate, endDate: taskEndDate});
            setAlreadyReviewed(alreadyReviewedPlaceIds)
        }
        updatePlaces();
        getPlacesGroups(mergePlaces);
    }, [mergePlaces]);
}
