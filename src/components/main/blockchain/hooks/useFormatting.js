import {useContext} from "react";
import OperationsContext from "../providers/OperationsContext";

export default function useFormatting(block) {
    const {types} = useContext(OperationsContext);
    if (!block) return {};
    const blockType = block.type || block.clientData.type;

    return types[blockType];
};