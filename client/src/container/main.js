import React from 'react';
import {
  LinearProgress,
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { menuList, routes } from './constants';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../component/sidebar';

export default function Main(props) {

  const [state, setState] = React.useState({
    sideMenu: false,
  });

  const toggleDrawer = (open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, sideMenu: open });
  };

  
  const createRouter = () => {

    return (
      <div>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    );
  }
  
  const createTitleRouter = () => {
    return (
      <div>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.title}
          />
        ))}
      </div>
    );
  }

  return (
    <Router>
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
          <Typography variant='h6' noWrap style={{marginLeft: 10}}>
            { createTitleRouter() }
          </Typography>
        </Toolbar>
      </AppBar>
        <Sidebar toggleDrawer={toggleDrawer} menuList={menuList} open={state.sideMenu} />
        {
          props.loading? <LinearProgress color='secondary' />:
          <div style={{marginTop: 20, marginBottom: 40, marginLeft: 20, marginRight: 20}}>
            {createRouter()}
          </div>
        }
        
    </Router>
    
  );
}
