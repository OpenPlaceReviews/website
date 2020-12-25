import React, {useEffect, useState} from 'react';

import {getQueue} from "../../../../../api/data";

import queueIcon from "../../../../../assets/images/blockchain_icons/queue.svg";
import SidebarItem from "./SidebarItem";
import Icon from "../Icon";

export default function Queue() {
  const [opsCount, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { count } = await getQueue();
        setCount(count);
      } catch (e) {
        console.warn('Network request failed');
      }
    }

    fetchData();
  }, []);

  const itemIcon = <Icon url={queueIcon}/>;
  return <SidebarItem count={opsCount} text="Queue" icon={itemIcon} to="/data/queue"/>;
}
