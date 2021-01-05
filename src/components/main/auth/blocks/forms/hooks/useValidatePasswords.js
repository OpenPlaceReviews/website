import {useCallback} from "react";
import config from "../../../../../../config";

export default function useValidatePasswords() {
    const PASSWORD_MIN_LENGTH = config.auth.minPasswordLength;

    return useCallback((pwd, pwdRepeat) => {
        let pwdError = '';
        let pwdRepeatError = '';

        if (pwd.length > 0 && pwd.length < PASSWORD_MIN_LENGTH) {
            pwdError = `Password must be greater than ${PASSWORD_MIN_LENGTH} symbols`;
        } else if (pwdRepeat.length > 0 && pwd !== pwdRepeat) {
            pwdError = 'Passwords mismatch';
            pwdRepeatError = 'Passwords mismatch';
        }

        return {
            pwd: pwdError,
            pwdRepeat: pwdRepeatError,
        };
    }, []);
};