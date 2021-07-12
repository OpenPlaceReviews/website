import {useEffect} from "react";
import UtilsDiff from "../../util/UtilsDiff";

export default function useBatchDiff(current, newObject, categories, onDiff, edited, deleted, countOp, setCountOp) {
    useEffect(() => {
        const isEqual = JSON.stringify(current) === JSON.stringify(newObject);
        const isMerge = current && newObject && JSON.stringify(current.id) !== JSON.stringify(newObject.id);
        if (!isEqual && categories) {
            const diff = UtilsDiff.compareObjects(current, newObject, categories, isMerge);
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

    }, [current, newObject, categories]);
}