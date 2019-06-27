/* eslint-disable no-undef */
import { vehicleModelList } from './data';

const VehicleModel = artifacts.require('VehicleModel');

// eslint-disable-next-line no-unused-vars
contract('VehicleModel', function([_, wallet, investor1, investor2, investor3]) {

  beforeEach(async function() {
    this.vehicleModel = await VehicleModel.deployed();
  });

  describe('Add vehicle model', function() {
    it('VehicleModel can be added successfully', async function() {
      const currentId = await this.vehicleModel.id();

      const receipt = await this.vehicleModel.addModel(
        vehicleModelList[0].brand, 
        vehicleModelList[0].model,
        vehicleModelList[0].numberOfSeats,
        vehicleModelList[0].transmission,
        vehicleModelList[0].engineSize,
        vehicleModelList[0].fuelType,
        vehicleModelList[0].bodyStyle,
        vehicleModelList[0].numberOfDoors,
        vehicleModelList[0].modelYear
      );
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      const log = receipt.logs[0];
      assert.equal(log.event, 'ModelAdded', 'should be the "ModelAdded" event');

      // id is incremented by 1
      assert.equal(log.args.id, currentId.toNumber() + 1, 'logs the id of the vehicle model');

    });
  });

  describe('Get vehicle models', function() {
    before(async function() {
      // Add a few more
      for(let i=1; i< vehicleModelList.length; i++) {
        await this.vehicleModel.addModel(
          vehicleModelList[i].brand,
          vehicleModelList[i].model,
          vehicleModelList[i].numberOfSeats,
          vehicleModelList[i].transmission,
          vehicleModelList[i].engineSize,
          vehicleModelList[i].fuelType,
          vehicleModelList[i].bodyStyle,
          vehicleModelList[i].numberOfDoors,
          vehicleModelList[i].modelYear
        )
      }
    });

    it('Get vehicle model by id', async function() {
      const model = await this.vehicleModel.models(1);
      assert.equal(model.id.toNumber(), 1, 'Id is correct');
      assert.equal(model.brand, 'Toyota', 'Brand is correct');
      assert.equal(model.model, 'Yarris', 'Model is correct');
      assert.equal(model.numberOfSeats.toNumber(), 5, 'Number of seats is correct');
      assert.equal(model.transmission.toNumber(), 1, 'Transmission type of seats is correct');  
      assert.equal(model.engineSize, '1800 cc', 'Engine size is correct');
      assert.equal(model.fuelType.toNumber(), 0, 'Fuel type size is correct');
      assert.equal(model.bodyStyle.toNumber(), 3, 'Body style is correct');
      assert.equal(model.numberOfDoors.toNumber(), 4, 'Number of doors is correct');
      assert.equal(model.modelYear.toNumber(), 2018, 'Model year is correct');
    });

    it('Get list of vehicle', async function() {
      const currentId = await this.vehicleModel.id();
      assert.equal(currentId, 3, 'Number of models is correct');

      for(let i=1; i<= currentId; i++) {
        const model = await this.vehicleModel.models(i);
        // console.log(model);
        const index = i-1;
        // console.log(this.vehicleModelList[index]);

        assert.equal(model.id.toNumber(), i, 'Id is correct');
        assert.equal(model.brand, vehicleModelList[index].brand, 'Brand is correct');
        assert.equal(model.model, vehicleModelList[index].model, 'Model is correct');
        assert.equal(model.numberOfSeats.toNumber(), vehicleModelList[index].numberOfSeats, 'Number of seats is correct');
        assert.equal(model.transmission.toNumber(), vehicleModelList[index].transmission, 'Transmission type of seats is correct');  
        assert.equal(model.engineSize, vehicleModelList[index].engineSize, 'Engine size is correct');
        assert.equal(model.fuelType.toNumber(), vehicleModelList[index].fuelType, 'Fuel type size is correct');
        assert.equal(model.bodyStyle.toNumber(), vehicleModelList[index].bodyStyle, 'Body style is correct');
        assert.equal(model.numberOfDoors.toNumber(), vehicleModelList[index].numberOfDoors, 'Number of doors is correct');
        assert.equal(model.modelYear.toNumber(), vehicleModelList[index].modelYear, 'Model year is correct');
      }
    });
  });

  describe('Get vehicle model year', function() {
    it('can get model year successfully', async function() {
      const year = await this.vehicleModel.getModelYear(1);
      assert.equal(year.toNumber(), 2018, 'Model year is correct');
    });

    it('wrong model id', async function() {
      try {
        await this.vehicleModel.getModelYear(100);
        assert.throws();
      } catch(error) {
        assert(error.message.indexOf('revert')>=0, 'error message must contain revert');
      }

      try {
        await this.vehicleModel.getModelYear(0);
        assert.throws();
      } catch(error) {
        assert(error.message.indexOf('revert')>=0, 'error message must contain revert');
      }
    });
  });

});