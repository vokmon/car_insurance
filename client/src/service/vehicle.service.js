import { vehicleContractInstance } from '../provider/web3provider';

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