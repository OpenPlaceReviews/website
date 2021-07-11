import {useEffect} from "react";
const VALUE_DELETED = 'delete';

function compareImages(path, oldImages, newImages) {
    const change = {};
    const current = {};

    oldImages.forEach((image, index) => {
        const { cid } = image;
        const isDeleted = !newImages.some(image => image.cid === cid);
        if (isDeleted) {
            change[`${path}[${index}]`] = VALUE_DELETED;
            current[`${path}[${index}]`] = image;
        }
    });

    let appendedImages = [];
    newImages.forEach((image, _) => {
        const { cid } = image;
        const isAppended = !oldImages.some(image => image.cid === cid);
        if (isAppended) {
            appendedImages.push(image);
        }
    });
    if (appendedImages.length === 1) {
        change[path] = {
            append: appendedImages[0],
        };
    } else if (appendedImages.length > 1) {
        change[path] = {
            appendmany: appendedImages,
        };
    }

    return {
        change,
        current,
    };
}

function compareSource(oldObject, newObject) {
    const change = {};
    const current = {};

    Object.entries(newObject.source).map(([type]) => {
        if (!oldObject.source[type]) {
            change[`source.${type}`] = {set: newObject.source[type]}
        } else {
            newObject.source[type].forEach(newSource => {
                if (!oldObject.source[type].find(source => JSON.stringify(source.id) === JSON.stringify(newSource.id))) {
                    change[`source.${type}`] = {append: newSource}
                    current[`source.${type}`] = oldObject.source[type]
                }
            });

            oldObject.source[type].forEach(oldSource => {
                if (!newObject.source[type].find(source => JSON.stringify(source.id) === JSON.stringify(oldSource.id))) {
                    change[`source.${type}`] = {delete: oldSource}
                    current[`source.${type}`] = oldObject.source[type]
                }
            });
        }
    });

    return {
        change,
        current,
    };
}

function compareDeleted(oldObject, newObject){
    const change = {};
    const current = {};

    if(newObject.deleted && !oldObject.deleted){
        change[`deleted`] = {set: newObject.deleted}
        if(newObject.deletedComment && !oldObject.deletedComment){
            change[`deletedComment`] = {set: newObject.deletedComment}
        }
    }

    return {
        change,
        current,
    };

}

function compareObjects(oldObject, newObject, categories, isMerge) {
    const diff = {
        change: {
            version: 'increment',
        },
        current: {},
    };

    ['review', ...Object.keys(categories)].forEach(category => {
        let categoryDiff;
        const path = `images.${category}`;
        const oldImages = oldObject.images ? oldObject.images[category] : null;
        const newImages = newObject.images ? newObject.images[category] : null;
        categoryDiff = compareImages(path, oldImages ? oldImages : [], newImages ? newImages : []);
        diff.change = {
            ...diff.change,
            ...categoryDiff.change,
        }
        diff.current = {
            ...diff.current,
            ...categoryDiff.current,
        }
    });

    if (JSON.stringify(oldObject.source) !== JSON.stringify(newObject.source)) {
        let sourceDiff;
        sourceDiff = compareSource(oldObject, newObject);

        diff.change = {
            ...diff.change,
            ...sourceDiff.change,
        }

        diff.current = {
            ...diff.current,
            ...sourceDiff.current,
        }
    }

    if(JSON.stringify(newObject.deleted) !== JSON.stringify(oldObject.deleted)){
        let sourceDiff;
        sourceDiff = compareDeleted(oldObject, newObject);

        diff.change = {
            ...diff.change,
            ...sourceDiff.change,
        }

        diff.current = {
            ...diff.current,
            ...sourceDiff.current,
        }
    }

    if (isMerge) {
        Object.entries(newObject.source).map(([type, source]) => {
            const change = {};
            const current = {};
            if (source.length === 1) {
                change[`source.${type}`] = {
                    append: source[0],
                };
            } else if (source.length > 1) {
                change[`source.${type}`] = {
                    appendmany: source,
                };
            }
            diff.change = {
                ...diff.change,
                ...change,
            }
            let oldSource = oldObject.source[type];
            if (oldSource) {
                current[`source.${type}`] = oldSource;
            }
            diff.current = {
                ...diff.current,
                ...current,
            }
        });
    }

    return diff;
}


export default function useDiff(current, newObject, categories, onDiff, edited, deleted, mergeList,
                                countOp, setCountOp) {
    useEffect(() => {
        const isEqual = JSON.stringify(current) === JSON.stringify(newObject);
        const isMerge = current && newObject && JSON.stringify(current.id) !== JSON.stringify(newObject.id);
        if (!isEqual && categories) {
            const diff = compareObjects(current, newObject, categories, isMerge);
            if (!mergeList) {
                const op = {
                    edit: [
                        {
                            id: current.id,
                            ...diff,
                        }
                    ],
                    type: 'opr.place',
                };
                if (isMerge) {
                    op.delete = [
                        newObject.id,
                    ];
                }

                onDiff(op);
            } else {
                edited.push({
                    id: current.id,
                    ...diff,
                });
                if (isMerge) {
                    deleted.push(
                        newObject.id,
                    );
                }
                setCountOp(countOp + 1);
            }
        }
    }, [current, newObject, categories]);
}