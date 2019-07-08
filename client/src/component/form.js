import React from 'react';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '30%',
  },
  dense: {
    marginTop: 19,
  },
  option: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    cursor: 'pointer',
    "&:hover, &:focus": {
      backgroundColor: '#d4d4d4',
    }
  }
}));

export default function Form({
  formFields={},
  elRef,
  onSubmit=()=>{},
  }) {

  const classes = useStyles();
  
  // Internal state of the component
  const initialValue = {};
  for(const f in formFields) {
    initialValue[formFields[f].data] = '';
  }
   

  const [state, setState] = React.useState({...initialValue});

  const handleChange = prop => event => {
    setState({
      ...state,
      [prop]: event.target.value,
    });
  }

  const handleSubmit = () => {
    onSubmit(state);
  }

  return (
    <ValidatorForm
        ref={elRef}
        className={classes.container}
        onSubmit={handleSubmit}
        onError={errors => console.log('There are errors: ' + errors)}
    >
      {formFields.map((field, index) => (
        field.enumOf ?
          <SelectValidator
          key={`text-field-${index}`}
          id={`text-field-id-${index}`}
          label={field.title}
          className={classes.textField}
          onChange={handleChange(field.data)}
          margin='normal'
          value={state[field.data]}
          validators={['required']}
          errorMessages={['this field is required']}
        >
          {Object.keys(field.enumOf).map((option, index) => (
            <option key={index} value={option} className={classes.option}>
              {field.enumOf[option]}
            </option>
          ))}
        </SelectValidator>
        :
        <TextValidator
          key={`text-field-${index}`}
          id={`text-field-id-${index}`}
          label={field.title}
          className={classes.textField}
          onChange={handleChange(field.data)}
          margin="normal"
          type={field.type? field.type : 'string'}
          value={state[field.data]}
          validators={['required']}
          errorMessages={['this field is required']}
        />
      ))}
    </ValidatorForm>
  );
}