import {useEffect} from "react";
import UtilsDiff from "../../util/UtilsDiff";

export default function useDiff(current, newObject, categories, onDiff) {
    useEffect(() => {
        const isEqual = JSON.stringify(current) === JSON.stringify(newObject);
        const isMerge = current && newObject && JSON.stringify(current.id) !== JSON.stringify(newObject.id);
        if (!isEqual && categories) {
            const diff = UtilsDiff.compareObjects(current, newObject, categories, isMerge);
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
        }
    }, [current, newObject, categories]);
}