import {useEffect, useState} from "react";
import {commitObject} from "../../../api/data";

export default function useCommitOp (op, authData, onUpdate) {
    const [error, setError] = useState(null);

    useEffect(() => {
        const sendData = async () => {
            try {
                const {data} = await commitObject(op, `${authData.name}:${authData.provider}`, authData.token);
                onUpdate(data);
            } catch (error) {
                setError(error);
            }
        };

        if (op) {
            sendData();
        }
    }, [op]);

    if(error) {
        throw error;
    }
}