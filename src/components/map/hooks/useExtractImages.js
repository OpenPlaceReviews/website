import {useEffect, useState} from "react";
import {getObjectsById} from "../../../api/data";

export default function useExtractImages(marker) {
    const [images, setImages] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getObjectsById('opr.place', marker.properties.opr_id);
                const object = data.objects.shift();
                setImages(object.images || {});
            } catch (e) {
                setError(error);
            }
        };

        if (marker && marker.properties.opr_id) {
            fetchData();
        } else if (images) {
            setImages({});
        }
    }, [marker]);

    if (error) {
        throw error;
    }

    return {images, setImages};
};