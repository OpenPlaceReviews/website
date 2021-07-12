import {useEffect} from "react";

const BATCH_SIZE_OP = 250;

export default function useBatchOp(forceCommit, setForceCommit, deleted, edited, onDiff, countOp, setCountOp) {
    useEffect(() => {
        if (forceCommit || countOp === BATCH_SIZE_OP) {
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
            setCountOp(0);
            setForceCommit(false);
        }
    }, [forceCommit, countOp]);
}