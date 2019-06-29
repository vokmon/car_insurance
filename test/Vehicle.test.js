/* eslint-disable no-undef */
import { vehicleModelList, vehicleList } from './data';

const VehicleModel = artifacts.require('VehicleModel');
const Vehicle = artifacts.require('Vehicle');

// eslint-disable-next-line no-unused-vars
contract('VehicleModel', function([_, wallet, investor1, investor2, investor3]) {
  before(async function() {
    this.vehicleModel = await VehicleModel.deployed();
    this.vehicle = await Vehicle.deployed();

    for(let i=0; i< vehicleModelList.length; i++) {
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

  describe('Register vehicle', function() {
    it('can register a vehicle successfully', async function() {

      const vehicleUid = await this.vehicle.vehicleUid();
      const v = vehicleList[0];
      const receipt = await this.vehicle.register (
        v.modelId,
        v.year,
        v.bodyNumber,
        v.engineNumber,
        v.color,
        v.additionalFeatures,
        v.kilometres,
      );

      assert.equal(receipt.logs.length, 1, 'triggers one event');
      const log = receipt.logs[0];
      assert.equal(log.event, 'VehicleRegistered', 'should be the "VehicleRegistered" event');

      // id is incremented by 1
      assert.equal(log.args.vehicleUid, vehicleUid.toNumber() + 1, 'logs the id of the vehicle model');
    });

    it('fails to register a vehicle: invalid model id', async function() {
      try {
        const v = vehicleList[0];
        await this.vehicle.register (
          0,
          v.year,
          v.bodyNumber,
          v.engineNumber,
          v.color,
          v.additionalFeatures,
          v.kilometres,
        );
      }
      catch(error) {
        assert(error.message.indexOf('revert')>=0, 'error message must contain revert');
      }

      try {
        const v = vehicleList[0];
        await this.vehicle.register (
          999,
          v.year,
          v.bodyNumber,
          v.engineNumber,
          v.color,
          v.additionalFeatures,
          v.kilometres,
        );
      }
      catch(error) {
        assert(error.message.indexOf('revert')>=0, 'error message must contain revert');
      }
    });

    it('fails to register a vehicle: body number is already registered', async function() {
      try {
        const v = vehicleList[0];
        await this.vehicle.register (
          1,
          v.year,
          v.bodyNumber,
          'NEW_ENGINE_NUMBER',
          v.color,
          v.additionalFeatures,
          v.kilometres,
        );
      }
      catch(error) {
        assert(error.message.indexOf('revert')>=0, 'error message must contain revert');
      }
    });

    it('fails to register a vehicle: engine number is already registered', async function() {
      try {
        const v = vehicleList[0];
        await this.vehicle.register (
          1,
          v.year,
          'NEW_BODY_NUMBER',
          v.engineNumber,
          v.color,
          v.additionalFeatures,
          v.kilometres,
        );
      }
      catch(error) {
        assert(error.message.indexOf('revert')>=0, 'error message must contain revert');
      }
    });
  });

  describe('Retrieving vehicles', function() {
    before(async function() {
      for(let i=1; i< vehicleList.length; i++) {
        const v = vehicleList[i];
        await this.vehicle.register (
          v.modelId,
          v.year,
          v.bodyNumber,
          v.engineNumber,
          v.color,
          v.additionalFeatures,
          v.kilometres,
        );

        const vehicleUid = await this.vehicle.vehicleUid();
        assert(vehicleUid, 9, 'Correct latest vechicleUid');
      }
    });
    
    it('get vehicle by vehicle id', async function() {
      const vehicleUid = await this.vehicle.vehicleUid();
      for (let i=1; i<= vehicleUid; i++) {
        const v = await this.vehicle.registeredModels(i);
        const a = vehicleList[i-1];
        {
          assert.equal(v.modelId, a.modelId, 'Model id is correct');
          assert.equal(v.year.toNumber(), a.year, 'Registered year is correct');
          assert.equal(v.bodyNumber, a.bodyNumber, 'Body number is correct');
          assert.equal(v.engineNumber, a.engineNumber, 'Engine number is correct');
          assert.equal(v.color, a.color, 'Color type is correct');
          assert.equal(v.additionalFeatures, a.additionalFeatures, 'Additional Features style is correct');
          assert.equal(v.kilometres.toNumber(), a.kilometres, 'Kilometres of doors is correct');
        }

      }
    });

    it('get vehicle id by body number', async function() {
      for (let i=0; i< vehicleList.length; i++) {
        const v = vehicleList[i];
        const vehicleUid = await this.vehicle.bodyNumberIndex(v.bodyNumber);
        assert.equal(vehicleUid.toNumber(), i+1, 'vehicle uid is correct');
      }
    });

    it('get vehicle id by engine number', async function() {
      for (let i=0; i< vehicleList.length; i++) {
        const v = vehicleList[i];
        const vehicleUid = await this.vehicle.engineIndex(v.engineNumber);
        assert.equal(vehicleUid.toNumber(), i+1, 'vehicle uid is correct');
      }
    });

    it('get vehicle ids by model id', async function() {
      // Get number of vehicle of model id 1
      const modelVehicleIndexCount = await this.vehicle.getModelIndexCount(1);
      assert.equal(modelVehicleIndexCount.toNumber(), 3, 'vehicle count of a model is correct');

      for(let i=0; i<modelVehicleIndexCount; i++) {
        const vehicleUid = await this.vehicle.modelIndex(1, i);
        assert.equal(vehicleUid.toNumber(), i+1, 'vehicle uid is correct');
      }
    });
  });

  describe('Update vehicle kilometres', function() {
    it('Successfully update vehicle kilometres', async function() {
      const km = 1000;
      const vehicle1BeforeUpdate = await this.vehicle.registeredModels(1);
      assert.equal(vehicle1BeforeUpdate.kilometres.toNumber(), 0, 'Number of kilometre is correct');

      await this.vehicle.updateKilometres(vehicle1BeforeUpdate.bodyNumber, km);
      const vehicle1AfterUpdate = await this.vehicle.registeredModels(1);
      assert.equal(vehicle1AfterUpdate.kilometres.toNumber(), km, 'Number of kilometre is updated correctly');
    });

    it('Failed update vehicle kilometres: Invalid vehicle body number', async function() {
      try {
        // pass in invalid body number
        await this.vehicle.updateKilometres('xxx', 1000);
        assert.throws();
      }
      catch(e) {
        assert(e.message.indexOf('revert')>=0, 'error message must contain revert');
      }
    });

    it('Failed update vehicle kilometres: Negative km', async function() {
      try {
        const initialKm = 1000;
        const vehicle2 = await this.vehicle.registeredModels(2);

        // pass in correct body number but kilometres
        await this.vehicle.updateKilometres(vehicle2.bodyNumber, initialKm);

         // pass in correct body number but incorect kilometres
         await this.vehicle.updateKilometres(vehicle2.bodyNumber, initialKm-1);
      }
      catch(e) {
        assert(e.message.indexOf('revert')>=0, 'error message must contain revert');
      }
    });
  });
});