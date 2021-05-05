import React, {useContext} from 'react';
import BlockExpandable from "./BlockExpandable";
import ReviewImagesBlock from "./ReviewImagesBlock";
import Utils from "../../util/Utils";
import AuthContext from "../../main/auth/providers/AuthContext";

export default function ImagesBlock({
                                        place,
                                        isOriginalPlace,
                                        categories,
                                        showReviewBlock,
                                        setPlaces,
                                        setIsPlaceChanged
                                    }) {

    const {authData} = useContext(AuthContext);
    const isLoggedIn = () => !!authData.token;
    const isEditable = isLoggedIn() && isOriginalPlace;

    if (place && place.images && categories) {
        const {images} = place;
        let reviewImagesBlock;

        if (showReviewBlock) {
            reviewImagesBlock = images.review && images.review.length > 0 ?
                <BlockExpandable key={-1} header={`Photos - To review (${images.review.length})`}>
                    <ReviewImagesBlock place={place} onSubmit={setPlaces} isEditable={isEditable}
                                       initialCategory="review" categories={categories} setIsPlaceChanged={setIsPlaceChanged}/>
                </BlockExpandable> : ''
        }

        return <React.Fragment>
            {reviewImagesBlock}
            {Object.keys(categories).map((category, index) => images[category] && images[category].length > 0 ?
                <BlockExpandable key={index}
                                 header={`Photos - ${Utils.capitalize(category)} (${images[category].length})`}>
                    <ReviewImagesBlock place={place} onSubmit={setPlaces} isEditable={isEditable}
                                       initialCategory={category} categories={categories}/>
                </BlockExpandable> : '')}</React.Fragment>
    } else {
        return ""
    }
}