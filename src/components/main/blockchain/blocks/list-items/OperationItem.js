import React from 'react';
import DataListItem from "./DataListItem";
import BlockIcon from "../../../../../assets/images/blockchain_icons/blockchain.svg";
import useFormatting from "../../hooks/useFormatting";
import ObjectsSummary from "../ObjectsSummary";

export default function OperationItem({operation, blockId}) {
  const OpClass = useFormatting(operation);

  const title = OpClass.getOpDescription(operation);
  const link = `/data/block/${blockId}/transaction/${operation.clientData.rawHash}`;
  const icon = <BlockIcon icon={OpClass.getIcon()}/>;

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

  return <DataListItem block={operation} title={title} Icon={icon} link={link}>
    {content}
    <ObjectsSummary op={operation} listItem={true}/>
  </DataListItem>;
};
