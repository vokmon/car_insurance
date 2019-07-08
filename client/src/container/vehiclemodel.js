import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedTables from '../component/table';
import { getAllModels, addVehicleModel } from '../service/vehiclemodel.service';
import { Transmission, FuelType, BodyStyle} from '../utils/vehiclemodelDataEnum';
import FormDialog from '../component/formdialog';

export default function VehicleModelContainer() {

  const [state, setState] = React.useState({
    data: {
      vehicleModels: [],
    },
    ui: {
      snack: {
        open: false,
        message: '',
      }
    }
  });

  function handleSnackClose() {
    setState({
      ...state, 
      ui: {
        ...state.ui,
        snack: {
          open: false,
        }
      } 
    });
  }

  async function fetchModels() {
    const response = await getAllModels();
    setState({ ...state, data: {...state.data, vehicleModels: response }});
  }  

  useEffect(() => {
    fetchModels();
  }, []);

  const columns = [
    {title: 'Id', data: 'id', align: 'left'},
    {title: 'Brand', data: 'brand', align: 'center'},
    {title: 'Model', data: 'model', align: 'left'},
    {title: 'Number of seats', data: 'numberOfSeats', align: 'center', type: 'number'},
    {title: 'Transmission', data:'transmission', enumOf: Transmission, align: 'center'},
    {title: 'Engine Size', data:'engineSize', align: 'left'},
    {title: 'Fuel Type', data:'fuelType', enumOf: FuelType, align: 'center'},
    {title: 'Body Style', data:'bodyStyle', enumOf: BodyStyle, align: 'left'},
    {title: 'Number of Doors', data: 'numberOfDoors', align: 'center', type: 'number'},
    {title: 'Model Year', data:'modelYear', align: 'center', type: 'number'},
  ]

  // Remove the first element
  const formFields = [...columns];
  formFields.shift();

  const handleSubmit = async(value) => {
    try {
      const receipt = await addVehicleModel(value);
      console.log(receipt);
      fetchModels();
      setState({
        ...state, 
        ui: {
          ...state.ui,
          snack: {
            open: true,
            message: `The vehicle model ${value.brand} - ${value.model} is added successfully`
          }
        } 
      });
    } catch(error) {
      console.log(error);
      setState({
        ...state, 
        ui: {
          ...state.ui,
          snack: {
            open: true,
            message: JSON.stringify(error)
          }
        } 
      });
    }
  }

  const formDialogProps = {
    buttonTitle: 'Add Model',
    dialogTitle: 'Add a new Vehicle Model',
    formFields,
    handleSubmit
  }

  return (
    <div>
      <FormDialog {...formDialogProps} />
      <CustomizedTables columns={columns} data={state.data.vehicleModels} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={state.ui.snack.open}
        onClose={handleSnackClose}
        autoHideDuration={3000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{state.ui.snack.message}</span>}
      />
    </div>
  );
}