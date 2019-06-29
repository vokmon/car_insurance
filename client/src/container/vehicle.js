import React, {useEffect} from 'react';
import CustomizedTables from '../component/table';
import { getAllVehicles } from '../service/vehicle.service';
import { getModelByIds } from '../service/vehiclemodel.service';

export default function VehicleContainer() {

  const [state, setState] = React.useState({
    vehicles: [],
  });


  useEffect(() => {
    async function fetchVehicles() {
      const response = await getAllVehicles();
      const modelIds = response.map(r => (r.modelId.toNumber()))
      const uniqueModelIds = [...new Set(modelIds)];
      const models = await getModelByIds(uniqueModelIds);

      const modelsWithId = {}
      models.forEach(m => {
        modelsWithId[m.id] = m;
      });

      const vehicles = response.map(v =>(
        {
          brand: modelsWithId[v.modelId].brand,
          model: modelsWithId[v.modelId].model,
          modelYear: modelsWithId[v.modelId].modelYear,
          ...v,
        }
      ));
      setState({ ...state, vehicles: vehicles });
    }  
    fetchVehicles();
  }, []);

  const columns = [
    {title: 'Id', data: 'registrationId', align: 'left'},
    {title: 'Brand', data: 'brand', align: 'center'},
    {title: 'Model', data: 'model', align: 'left'},
    {title: 'Model Year', data:'modelYear', align: 'center'},
    {title: 'Registered Year', data: 'year', align: 'center'},
    {title: 'Body Number', data: 'bodyNumber', align: 'center'},
    {title: 'Engine Number', data:'engineNumber', align: 'center'},
    {title: 'Color', data:'color', align: 'left'},
    {title: 'Additioal Features', data:'additionalFeatures', align: 'left'},
    {title: 'Kilometres', data:'kilometres', align: 'right'},
  ]
  return (
    <div>
      <CustomizedTables columns={columns} data={state.vehicles} />
    </div>
  );
}