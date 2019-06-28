import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';


import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../component/sidebar';

export default function PrimaryAppBar() {
  const menuList = [
    {text: 'Vehicle model', icon: <InboxIcon />}, 
    {text: 'Vehicle', icon: <MailIcon />},  
  ]

  const [state, setState] = React.useState({
    sideMenu: false,
  });

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, sideMenu: open });
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='Open drawer'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Vehicle blockchain
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar toggleDrawer={toggleDrawer} menuList={menuList} open={state.sideMenu} />
    </div>
  );
}
