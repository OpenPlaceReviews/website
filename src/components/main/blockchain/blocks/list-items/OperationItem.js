import React from 'react';
import DataListItem from "./DataListItem";
import OperationIcon from "../../assets/icons/OperationIcon";
import BlockIcon from "../../assets/icons/BlockIcon";
import useFormatting from "../../hooks/useFormatting";

export default function OperationItem({operation, blockId}) {
  const {OpClass, objects, summary} = useFormatting(operation);

  const icon = OpClass.getIcon();
  let Icon = OperationIcon[icon];
  if (!Icon) {
    Icon = BlockIcon;
  }
  const title = OpClass.getOpDescription(operation);
  const link = `/data/block/${blockId}/transaction/${operation.clientData.rawHash}`;

  const lastObject = objects[0];
  return <DataListItem block={operation} title={title} icon={<Icon/>} link={link}>
    <p>{OpClass.getObjDescription(lastObject)}</p>
    <p>Object type: <strong>{OpClass.getObjName(lastObject)}</strong></p>
    <p>{summary} <strong>{objects.length}</strong></p>
  </DataListItem>;
};
