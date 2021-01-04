import {useCallback} from "react";

export default function useValidate() {
    return useCallback((formData) => {
        let errors = 0;
        let required = 0;
        for (let name in formData) {
            if (formData.hasOwnProperty(name)) {
                const field = formData[name];
                if (field.error.length) {
                    errors++;
                }
                if (field.required && !field.value) {
                    required++;
                }
            }
        }

        return errors === 0 && required === 0;
    }, []);
};