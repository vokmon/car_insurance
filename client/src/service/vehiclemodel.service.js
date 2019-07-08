// import { useContext } from 'react';
// import { vehicleAbi } from '../provider/web3provider';
// const vehicleAbiContext = useContext(vehicleAbi);

import { vehicleModelContractInstance, account } from '../provider/web3provider';

export const getModelCount = async () => {
  const response = await vehicleModelContractInstance.methods.id().call();
  return response;
}

export const getAllModels = async () => {
  const count = await getModelCount();
  const models = [];
  for(let i=1; i<=count; i++) {
    const model = await vehicleModelContractInstance.methods.models(i).call();
    models.push(model);
  }
  return models;
}

export const getModelByIds = async (modelIds) => {
  const models = [];
  for(let i=0; i<modelIds.length; i++) {
    const model = await vehicleModelContractInstance.methods.models(modelIds[i]).call();
    models.push(model);
  }
  return models;
}

export const addVehicleModel = (model) => {

  const transactionObject = {
    from: account[0]
  };

  const promise = new Promise(function(resolve, reject) {
    vehicleModelContractInstance.methods.addModel(
      model.brand,
      model.model,
      model.numberOfSeats,
      model.transmission,
      model.engineSize,
      model.fuelType,
      model.bodyStyle,
      model.numberOfDoors,
      model.modelYear,
      ).send(transactionObject,(error, transactionHash) => {
        if (error.message.indexOf('error') >= 0) {
          reject ({error, transactionHash});
        }
        else {
          resolve({error, transactionHash});
        }
        
      });
   });

   return promise;
}