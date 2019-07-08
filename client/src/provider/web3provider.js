// import React from 'react';
import getWeb3 from "../utils/getWeb3";

import VehicleContract from "../contracts/Vehicle.json";
import VehicleModelContract from "../contracts/VehicleModel.json";

// export let vehicleAbi = React.createContext({});


export let vehicleModelContractInstance = null;
export let vehicleContractInstance = null;
export let account = null;

export const initializeWeb3Api = async () => {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    // eslint-disable-next-line no-unused-vars
    const _account = await web3.eth.getAccounts();

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();

    const deployedVehicleModelNetwork = VehicleModelContract.networks[networkId];
    vehicleModelContractInstance = new web3.eth.Contract(
      VehicleModelContract.abi,
      deployedVehicleModelNetwork.address,
    );

    const deployedVehicleNetwork = VehicleContract.networks[networkId];
    vehicleContractInstance = new web3.eth.Contract(
      VehicleContract.abi,
      deployedVehicleNetwork.address,
    );

    account = _account;
    // vehicleAbi = await React.createContext({
    //   vehicleModelContractInstance: vehicleModelContractInstance,
    //   vehicleContractInstance: vehicleContractInstance
    //  })

    // vehicleAbi.vehicleModelContractInstance = vehicleModelContractInstance;
    // vehicleAbi.vehicleContractInstance = vehicleContractInstance;
    return true;
  }
  catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
    return false;
  }
}