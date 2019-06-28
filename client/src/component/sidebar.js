import React from 'react';
import {
  Divider,
  ListItemIcon,
  ListItem,
  ListItemText,
  List,
  SwipeableDrawer,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

export default function Sidebar({
  toggleDrawer, 
  menuList,
  open}) {
  const sideMenuStyle = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  const classes = sideMenuStyle();

  return (
    <SwipeableDrawer
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        { menuList.map((record, index) => (
            <ListItem button key={record.text}>
              <ListItemIcon>{record.icon}</ListItemIcon>
              <ListItemText primary={record.text} />
            </ListItem>
          ))
        }
      </List>
      <Divider />
    </div>
    </SwipeableDrawer>
  );
}
