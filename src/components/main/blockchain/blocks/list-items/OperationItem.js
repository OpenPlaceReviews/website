import React from 'react';
import DataListItem from "./DataListItem";
import BlockIcon from "../../../../../assets/images/blockchain_icons/blockchain.svg";
import useFormatting from "../../hooks/useFormatting";
import ObjectsSummary from "../ObjectsSummary";

const reqSvgs = require.context("../../../../../assets/images/blockchain_icons/operations/", true, /\.svg$/)
const operationsIcons = reqSvgs
    .keys()
    .reduce((images, path) => {
      const name = path.replace(/^.*[\\\/]/, '').split('.').shift();
      images[name] = reqSvgs(path).default;
      return images;
    }, {});

export default function OperationItem({operation, blockId}) {
  const OpClass = useFormatting(operation);

  const iconStr = OpClass.getIcon();
  const [type, ic_name] = iconStr.split(':');
  let Icon;
  if (type === 'opendb-icons' && ic_name) {
    Icon = operationsIcons[ic_name];
  } else {
    Icon = BlockIcon;
  }

  const title = OpClass.getOpDescription(operation);
  const link = `/data/block/${blockId}/transaction/${operation.clientData.rawHash}`;

  let content;
  const objects = {
    ...operation.new,
    ...operation.old,
    ...operation.edit,
  }
  if (objects.length === 1) {
    const object = objects[0];
    content = <React.Fragment>
      <p>Object name: <strong>{OpClass.getObjName(object)}</strong></p>
      <p>{OpClass.getObjDescription(object)}</p>
    </React.Fragment>;
  }

  return <DataListItem block={operation} title={title} icon={Icon} link={link}>
    {content}
    <ObjectsSummary op={operation} listItem={true}/>
  </DataListItem>;
};
