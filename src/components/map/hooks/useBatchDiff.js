import {useEffect} from "react";
import UtilsDiff from "../../util/UtilsDiff";

export default function useBatchDiff(current, newObject, categories, edited, deleted, setEdited, setDeleted) {
    useEffect(() => {
        const isEqual = JSON.stringify(current) === JSON.stringify(newObject);
        const isMerge = current && newObject && JSON.stringify(current.id) !== JSON.stringify(newObject.id);
        if (!isEqual && categories) {
            const diff = UtilsDiff.compareObjects(current, newObject, categories, isMerge);
            setEdited([...edited,
                {
                    id: current.id,
                    ...diff
                }
            ])

            if (isMerge) {
                setDeleted([...deleted,
                    newObject.id
                ])
            }
        }

    }, [current, newObject, categories]);
}