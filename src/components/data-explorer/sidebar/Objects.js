import React, {useEffect, useState} from 'react';
import {getOperations} from "../../../api/data";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";
import ObjectTypeIcon from "../icons/ObjectTypeIcon";
import UserLoginIcon from "../icons/UserLoginIcon";
import UserPermissionIcon from "../icons/UserPermissionIcon";
import UserRoleIcon from "../icons/UserRoleIcon";
import UserSignUpIcon from "../icons/UserSignUpIcon";
import ValidationRuleIcon from "../icons/ValidationRuleIcon";
import BlockIcon from "../icons/BlockIcon";

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

export default () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getOperations();
        setData(responce);
      } catch (e) {
        console.warn('Network request failed');
      }
    }

    fetchData();
  }, []);

  let content = [];
  if (data.count) {
    data.objects.sort((p, n) => {
      const pOrder = listSettings[p.object_id].order;
      const nOrder = listSettings[n.object_id].order;
      return pOrder - nOrder;
    });

    content = data.objects.map((o) => {
      const id = o.id[0];
      const object = listSettings[o.object_id];
      const icon = object.icon || BlockIcon;

      return <SidebarItem key={id} text={object.name} Icon={icon}/>
    })
  }

  return <>
    <SidebarHeader text="Objects" count={data.count}/>
    {content}
  </>;
};
