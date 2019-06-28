import React from 'react';
import WelcomePage from '../component/welcomepage';
import VehicleModelContainer from './vehiclemodel';
import VehicleContainer from './vehicle';

import HomeIcon from '@material-ui/icons/Home';
import PagesIcon from '@material-ui/icons/Pages';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

export const routes = [
  {
    path: "/",
    exact: true,
    main: () => <WelcomePage />,
    title: () => 'Home',
  },
  {
    path: "/vehiclemodel",
    main: () => <VehicleModelContainer />,
    title: () =>'Vehicle Model',
  },
  {
    path: "/vehicle",
    main: () => <VehicleContainer />,
    title: () => 'Vehicle',
  }
];

export const menuList = [
  {text: 'Home', icon: <HomeIcon />, path: '/'},
  {devider: true},
  {text: 'Vehicle model', icon: <PagesIcon />, path: 'vehiclemodel'}, 
  {text: 'Vehicle', icon: <DriveEtaIcon />, path: 'vehicle'},
  {devider: true} 
]

