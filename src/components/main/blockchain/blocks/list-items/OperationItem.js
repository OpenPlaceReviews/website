import React from 'react';
import DataListItem from "./DataListItem";
import OperationIcon from "../../assets/icons/OperationIcon";
import BlockIcon from "../../assets/icons/BlockIcon";
import useFormatting from "../../hooks/useFormatting";
import ObjectsSummary from "../ObjectsSummary";

export default function OperationItem({operation, blockId}) {
  const {
    clientData: {
      signedByStr,
      shortHash,
      rawHash,
    }
  } = operation;

  const OpClass = useFormatting(operation);

  const icon = OpClass.getIcon();
  let Icon = OperationIcon[icon];
  if (!Icon) {
    Icon = BlockIcon;
  }
  const title = OpClass.getOpDescription(operation);
  const link = `/data/block/${blockId}/transaction/${rawHash}`;

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

  return <DataListItem
      block={operation}
      title={title}
      icon={<Icon/>}
      link={link}
      signedBy={signedByStr}
      shortId={shortHash}
  >
    {content}
    <ObjectsSummary op={operation} listItem={true}/>
  </DataListItem>;
};
