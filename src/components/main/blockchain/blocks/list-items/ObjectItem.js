import React from 'react';
import DataListItem from "./DataListItem";
import BlockIcon from "../BlockIcon";
import useFormatting from "../../hooks/useFormatting";

export default function ObjectItem({object}) {
  const {
    clientData: {
      shortHash,
      parentHash,
    }
  } = object;

  const OpClass = useFormatting(object);

  const icon = <BlockIcon icon={OpClass.getIcon()}/>;
  const title = OpClass.getObjName(object);
  const type = object.clientData.type.replace('.', '_');
  const objLink = `/data/objects/${type}?key=${object.clientData.id}`;
  const transLink = `/data/transaction/${parentHash}`;

  return <DataListItem
      block={object}
      title={title}
      icon={icon}
      objLink={objLink}
      transLink={transLink}
      shortId={shortHash}
  >
    <p>Object type: <strong>{OpClass.getName()}</strong></p>
    {object.comment && <p>Comment: <strong>{object.comment}</strong></p>}
  </DataListItem>;
};
