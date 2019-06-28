// import { useContext } from 'react';
// import { vehicleAbi } from '../provider/web3provider';
// const vehicleAbiContext = useContext(vehicleAbi);

import { vehicleModelContractInstance } from '../provider/web3provider';

export const getModelCount = async () => {
  const response = await vehicleModelContractInstance.methods.id().call();
  return response;
}

export const getAllModels = async () => {
  const count = await vehicleModelContractInstance.methods.id().call();
  const models = [];
  for(let i=1; i<=count; i++) {
    const model = await vehicleModelContractInstance.methods.models(i).call();
    models.push(model);
  }
  return models;
}