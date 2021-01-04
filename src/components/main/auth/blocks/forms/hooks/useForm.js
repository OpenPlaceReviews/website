import {useState} from "react";

export default function useForm(data) {
    const [formData, setData] = useState(data);
    const [valid, setValid] = useState(false);

    const handler = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        let error = formData[name].error;
        if (target.required) {
            if (!value) {
                error = "This field is required";
            } else {
                error = '';
            }
        }

        setData( state => ({
            ...state,
            [name]: {
                ...state[name],
                error,
                value
            }
        }));
    };

    return {
        handler,
        formData,
        valid,
        setValid,
        setData,
    }
}