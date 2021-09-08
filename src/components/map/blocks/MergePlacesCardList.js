import React from "react";
import MergeDialogPlaceCard from "./MergeDialogPlaceCard";

export default function MergePlacesCardList({
                                                mergeTo,
                                                mergeFromList,
                                                mergeToInfo,
                                                mergeFromInfo,
                                                categories,
                                                createClosedPlace,
                                                setMergeFrom,
                                                allowToMerge
                                            }) {

    const mergeFromPlaceList = [];

    function sortByDistanceFromMergeToPlace(mergeFromInfo) {
        mergeFromInfo.sort(function (a, b) {
            if (a.distanceToDeletedPlace > b.distanceToDeletedPlace) {
                return 1;
            }
            if (a.distanceToDeletedPlace < b.distanceToDeletedPlace) {
                return -1;
            }
            return 0;
        });
    }

    function getPlaceByInfo(i) {
        if (mergeFromList.filter(place => place.id === mergeFromInfo[i].oprId).length === 1) {
            return mergeFromList[0];
        } else {
            return null;
        }
    }

    if (mergeTo) {
        mergeFromPlaceList.push(<MergeDialogPlaceCard key={mergeFromPlaceList.length}
                                                      place={mergeTo}
                                                      info={mergeToInfo}
                                                      categories={categories}
                                                      createClosedPlace={createClosedPlace}/>)
    }

    if (mergeFromList) {
        sortByDistanceFromMergeToPlace(mergeFromInfo)
        for (let i = 0; i < mergeFromInfo.length; i++) {
            if (mergeFromInfo[i] && mergeFromInfo[i].latLon !== null) {
                mergeFromPlaceList.push(<MergeDialogPlaceCard key={mergeFromPlaceList.length}
                                                              place={getPlaceByInfo(i)}
                                                              info={mergeFromInfo[i]}
                                                              mergeToInfo={mergeToInfo}
                                                              categories={categories}
                                                              setMergeFrom={setMergeFrom}
                                                              allowToMerge={allowToMerge[i]}/>)
            }
        }
    }
    return mergeFromPlaceList;
}