import {useEffect, useState} from "react";
import storage from "../../../libs/storage";

export default function usePersistedStateTask() {
    const key = 'taskSelection';
    const date = new Date();
    try {
        const [value, setValue] = useState(() => {
            const stickyValue = storage.getItem(key);
            if (stickyValue !== null) {
                let result = JSON.parse(stickyValue);
                return {
                    taskId: result.taskId,
                    startDate: new Date(result.startDate),
                    endDate: new Date(result.endDate)
                }
            } else {
                return {
                    taskId: 'none',
                    startDate: new Date(date.getFullYear(), date.getMonth(), 1),
                    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
                }
            }
        });

        useEffect(() => {
            storage.setItem(key, JSON.stringify(value));
        }, [key, value]);

        return [value, setValue];

    } catch (e) {
        console.warn('Error while decoding saved value');
    }
}