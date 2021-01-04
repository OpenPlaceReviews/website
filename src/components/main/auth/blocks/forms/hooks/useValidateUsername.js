import auth from "../../../../../../api/auth";
import {useCallback} from "react";

export default function useValidateUsername() {
    return useCallback(async (username, onCheck, onError) => {
        let error = '';
        let result;
        try {
            result = await auth.checkName(username);
        } catch(error){
            onError(error);
            return;
        }

        const { data } = result;
        if (data && data["db-name"] === "ok" && data["blockchain"] === 'ok') {
            error = 'The username already exists. Please use a different username';
        }

        onCheck(error);
    }, []);
};