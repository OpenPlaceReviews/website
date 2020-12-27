import React from 'react';
import DataListItem from "./DataListItem";
import OperationIcon from "../../assets/icons/OperationIcon";
import BlockIcon from "../../assets/icons/BlockIcon";
import useFormatting from "../../hooks/useFormatting";

export default function ObjectItem({object}) {
  const {
    clientData: {
      id,
    }
  } = object;

  const OpClass = useFormatting(object);

  const icon = OpClass.getIcon();
  let Icon = OperationIcon[icon];
  if (!Icon) {
    Icon = BlockIcon;
  }
  const title = OpClass.getObjName(object);
  const link = `/data/object/${id}`;

  return <DataListItem
      block={object}
      title={title}
      icon={<Icon/>}
      link={link}
      shortId={id}
  >
    <p>{OpClass.getObjDescription(object)}</p>
    <p>Object type: <strong>{OpClass.getName()}</strong></p>
  </DataListItem>;
};
