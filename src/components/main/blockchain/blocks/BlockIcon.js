import React from 'react';

const reqSvgs = require.context("../../../../../assets/images/blockchain_icons/operations/", true, /\.svg$/)
const operationsIcons = reqSvgs
    .keys()
    .reduce((images, path) => {
        const name = path.replace(/^.*[\\\/]/, '').split('.').shift();
        images[name] = reqSvgs(path).default;
        return images;
    }, {});

export default function BlockIcon({icon}) {
    const [type, ic_name] = icon.split(':');

    if (type === 'opendb-icons' && ic_name) {
        const url = operationsIcons[ic_name];
        if(url) {
            return url;
        }
    }

    return BlockIcon;
}