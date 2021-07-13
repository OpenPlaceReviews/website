import {useEffect} from "react";

export default function useBatchOp(forceCommit, setForceCommit, deleted, edited, onDiff, maxBatchSizeOp) {
    useEffect(() => {
        if (forceCommit || edited.length === maxBatchSizeOp) {
            const op = {
                delete: [],
                edit: [],
                type: 'opr.place',
            }

            deleted.forEach(del => {
                op.delete.push(del)
            });
            edited.forEach(edit => {
                op.edit.push(edit)
            });
            onDiff(op);

            edited.splice(0, edited.length);
            deleted.splice(0, deleted.length);

            setForceCommit(false);
        }
    }, [deleted, edited, forceCommit]);
}