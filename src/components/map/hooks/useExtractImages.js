import {useEffect, useState} from "react";
import {getObjectsById} from "../../../api/data";

export default function useExtractImages(marker) {
    const [images, setImages] = useState(null);
    const [error, setError] = useState(null);

    const IMAGE_CATEGORIES = ['indoor', 'outdoor'];
    const IMAGE_URL = '/api/ipfs/image?hash=';

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

    const imagesSrc = {};
    if (images) {
        IMAGE_CATEGORIES.forEach((category) => {
            if (!images[category]) {
                return;
            }

            imagesSrc[category] = images[category].map((image) => `${IMAGE_URL}${image.hash}`);
        });
    }

    return imagesSrc;
};