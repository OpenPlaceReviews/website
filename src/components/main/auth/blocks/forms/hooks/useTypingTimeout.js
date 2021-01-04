import {useCallback} from "react";
import config from "../../../../../../config";

export default function useTypingTimeout(writeTimeout) {
    const TYPING_TIMEOUT = config.auth.typingTimeout;

    return useCallback((handler) => {
        clearTimeout(writeTimeout.current);
        writeTimeout.current = setTimeout(() => {
            handler();
        }, TYPING_TIMEOUT);
    }, []);
}