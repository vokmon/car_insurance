/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { vehicleAbi } from '../provider/web3provider';

export default function VehicleModelContainer() {
  const vehicleAbiContext = useContext(vehicleAbi);

  return (
    <div>
      This is vehicle model container screen. {console.log(vehicleAbiContext)}
    </div>
  );
}