import {useContext} from "react";
import OperationsContext from "../providers/OperationsContext";

export default function useFormatting(block) {
    const {types} = useContext(OperationsContext);
    if (!block) return {};

    return types[block.type];
};