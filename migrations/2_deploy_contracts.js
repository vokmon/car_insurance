var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var VehicleModel = artifacts.require('./VehicleModel.sol');

module.exports = async function(deployer) {
  await deployer.deploy(SimpleStorage);
  await deployer.deploy(VehicleModel);
};
