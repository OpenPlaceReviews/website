import {useEffect, useState} from "react";
import storage from "../../../libs/storage";

export default function usePersistedState(defaultValue, key) {
    const [value, setValue] = [];
    setValue(useState(() => {
        try {
            const storedValue = storage.getItem(key);
            return !!storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    }));

    useEffect(() => {
        storage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}