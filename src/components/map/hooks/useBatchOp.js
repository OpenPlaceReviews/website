import {useEffect} from "react";

export default function useBatchOp(commit, setCommit, deleted, edited, onDiff) {
    useEffect(() => {
        if (commit) {
            const op = {
                delete: [],
                edit: [],
                type: 'opr.place',
            };

            deleted.forEach(del => {
                op.delete.push(del)
            });
            edited.forEach(edit => {
                op.edit.push(edit)
            });

            onDiff(op);
            edited.splice(0, edited.length);
            deleted.splice(0, deleted.length);
            setCommit(false);
        }
    }, [commit, deleted, edited]);
}