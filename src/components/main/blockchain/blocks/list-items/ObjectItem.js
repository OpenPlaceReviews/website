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
  const link = `/data/transaction/${parentHash}`;

  return <DataListItem
      block={object}
      title={title}
      icon={icon}
      link={link}
      shortId={shortHash}
  >
    <p>{OpClass.getObjDescription(object)}</p>
    <p>Object type: <strong>{OpClass.getName()}</strong></p>
    {object.comment && <p>Comment: <strong>{object.comment}</strong></p>}
  </DataListItem>;
};
