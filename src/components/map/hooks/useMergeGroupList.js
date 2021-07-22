import {useEffect} from "react";

export default function useMergeGroupList(mergePlaces, mergeGroupList, setMergeGroupList, idsPlacesCache) {

    function getPlacesGroups(places) {
        let currentGroupBeginIndex = 0;
        for (let i = 1; i < places.length - 1; i++) {
            if (places[i].properties.deleted && !places[i - 1].properties.deleted) {
                mergeGroupList.push(places.slice(currentGroupBeginIndex, i));
                currentGroupBeginIndex = i;
            }
        }
        mergeGroupList.push(places.slice(currentGroupBeginIndex, places.length));
        mergeGroupList = mergeGroupList.filter(group => group.length === 2);
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
