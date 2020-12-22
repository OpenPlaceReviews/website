import {useContext} from "react";
import OperationsContext from "../providers/OperationsContext";

export default function useFormatting(block) {
    const {types} = useContext(OperationsContext);
    if (!block) {
        return {
            OpClass: null,
            objects: [],
            summary: '',
        };
    }

    const OpClass = types[block.type];
    const {action, key} = block.clientData;
    let summary;
    if (action === 'delete') {
        summary = 'Objects deleted: ';
    } else if (action === 'create') {
        summary = 'Objects created:';
    } else {
        summary = 'Objects modifed:';
    }

    let objects;
    if (key) {
        objects = block[key];
    } else {
        objects = block[action];
    }

    return {
        OpClass,
        objects,
        summary,
    };
};