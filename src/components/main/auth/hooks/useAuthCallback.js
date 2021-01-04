export default function useAuthCallback(callback, authData) {
    window.location.href = `${callback}?opr-nickname=${encodeURIComponent(authData.name)}&opr-token=${encodeURIComponent(authData.token)}`;
};