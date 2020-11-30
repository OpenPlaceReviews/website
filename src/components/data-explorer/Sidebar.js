import React from 'react';
import {makeStyles} from "@material-ui/styles";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import QueueIcon from "./icons/QueueIcon";
import BlockIcon from "./icons/BlockIcon";
import BlockIconActive from "./icons/BlockIconActive";
import BlocksIcon from "./icons/BlocksIcon";
import ObjectTypeIcon from "./icons/ObjectTypeIcon";
import UserLoginIcon from "./icons/UserLoginIcon";
import UserPermissionIcon from "./icons/UserPermissionIcon";
import UserSignUpIcon from "./icons/UserSignUpIcon";
import ValidationRuleIcon from "./icons/ValidationRuleIcon";

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    border: "1px solid #CCD0D9",
    textAlign: "center",
    marginBottom: "20px",
  },
});

export default function NestedList() {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filter
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <QueueIcon/>
        </ListItemIcon>
        <ListItemText primary="Queue" />
      </ListItem>

      <Divider />

      <ListItem button>
        <ListItemIcon>
          <BlocksIcon/>
        </ListItemIcon>
        <ListItemText primary="All blocks" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BlockIconActive/>
        </ListItemIcon>
        <ListItemText primary="Block #" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BlockIcon/>
        </ListItemIcon>
        <ListItemText primary="Block #" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BlockIcon/>
        </ListItemIcon>
        <ListItemText primary="Block #" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Show more" />
      </ListItem>

      <Divider />

      <ListSubheader component="div" id="nested-list-subheader">
        Objects
      </ListSubheader>

      <ListItem button>
        <ListItemIcon>
          <ObjectTypeIcon/>
        </ListItemIcon>
        <ListItemText primary="Object type" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <UserLoginIcon/>
        </ListItemIcon>
        <ListItemText primary="User login" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <UserPermissionIcon />
        </ListItemIcon>
        <ListItemText primary="User permission" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <UserSignUpIcon />
        </ListItemIcon>
        <ListItemText primary="User signup" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ValidationRuleIcon />
        </ListItemIcon>
        <ListItemText primary="Validation rule" />
      </ListItem>
    </List>
  );
}
