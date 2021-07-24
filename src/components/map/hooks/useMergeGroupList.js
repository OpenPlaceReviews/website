import {useEffect} from "react";
import Tasks from "../tasks/Tasks";
import Utils from "../../util/Utils";

export default function useMergeGroupList(mergePlaces, mergeGroupList, setMergeGroupList, idsPlacesCache,
                                          setAlreadyReviewed, taskSelection, alreadyReviewed) {

    let task = null;
    let taskStartDate = null;
    let taskEndDate = null;
    if (taskSelection) {
        task = Tasks.getTaskById(taskSelection.taskId);
        taskStartDate = taskSelection.startDate;
        taskEndDate = taskSelection.endDate;
    }

    function areSimilarPlaceByDistance(place1, place2, similarPlaceDistance) {
        if (place2 && place2.properties.place_deleted === undefined) {
            const [lat, lon] = place1.geometry.coordinates;
            const [gLat, gLon] = place2.geometry.coordinates;
            const distance = Utils.getDistance(lat, lon, gLat, gLon);
            if (distance < similarPlaceDistance) {
                return true;
            }
        }
        return false;
    }

    function getPlacesGroups(places) {
        for (let i = 0; i < places.length - 1;) {
            let delGroup = [];
            let similarGroup = [];
            // collect group of deleted objects
            let place = places[i];
            if (!place.properties.deleted ) { //|| alreadyReviewed.includes(place.properties.opr_id)) {
                i++;
                continue;
            } else {
                delGroup.push(place);
            }
            let j = 1;
            for (; j + i < places.length - 1; j++) {
                if (places[i + j].properties.deleted && areSimilarPlaceByDistance(place, places[i + j], 250)) {
                    // not clear why we double check alreadyReviewed?
                    // if(!alreadyReviewed.includes(places[i + j].properties.opr_id)) {
                        delGroup.push(places[i + j]);
                    // }
                } else {
                    break;
                }
            }
            for (; j + i < places.length - 1; j++) {
                if (!places[i + j].properties.deleted && areSimilarPlaceByDistance(place, places[i + j], 250)) {
                    // not clear why we double check alreadyReviewed?
                    // if (!alreadyReviewed.includes(places[i + j].properties.opr_id)) {
                        similarGroup.push(places[i + j]);
                    // }
                } else {
                    break;
                }
            }
            if (similarGroup.length === 1) {
                // keep only groups of 1
                delGroup.forEach(function (element) {
                    if (!idsPlacesCache.includes[element.properties.opr_id]) {
                        mergeGroupList.push([element, similarGroup[0]]);
                    }
                });

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
