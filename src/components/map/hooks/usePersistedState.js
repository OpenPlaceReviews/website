import {useEffect, useState} from "react";
import storage from "../../../libs/storage";

export default function usePersistedState(defaultValue, key) {
    const [value, setValue] = [];
    try {
        setValue(useState(() => {
            const stickyValue = storage.getItem(key);
            return stickyValue !== null
                ? JSON.parse(stickyValue)
                : defaultValue;
        }));

    useEffect(() => {
        storage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];

    } catch (e) {
        console.warn('Error while decoding saved value');
    }
}