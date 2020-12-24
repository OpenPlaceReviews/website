import React, {useContext} from 'react';
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";

import OperationsContext from "../../providers/OperationsContext";
import BlockIcon from "../BlockIcon";

export default function Objects(index) {
  const {operations, count, loading, types} = useContext(OperationsContext);

  let content = [];
  if (count && !loading) {
    content = operations.map((o) => {
      const OpClass = types[o.id];
      const baseName = OpClass.getName(index);
      const icon = <BlockIcon icon={OpClass.getIcon()}/>;

      return <SidebarItem
        key={o.id}
        text={baseName}
        icon={icon}
        exact
        to={"/data"}
      />
    })
  }

  return <>
    <SidebarHeader text="Objects" count={count}/>
    {content}
  </>;
};
