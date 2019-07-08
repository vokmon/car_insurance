import { vehicleContractInstance, account } from '../provider/web3provider';

export const getVehicleCount = async () => {
  const response = await vehicleContractInstance.methods.vehicleUid().call();
  return response;
}

export const getAllVehicles = async () => {
  const count = await getVehicleCount();
  const vehicles = [];
  for(let i=1; i<=count; i++) {
    const vehicle = await vehicleContractInstance.methods.registeredModels(i).call();
    vehicles.push(vehicle);
  }
  return vehicles;
}

export const addVehicle = async (vehicle) => {
  const transactionObject = {
    from: account[0]
  };

  const promise = new Promise(function(resolve, reject) {
    vehicleContractInstance.methods.register(
      vehicle.modelId,
      vehicle.year,
      vehicle.bodyNumber,
      vehicle.engineNumber,
      vehicle.color,
      vehicle.additionalFeatures,
      vehicle.kilometres
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