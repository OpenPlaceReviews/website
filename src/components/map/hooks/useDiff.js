import {useEffect} from "react";
const VALUE_DELETED = 'delete';

function compareImages(path, oldImages, newImages) {
    const change = {};
    const current = {};

    const deleted = [];
    oldImages.forEach((image, index) => {
        const {cid} = image;
        const isDeleted = !newImages.some((image, newIndex) => (image.cid === cid && index === newIndex));
        if (isDeleted) {
            change[`${path}[${index}]`] = VALUE_DELETED;
            current[`${path}[${index}]`] = image;
            deleted.push(index);
        }
    });

    let newIndex = 0;
    newImages.forEach((image, index) => {
        const {cid} = image;
        const isAppended = !oldImages.some((image, oldIndex) => (image.cid === cid && index === oldIndex));
        if (isAppended) {
            if (index === 0 && oldImages.length === 0) {
                change[path] = {
                    append: image,
                };
            } else {
                if (deleted.length > 0) {
                    newIndex = deleted.shift();
                } else {
                    if ((newIndex >= oldImages.length && newIndex > 0) || oldImages.length === 0) {
                        newIndex = newIndex + 1;
                    } else {
                        newIndex = oldImages.length;
                    }
                }

                change[`${path}[${newIndex}]`] = {
                    set: image,
                };
            }
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