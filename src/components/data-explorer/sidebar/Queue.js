import React, {useEffect, useState} from 'react';
import SidebarItem from "./SidebarItem";
import QueueIcon from "../icons/QueueIcon";
import {getQueue} from "../../../api/data";
import {NavLink} from "react-router-dom";

export default () => {
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

  return <NavLink to="/data/queue"><SidebarItem count={opsCount} text="Queue" Icon={QueueIcon}/></NavLink>;
}
