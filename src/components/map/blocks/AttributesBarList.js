import React from 'react';
import AttributesBar from "./AttributesBar";

export default function AttributesBarList({place, inactiveLinksVisible, isOpen}) {

    const attributesBarList = [];

    place && place.sources && Object.entries(place.sources).map(([type, sources], index) => {
        if (type === 'osm') {
            for (const source of sources) {
                if (inactiveLinksVisible || !source.deleted) {
                    attributesBarList.push(<AttributesBar source={source} sourceType={type} key={index} open={isOpen}/>)
                }
            }
        } else {
            attributesBarList.push(<AttributesBar source={sources[sources.length - 1]} sourceType={type} key={index}
                                                  open={isOpen}/>)
        }
    })

    return attributesBarList;

}