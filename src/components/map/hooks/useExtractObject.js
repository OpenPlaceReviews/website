import {useEffect, useState} from "react";
import {getObjectsById} from "../../../api/data";

export default function useExtractObject(marker, version, onLoad) {
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getObjectsById('opr.place', marker.properties.opr_id);
                const object = data.objects.shift();

                if (object && object.clientData) {
                    delete object.clientData;
                }

                let similarObject = null;
                console.log(marker.properties.similar_opr_id)
                if (marker.properties.similar_opr_id) {
                    const data = await getObjectsById('opr.place', marker.properties.similar_opr_id);
                    console.log(data)
                    similarObject = data.objects.shift();
                    console.log(similarObject)
                    console.log("similarObject.clientData", similarObject.clientData)
                    if (similarObject && similarObject.clientData) {
                        delete similarObject.clientData;
                    }
                }
                onLoad(object, similarObject);
            } catch (e) {
                console.log(e);
                setError(error);
            }
        };

        if (marker && marker.properties.opr_id) {
            fetchData();
        } else {
            onLoad(null);
        }
    }, [marker, version]);

    if (error) {
        throw error;
    }
};