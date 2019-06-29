import React, {useEffect} from 'react';
import CustomizedTables from '../component/table';
import { getAllModels } from '../service/vehiclemodel.service';
import { Transmission, FuelType, BodyStyle} from '../utils/vehiclemodelDataEnum';

export default function VehicleModelContainer() {

  const [state, setState] = React.useState({
    vehicleModels: [],
  });

  useEffect(() => {
    async function fetchModels() {
      const response = await getAllModels();
      setState({ ...state, vehicleModels: response });
    }  
    fetchModels();
  }, []);

  const columns = [
    {title: 'Id', data: 'id', align: 'left'},
    {title: 'Brand', data: 'brand', align: 'center'},
    {title: 'Model', data: 'model', align: 'left'},
    {title: 'Number of seats', data: 'numberOfSeats', align: 'center'},
    {title: 'Transmission', data:'transmission', enumOf: Transmission, align: 'center'},
    {title: 'Engine Size', data:'engineSize', align: 'left'},
    {title: 'Fuel Type', data:'fuelType', enumOf: FuelType, align: 'center'},
    {title: 'Body Style', data:'bodyStyle', enumOf: BodyStyle, align: 'left'},
    {title: 'Number of Doors', data: 'numberOfDoors', align: 'center'},
    {title: 'Model Year', data:'modelYear', align: 'center'},
  ]
  return (
    <div>
      <CustomizedTables columns={columns} data={state.vehicleModels} />
    </div>
  );
}