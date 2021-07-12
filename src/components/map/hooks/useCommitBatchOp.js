import {useEffect} from "react";

export default function useCommitBatchOp(countOp, setCommit, setCountOp) {
    useEffect(() => {
        if (countOp === 250) {
            setCommit(true);
            setCountOp(0);
        }
    }, [countOp])
}