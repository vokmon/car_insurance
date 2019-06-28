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
    Petrol,
    Deisel
  }

  enum BodyStyle {
    Convertible, //0
    Coupe,       //1
    Hatchback,   //2
    Sedan,       //3
    Station_Wagon, //4
    RV_SUV,      //5
    Ute,         //6
    Van,         //7
    Other        //8
  }

  struct ModelDetail {
    uint id;
    string brand;
    string model;
    uint8 numberOfSeats;
    Transmission transmission;
    string engineSize; // engine size e.g. 6 cylinder, 2496cc
    FuelType fuelType; // fuel type - Pretol / Deisel
    BodyStyle bodyStyle;
    uint numberOfDoors;
    uint modelYear;
  }

  /**
   * @dev Mapping of unique id and Model Details
   */
  mapping(uint => ModelDetail) public models;

  /**
   * @dev generated unique id
   */
  uint public id;

  /**
   * @dev Model is added successfully
   */
  event ModelAdded(uint id);

  /**
   * @dev add a new vehicle model
   */
  function addModel(
    string memory _brand,
    string memory _model,
    uint8 _numberOfSeats,
    uint _transmission,
    string memory _engineSize,
    uint _fuelType,
    uint _bodyStyle,
    uint _numberOfDoors,
    uint _modelYear
    ) public {

    ModelDetail memory detail = ModelDetail(
      ++id,
      _brand,
      _model,
      _numberOfSeats,
      Transmission(_transmission),
      _engineSize,
      FuelType(_fuelType),
      BodyStyle(_bodyStyle),
      _numberOfDoors,
      _modelYear
    );

    models[id] = detail;
    emit ModelAdded(id);
  }

  function getModelYear(uint _modelId) public view returns (uint) {
    require(_modelId > 0 && _modelId <= id, 'Invalid model id');
    ModelDetail memory detail = models[_modelId];
    return detail.modelYear;
  }
}