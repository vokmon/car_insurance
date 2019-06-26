/**
 * Vehicle registration information.
 * When a vehicle is produced it will be assigned number to the important part
 * for identification purpose.
 * This entity contain the information of vehicles' identification
 * e.g. manufactured year, body number, engine number
 */

 pragma solidity ^0.5.0;

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

  function menufacturingRegister(
    uint _modelId,
    uint _year,
    string memory _bodyNumber,
    string memory _engineNumber,
    string memory _color,
    string memory _additionalFeatures,
    uint _kilometres
  ) public {

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

  function updateKilometres(string memory _bodyNumber, uint _kilometres) public {
    uint vId = bodyNumberIndex[_bodyNumber];
    VehicleDetail memory vehicleDetail = registeredModels[vId];
    require(vehicleDetail.kilometres <= _kilometres, "New kilometres cannot be less than the existing value.");
    vehicleDetail.kilometres = _kilometres;
    // registeredModels[vId] = vehicleDetail;
  }
 }