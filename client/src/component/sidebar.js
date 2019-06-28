import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
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
    link: {
      textDecoration: 'none',
      color: 'inherit',
    }
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
          record.devider?
            (<Divider key={index} />)
            :
            (
              <Link to={record.path} key={record.path} className={classes.link}>
                <ListItem button key={record.text}>
                  <ListItemIcon>{record.icon}</ListItemIcon>
                  <ListItemText primary={record.text} />
                </ListItem>
              </Link>
            )
          ))
        }
      </List>
    </div>
    </SwipeableDrawer>
  );
}
