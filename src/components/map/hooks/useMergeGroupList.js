import {useEffect} from "react";
import Utils from "../../util/Utils";

export default function useMergeGroupList(mergePlaces, mergeGroupList, setMergeGroupList, idsPlacesLocallyMerged, alreadyReviewed) {

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

    function getPlacesGroups(places, alreadyReviewedPlaceIds) {
        let delGroupIds = [];
        for (let i = 0; i < places.length - 1;) {
            let mergeToPlacesGroup = [];
            let mergeFromPlacesGroup = [];
            // collect group of deleted objects
            let place = places[i];
            if (!place.properties.deleted || alreadyReviewedPlaceIds.includes(place.properties.opr_id)) {
                i++;
                continue;
            } else {
                mergeToPlacesGroup.push(place);
            }
            let j = 1;
            for (; j + i < places.length - 1; j++) {
                if (places[i + j].properties.deleted && areSimilarPlaceByDistance(place, places[i + j], 250)) {
                    // not clear why we double check alreadyReviewed?
                    if (!alreadyReviewedPlaceIds.includes(places[i + j].properties.opr_id)) {
                        mergeToPlacesGroup.push(places[i + j]);
                    }
                } else {
                    break;
                }
            }

            mergeToPlacesGroup.forEach(place => delGroupIds.push(place.properties.osm_id));

            for (; j + i < places.length - 1; j++) {
                if (!places[i + j].properties.deleted && areSimilarPlaceByDistance(place, places[i + j], 250)) {
                    // not clear why we double check alreadyReviewed?
                    if (!alreadyReviewedPlaceIds.includes(places[i + j].properties.opr_id)
                        && !idsPlacesLocallyMerged.includes[places[i + j].properties.opr_id]) {
                        mergeFromPlacesGroup.push(places[i + j]);
                    }
                } else {
                    break;
                }
            }

            if (mergeFromPlacesGroup.length > 1) {
                mergeToPlacesGroup.forEach(function (element) {
                    mergeFromPlacesGroup = mergeFromPlacesGroup.filter(similarPlace =>
                        !isClosedPlace(element, similarPlace, delGroupIds));
                    if (mergeFromPlacesGroup.length > 0) {
                        if (!idsPlacesLocallyMerged.includes[element.properties.opr_id]) {
                            mergeGroupList.push([element, ...mergeFromPlacesGroup]);
                        }
                    }
                });
            }
            i += j;
        }
        setMergeGroupList(mergeGroupList);
    }

    function isClosedPlace(deletedPlace, similarPlace, delGroupIds) {
        return (deletedPlace.properties.osm_id !== similarPlace.properties.osm_id)
            && delGroupIds.includes(similarPlace.properties.osm_id);
    }

    useEffect(() => {
        getPlacesGroups(mergePlaces, alreadyReviewed);
    }, [mergePlaces]);
}
