import {useEffect, useState} from "react";
import storage from "../../../libs/storage";

export default function useTaskSelectionState(defaultValue) {
    const key = 'taskSelection';
    const [value, setValue] = useState(() => {
        const storedValue = storage.getItem(key);
        if (!!storedValue) {
            try {
                let result = JSON.parse(storedValue);
                return {
                    taskId: result.taskId,
                    startDate: new Date(result.startDate),
                    endDate: new Date(result.endDate),
                    reviewedPlacesVisible: result.reviewedPlacesVisible,
                    closedPlaces: false,
                    dateType: result.dateType
                }
            } catch (e) {
                return defaultValue
            }
        } else {
            return defaultValue
        }
    });

    useEffect(() => {
        storage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}