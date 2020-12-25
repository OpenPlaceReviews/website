import React from 'react';

import Icon from "./Icon";

import blockIcon from "../../../../assets/images/blockchain_icons/blockchain.svg";
const reqSvgs = require.context("../../../../assets/images/blockchain_icons/operations/", true, /\.svg$/)
const operationsIcons = reqSvgs
    .keys()
    .reduce((images, path) => {
        const name = path.replace(/^.*[\\\/]/, '').split('.').shift();
        images[name] = reqSvgs(path).default;
        return images;
    }, {});

export default function BlockIcon({icon = ''}) {
    const [type, ic_name] = icon.split(':');

    let url = blockIcon;
    if (type === 'opendb-icons' && ic_name && operationsIcons[ic_name]) {
        url = operationsIcons[ic_name];
    }

    return <Icon url={url}/>;
}