/**
  * Characteric of a vehicle model in the market.
  * This model only contain main infomation of vehicle model.
  * Other specific information e.g. body number, color, year are stored in VehicleDetail.sol
  */

pragma solidity ^0.5.0;

// import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract VehicleModel {

  enum Transmission {
    Manual,
    Automatic
  }

  enum FuelType {
    Pretol,
    Deisel
  }

  struct ModelDetail {
    string brand;
    string model;
    uint8 numberOfSeats;
    Transmission transmission;
    uint8 engineSize; // engine size in cc
    FuelType fuelType; // fuel type - Pretol / Deisel
  }

  uint public id;
  mapping(uint => ModelDetail) public models;

  /**
   * @dev add a new vehicle model
   */
  function addModel(
    string memory _brand,
    string memory _model,
    uint8 _numberOfSeats,
    uint _transmission,
    uint8 _engineSize,
    uint _fuelType) public {

    ModelDetail memory detail = ModelDetail(
      _brand,
      _model,
      _numberOfSeats,
      Transmission(_transmission),
      _engineSize,
      FuelType(_fuelType)
    );

    models[++id] = detail;
  }
}