import React, {useContext} from 'react';
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";

import BlockIcon from "../../assets/icons/BlockIcon";
import OperationIcon from "../../assets/icons/OperationIcon"
import OperationsContext from "../../providers/OperationsContext";

export default function Objects(index) {
  const {operations, loading, types, count} = useContext(OperationsContext);

  let content = [];
  if (operations.length && !loading) {
    content = operations.map((o) => {
      const OpClass = types[o.id];

      const baseName = OpClass.getName(index);
      const icon = OpClass.getIcon();
      return <SidebarItem
        key={o.id}
        text={baseName}
        Icon={OperationIcon[icon] || BlockIcon}
        to={`/data/objects/${o.id.replace('.', '_')}`}
      />
    })
  }

  return <>
    <SidebarHeader text="Objects" count={count}/>
    {content}
  </>;
};
