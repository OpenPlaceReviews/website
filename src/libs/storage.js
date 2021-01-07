let storage = window.localStorage;
try {
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
}
catch(e) {
    console.warn("Your browser blocks access to localStorage");
    storage = null;
}

export default storage;