/* eslint-disable no-undef */
const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const VehicleModel = artifacts.require('./VehicleModel.sol');
const Vehicle = artifacts.require('./Vehicle.sol');

module.exports = async function(deployer) {
  await deployer.deploy(SimpleStorage);
  const deployedVehicleModel = await deployer.deploy(VehicleModel);
  await deployer.deploy(Vehicle, deployedVehicleModel.address);
};
