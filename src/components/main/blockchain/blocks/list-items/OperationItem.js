import React from 'react';
import DataListItem from "./DataListItem";

import useFormatting from "../../hooks/useFormatting";
import ObjectsSummary from "../ObjectsSummary";

export default function OperationItem({operation, blockId}) {
  const OpClass = useFormatting(operation);

  const title = OpClass.getOpDescription(operation);
  const link = `/data/block/${blockId}/transaction/${operation.clientData.rawHash}`;
  const icon = OpClass.getIcon();

  let content;
  let objects = [];
  if (Array.isArray(operation.new)) {
    objects = objects.concat(operation.new);
  }
  if (Array.isArray(operation.old)) {
    objects = objects.concat(operation.old);
  }
  if (Array.isArray(operation.edit)) {
    objects = objects.concat(operation.edit);
  }

  if (objects.length === 1) {
    const object = objects[0];
    content = <React.Fragment>
      <p>Object type: <strong>{OpClass.getName()}</strong></p>
      <p>{OpClass.getObjDescription(object)}</p>
    </React.Fragment>;
  }

  return <DataListItem block={operation} title={title} icon={icon} link={link}>
    {content}
    <ObjectsSummary op={operation} listItem={true}/>
  </DataListItem>;
};
