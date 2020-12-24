import React, {useContext} from 'react';
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";

import BlockIcon from "../../../../../assets/images/blockchain_icons/blockchain.svg";
import OperationsContext from "../../providers/OperationsContext";

const reqSvgs = require.context("../../../../../assets/images/blockchain_icons/operations/", true, /\.svg$/)
const operationsIcons = reqSvgs
    .keys()
    .reduce((images, path) => {
      const name = path.replace(/^.*[\\\/]/, '').split('.').shift();
      images[name] = reqSvgs(path).default;
      return images;
    }, {});

export default function Objects(index) {
  const {operations, count, loading, types} = useContext(OperationsContext);

  let content = [];
  if (count && !loading) {
    content = operations.map((o) => {
      const OpClass = types[o.id];

      const baseName = OpClass.getName(index);
      const iconStr = OpClass.getIcon();
      const [type, ic_name] = iconStr.split(':');
      let Icon;
      if (type === 'opendb-icons' && ic_name) {
        Icon = operationsIcons[ic_name];
      } else {
        Icon = BlockIcon;
      }

      return <SidebarItem
        key={o.id}
        text={baseName}
        icon={Icon}
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
