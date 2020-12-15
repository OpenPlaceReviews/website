import React from 'react';
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import ObjectTypeIcon from "../../assets/icons/ObjectTypeIcon";
import UserLoginIcon from "../../assets/icons/UserLoginIcon";
import UserPermissionIcon from "../../assets/icons/UserPermissionIcon";
import UserRoleIcon from "../../assets/icons/UserRoleIcon";
import UserSignUpIcon from "../../assets/icons/UserSignUpIcon";
import ValidationRuleIcon from "../../assets/icons/ValidationRuleIcon";
import BlockIcon from "../../assets/icons/BlockIcon";

const listSettings = {
  "sys.operation": {
    order: 1,
    name: "Object type",
    icon: ObjectTypeIcon,
  },
  "sys.login": {
    order: 2,
    name: "User login",
    icon: UserLoginIcon,
  },
  "sys.grant": {
    order: 3,
    name: "User permission",
    icon: UserPermissionIcon,
  },
  "sys.role": {
    order: 4,
    name: "User role",
    icon: UserRoleIcon,
  },
  "sys.signup": {
    order: 5,
    name: "User signup",
    icon: UserSignUpIcon,
  },
  "sys.validate": {
    order: 6,
    name: "Validation rule",
    icon: ValidationRuleIcon,
  },
  "opr.place": {
    order: 7,
    name: "Modify place",
    icon: null,
  },
  "sys.vote": {
    order: 8,
    name: "User vote",
    icon: null,
  },
  "sys.bot": {
    order: 9,
    name: "Bot operation",
    icon: null,
  },
};

export default ({opsTypes}) => {
  let content = [];
  if (opsTypes.count) {
    opsTypes.objects.sort((p, n) => {
      const pOrder = listSettings[p.id].order;
      const nOrder = listSettings[n.id].order;
      return pOrder - nOrder;
    });

    content = opsTypes.objects.map((o) => {
      const object = listSettings[o.id];
      const icon = object.icon || BlockIcon;
      return <SidebarItem
        key={o.id}
        text={object.name}
        Icon={icon}
        exact
        to={"/data"}
      />
    })
  }

  return <>
    <SidebarHeader text="Objects" count={opsTypes.count}/>
    {content}
  </>;
};