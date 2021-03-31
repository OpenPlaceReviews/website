import React, {useContext} from 'react';
import BlockExpandable from "./BlockExpandable";
import ReviewImagesBlock from "./ReviewImagesBlock";
import Utils from "../../util/Utils";
import AuthContext from "../../main/auth/providers/AuthContext";

export default function ImagesBlock({
                                        markerPlace,
                                        similarMarkerPlace,
                                        categories,
                                        reviewBlock,
                                        setPlaces
                                    }) {

    const {authData} = useContext(AuthContext);
    const isLoggedIn = () => !!authData.token;
    const isEditable = isLoggedIn() && !similarMarkerPlace;

    if (markerPlace && markerPlace.images && categories) {
        const {images} = markerPlace;
        if (reviewBlock) {
            reviewBlock = images.review && images.review.length > 0 ?
                <BlockExpandable key={-1} header={`Photos - To review (${images.review.length})`}>
                    <ReviewImagesBlock place={markerPlace} onSubmit={setPlaces} isEditable={isEditable}
                                       initialCategory="review" categories={categories}/>
                </BlockExpandable> : ''
        }

        return <React.Fragment>
            {reviewBlock}
            {Object.keys(categories).map((category, index) => images[category] && images[category].length > 0 ?
                <BlockExpandable key={index}
                                 header={`Photos - ${Utils.capitalize(category)} (${images[category].length})`}>
                    <ReviewImagesBlock place={markerPlace} onSubmit={setPlaces} isEditable={isEditable}
                                       initialCategory={category} categories={categories}/>
                </BlockExpandable> : '')}</React.Fragment>
    } else if (similarMarkerPlace && similarMarkerPlace.images && categories) {
        const {images} = similarMarkerPlace;
        if (reviewBlock) {
            reviewBlock = images.review && images.review.length > 0 ?
                <BlockExpandable key={-1} header={`Photos - To review (${images.review.length})`}>
                    <ReviewImagesBlock place={similarMarkerPlace} isEditable={false} initialCategory="review"
                                       categories={categories}/>
                </BlockExpandable> : ''
        }

        return <React.Fragment>
            {reviewBlock}
            {Object.keys(categories).map((category, index) => images[category] && images[category].length > 0 ?
                <BlockExpandable key={index}
                                 header={`Photos - ${Utils.capitalize(category)} (${images[category].length})`}>
                    <ReviewImagesBlock place={similarMarkerPlace} isEditable={false} initialCategory={category}
                                       categories={categories}/>
                </BlockExpandable> : '')}
        </React.Fragment>
    } else {
        return ""
    }
}