import React from 'react';
import {makeStyles} from "@material-ui/styles";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SidebarHeader from "./sidebar/SidebarHeader";
import Queue from "./sidebar/Queue";
import BlocksFilter from "./sidebar/BlocksFilter";
import Objects from "./sidebar/Objects";

const MemoQueue = React.memo(Queue);
const MemoBlocksFilter = React.memo(BlocksFilter);
const MemoSidebarObjects = React.memo(Objects);

const useStyles = makeStyles({
  root: {
    marginTop: '114px',
    width: '100%',
    maxWidth: 360,
    border: "1px solid #CCD0D9",
    textAlign: "center",
    marginBottom: "20px",
    borderRadius: "5px",
  },
  divider: {
    background: "#CCD0D9",
  }
});

export default function Sidebar() {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <SidebarHeader text="Filter"/>
      }
      className={classes.root}
    >
      <MemoQueue/>
      <Divider className={classes.divider}/>
      <MemoBlocksFilter/>
      <Divider className={classes.divider}/>
      <MemoSidebarObjects/>
    </List>
  );
}
