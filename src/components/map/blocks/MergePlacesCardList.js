import React from "react";
import MergeDialogPlaceCard from "./MergeDialogPlaceCard";

export default function MergePlacesCardList({
                                                mergeTo,
                                                mergeFromList,
                                                mergeToInfo,
                                                mergeFromInfo,
                                                categories,
                                                handleOptionalComment,
                                                createClosedPlace,
                                                setMergeFrom,
                                                allowToMerge
                                            }) {

    const mergeFromPlaceList = [];

    if (mergeTo) {
        mergeFromPlaceList.push(<MergeDialogPlaceCard key={mergeFromPlaceList.length} place={mergeTo} info={mergeToInfo}
                                                      categories={categories}
                                                      handleOptionalComment={handleOptionalComment}
                                                      createClosedPlace={createClosedPlace}/>)
    }

    if (mergeFromList) {
        for (let i = 0; i < mergeFromList.length; i++) {
            if (mergeFromInfo[i] && mergeFromInfo[i].latLon !== null) {
                mergeFromPlaceList.push(<MergeDialogPlaceCard key={mergeFromPlaceList.length} place={mergeFromList[i]}
                                                              info={mergeFromInfo[i]}
                                                              mergeToInfo={mergeToInfo} categories={categories}
                                                              handleOptionalComment={handleOptionalComment}
                                                              setMergeFrom={setMergeFrom} allowToMerge={allowToMerge[i]}/>)
            }
        }
    }
    return mergeFromPlaceList;
}