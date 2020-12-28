import {useEffect, useRef, useState} from "react";

export default function useForm(data) {
    const [formData, setData] = useState(data);
    const [valid, setValid] = useState(false);

    const handler = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        setData( state => ({
            ...state,
            [name]: {
                ...state[name],
                value
            }
        }));
    };

    const formRef = useRef();

    useEffect(() => {
        let errors = 0;
        for (let field in formData) {
            if (formData[field].error.length) {
                errors++;
            }
        }

        setValid(errors === 0 && formRef.current.checkValidity());
    }, [formData]);

    return {
        handler,
        valid,
        formData,
    }
}