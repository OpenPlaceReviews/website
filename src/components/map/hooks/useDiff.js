import DEEP_DIFF_MAPPER from "../../../libs/deepdiffmapper";
import {useEffect} from "react";

export default function useDiff(current, newObject, onDiff) {
    const isEqual = JSON.stringify(current) === JSON.stringify(newObject);

    useEffect(() => {
        if (!isEqual) {
            let path = "";
            const changeEdit = {};
            const currentEdit = {};

            const diff = DEEP_DIFF_MAPPER.map(current, newObject);
            DEEP_DIFF_MAPPER.generateChangeCurrentObject(path, diff, changeEdit, currentEdit);
            const op = DEEP_DIFF_MAPPER.generateEditOp(current, changeEdit, currentEdit, 'opr.place');
            onDiff(op);
        }
    }, [current, newObject]);
}