
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};

/**
 * Gets distance in meters
 */
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6372.8; // for haversine use R = 6372.8 km instead of 6371 km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    //return R * c * 1000;
    // simplyfy haversine:
    return (2 * R * 1000 * Math.asin(Math.sqrt(a)));
}

const toRadians = (angdeg) => {
    return angdeg / 180.0 * Math.PI;
}

export default {
    capitalize,
    formatDate,
    getDistance,
}