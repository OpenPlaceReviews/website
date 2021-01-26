import React, {useEffect, useState} from 'react';
import ImagesCarousel from "./ImagesCarousel";
import {makeStyles} from "@material-ui/styles";

import CategorySelector from "./CategorySelector";
import ModalLightbox from "./ModalLightbox";

const useStyles = makeStyles({
    reviewContainer: {
        position: 'relative',
    },
});

export default function ReviewImagesBlock({place, onSubmit, initialCategory, isLoggedIn}) {
    const [current, setCurrent] = useState(0);
    const [categorized, setCategorized] = useState({});
    const [preview, setPreview] = useState(null);
    const classes = useStyles();

    const {images} = place;

    useEffect(() => {
        const categories = {};
        images[initialCategory].forEach((image, index) => {
            categories[index] = initialCategory;
        });

        setCategorized(categories);
    }, [place]);

    const onSubmitHandler = () => {
        const newPlace = JSON.parse(JSON.stringify(place));

        let deletedCount = 0;
        images[initialCategory].forEach((image, index) => {
            const category = categorized[index];
            if (category === initialCategory) {
                return;
            }

            if (category !== 'delete') {
                if (!newPlace.images[category]) {
                    newPlace.images[category] = [];
                }

                newPlace.images[category].push(image);
            }

            newPlace.images[initialCategory].splice(index - deletedCount, 1);
            deletedCount++;
        });

        onSubmit([place, newPlace]);
    }

    const onChangeCategory = (e) => {
        setCategorized((state) => ({
            ...state,
            [current]: e.target.value,
        }));
    };

    const isDiasableSubmit = Object.values(categorized).every((value) => value === initialCategory);

    return <div className={classes.reviewContainer}>
        <ImagesCarousel items={images[initialCategory]} onChange={setCurrent} onClick={setPreview}/>

        <ModalLightbox image={preview} onClose={() => setPreview(null)}/>

        {isLoggedIn && <CategorySelector
            value={(categorized[current] || initialCategory)}
            disabled={isDiasableSubmit}
            onChange={onChangeCategory}
            onSubmit={onSubmitHandler}
        />}
    </div>;
};