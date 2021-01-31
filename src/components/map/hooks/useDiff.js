import {useEffect} from "react";
const VALUE_DELETED = 'delete';

function compareImages(path, oldImages, newImages) {
    const change = {};
    const current = {};

    oldImages.forEach((image, index) => {
        const {cid} = image;
        const isDeleted = !newImages.some(image => image.cid === cid);
        if (isDeleted) {
            change[`${path}[${index}]`] = VALUE_DELETED;
            current[`${path}[${index}]`] = image;
        }
    });

    newImages.forEach((image, index) => {
        const {cid} = image;
        const isAppended = !oldImages.some(image => image.cid === cid);
        if (isAppended) {
            change[path] = {
                append: image,
            };
        }
    });

    return {
        change,
        current,
    };
}

function compareObjects(oldObject, newObject) {
    const diff = {
        change: {
            version: 'increment',
        },
        current: {},
    };

    const categories = ['review', 'outdoor', 'indoor'];
    categories.forEach((category) => {
        let categoryDiff;
        const path = `images.${category}`;
        const oldImages = oldObject.images[category];
        const newImages = newObject.images[category];

        categoryDiff = compareImages(path, oldImages, newImages);
        diff.change = {
            ...diff.change,
            ...categoryDiff.change,
        }
        diff.current = {
            ...diff.current,
            ...categoryDiff.current,
        }
    });

    return diff;
}


export default function useDiff(current, newObject, onDiff) {
    useEffect(() => {
        const isEqual = JSON.stringify(current) === JSON.stringify(newObject);
        if (!isEqual) {
            const diff = compareObjects(current, newObject);

            const op = {
                edit: [
                    {
                        id: current.id,
                        ...diff,
                    }
                ],
                type: 'opr.place',
            };

            onDiff(op);
        }
    }, [current, newObject]);
}