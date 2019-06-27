/**
 * Vehicle registration information.
 * When a vehicle is produced it will be assigned number to the important part
 * for identification purpose.
 * This entity contain the information of vehicles' identification
 * e.g. manufactured year, body number, engine number
 */

 pragma solidity ^0.5.0;

import './VehicleModel.sol';

 contract Vehicle {

   struct VehicleDetail {
     uint registrationId;
     uint modelId;
     uint year;
     string bodyNumber;
     string engineNumber;
     string color;
     string additionalFeatures;
     uint kilometres;
   }

  VehicleModel vehicleModel;

  /**
   * @dev Mapping between unique id and Vehicle Detail
   */
  mapping(uint => VehicleDetail) public registeredModels;
  uint public vehicleUid;

  /**
   * @dev Mapping between body number and Vehicle unique id
   */
  mapping(string => uint) public bodyNumberIndex;

  /**
   * @dev Mapping between engine number and Vehicle unique id
   */
  mapping(string => uint) public engineIndex;

  /**
   * @dev Mapping between model id and list of Vehicle unique id
   */
  mapping(uint => uint[]) public modelIndex;

  /**
   * @dev Vehicle is registered successfully
   */
  event VehicleRegistered(uint vehicleUid, string bodyNumber, string engineNumber, uint modelId);

  constructor(VehicleModel _vehicleModel) public {
    vehicleModel = _vehicleModel;
  }

  /**
   * @dev Register a vehicle
   * @param _modelId the model id
   * @param _year the year that this vehicle is registered
   * @param _bodyNumber the body number of the vehicle
   * @param _engineNumber engine number of the vehicle
   * @param _color color
   * @param _additionalFeatures additional feature. Each feature should be separated by a comma
   * @param _kilometres kilometres the vehicle has run
   *
   * Emits an `VehicleRegistered` event.
   */
  function register(
    uint _modelId,
    uint _year,
    string memory _bodyNumber,
    string memory _engineNumber,
    string memory _color,
    string memory _additionalFeatures,
    uint _kilometres
  ) public {

    require(_modelId > 0 && _modelId <= vehicleModel.id(), 'Invalid model id');

    vehicleUid++;
    registeredModels[vehicleUid] = VehicleDetail (
     vehicleUid,
     _modelId,
     _year,
     _bodyNumber,
     _engineNumber,
     _color,
     _additionalFeatures,
     _kilometres
    );

    bodyNumberIndex[_bodyNumber] = vehicleUid;
    engineIndex[_engineNumber] = vehicleUid;
    modelIndex[_modelId].push(vehicleUid);

    emit VehicleRegistered(vehicleUid, _bodyNumber, _engineNumber, _modelId);
  }

  /**
   * @dev Get count of vehicles of a specified model
   * @param _modelId the model id
   */
  function getModelIndexCount(uint _modelId) public view returns(uint count) {
    return modelIndex[_modelId].length;
  }

  function updateKilometres(string memory _bodyNumber, uint _kilometres) public {
    uint vId = bodyNumberIndex[_bodyNumber];
    require(vId > 0 && vId <= vehicleUid, "Invalid vehicle body number");
    VehicleDetail memory vehicleDetail = registeredModels[vId];
    require(vehicleDetail.kilometres <= _kilometres, "New kilometres cannot be less than the existing value.");
    vehicleDetail.kilometres = _kilometres;
    registeredModels[vId] = vehicleDetail;
  }
 }