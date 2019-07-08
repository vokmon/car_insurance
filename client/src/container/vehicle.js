import React, {useEffect} from 'react';
import CustomizedTables from '../component/table';
import { addVehicle, getAllVehicles } from '../service/vehicle.service';
import Snackbar from '@material-ui/core/Snackbar';
import { getAllModels } from '../service/vehiclemodel.service';
import FormDialog from '../component/formdialog';

export default function VehicleContainer() {

  const [state, setState] = React.useState({
    vehicles: [],
    models: [],
  });

  const [ui, setUi] = React.useState({
    snack: {
      open: false,
      message: '',
    }
  });

  async function fetchVehicles() {
    const vehiclesPromise = getAllVehicles();
    const modelsPromise = getAllModels();
    const result = await Promise.all([vehiclesPromise, modelsPromise]);

    const [vehiclesResponse, models] = result;
    const modelsWithId = {};
    const modelsEnum = {};
    models.forEach(m => {
      modelsWithId[m.id] = m;
      modelsEnum[m.id] = `${m.brand}-${m.model} (${m.modelYear})`
    });

    const vehicles = vehiclesResponse.map(v =>(
      {
        brand: modelsWithId[v.modelId].brand,
        model: modelsWithId[v.modelId].model,
        modelYear: modelsWithId[v.modelId].modelYear,
        ...v,
      }
    ));
    setState({ ...state, vehicles: vehicles, models: modelsEnum });
  }

  useEffect(() => {  
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

  // Remove the first element
  const formFields = [
    {title: 'Brand-Model', data:'modelId', enumOf: state.models},
    {title: 'Registered Year', data: 'year', type: 'number'},
    {title: 'Body Number', data: 'bodyNumber'},
    {title: 'Engine Number', data:'engineNumber'},
    {title: 'Color', data:'color'},
    {title: 'Additioal Features', data:'additionalFeatures'},
    {title: 'Kilometres', data:'kilometres', type: 'number'}
  ];


  function handleSnackClose() {
    setUi({
      ...ui,
      snack: {
        open: false,
      } 
    });
  }

  const handleSubmit = async(value) => {
    console.log(value);
    try{
      const receipt = await addVehicle(value);
      console.log(receipt);
      fetchVehicles();
      setUi({
        ...ui,
        snack: {
          open: true,
          message: `The vehicle model ${value.brand} - ${value.model} is added successfully`
        }
      });
    } catch(error) {
      console.log(error);
      setUi({
        ...ui,
        snack: {
          open: true,
          message: JSON.stringify(error)
        } 
      });
    }

  };

  const formDialogProps = {
    buttonTitle: 'Add Vehicle',
    dialogTitle: 'Add a new Vehicle',
    formFields,
    handleSubmit
  }

  return (
    <div>
      <FormDialog {...formDialogProps} />
      <CustomizedTables columns={columns} data={state.vehicles} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={ui.snack.open}
        onClose={handleSnackClose}
        autoHideDuration={3000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{ui.snack.message}</span>}
      />
    </div>
  );
}