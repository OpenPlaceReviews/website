import {useEffect} from "react";

export default function useMergeGroupList(mergePlaces, mergeGroupList, setMergeGroupList, idsPlacesCache) {

    function getPlacesGroups(places) {
        for (let i = 0; i < places.length - 1;) {
            let delGroup = [];
            let similarGroup = [];
            // collect group of deleted objects
            let j = 0;
            for (; j + i < places.length - 1; j++) {
                if (places[i + j].properties.deleted) { 
                    delGroup.push(places[i + j]);
                } else {
                    break;
                }
            }
            for (; j + i < places.length - 1; j++) {
                if (!places[i + j].properties.deleted) {
                    similarGroup.push(places[i + j]);
                } else {
                    break;
                }
            }
            if (similarGroup.length == 1) {
                // keep only groups of 1
                delGroup.forEach(element =>
                    // if (!idsPlacesCache.includes[element.properties.opr_id]))
                        mergeGroupList.push([element, similarGroup[0]]));
            }
            if (j == 0) {
                j = 1;
            }
            i += j;
        }
        setMergeGroupList(mergeGroupList);
    }

    useEffect(() => {
        if (idsPlacesCache.length !== 0) {
            for (let i = 0; i < idsPlacesCache.length; i++) {
                mergePlaces = mergePlaces.filter(place => place.properties.opr_id !== idsPlacesCache[i].toString())
            }
        }
        getPlacesGroups(mergePlaces);
    }, [mergePlaces]);
}
