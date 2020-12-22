import React, {useContext} from 'react';
import DataListItem from "./DataListItem";
import OperationsContext from "../../providers/OperationsContext";
import OperationIcon from "../../assets/icons/OperationIcon";
import BlockIcon from "../../assets/icons/BlockIcon";

export default function OperationItem({block, blockId}) {
  const {types} = useContext(OperationsContext);

  const OpClass = types[block.type];
  const icon = OpClass.getIcon();
  let Icon = OperationIcon[icon];
  if (!Icon) {
    Icon = BlockIcon;
  }
  const title = OpClass.getOpDescription(block);
  const link = `/data/block/${blockId}/transaction/${block.hash}`;

  let objects;
  let summary;
  if (block.action === 'delete') {
    objects = block.old;
    summary = 'Objects deleted: ';
  } else if (block.action === 'create') {
    objects = block.new;
    summary = 'Objects created:';
  } else {
    objects = block.edit;
    summary = 'Objects modifed:';
  }

  const lastObject = objects[0];

  return <DataListItem block={block} title={title} icon={<Icon/>} link={link}>
    <p>{OpClass.getObjDescription(lastObject)}</p>
    <p>Object type: <strong>{OpClass.getObjName(lastObject)}</strong></p>
    <p>{summary} <strong>{objects.length}</strong></p>
  </DataListItem>;
};
