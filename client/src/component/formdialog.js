import React, {useRef} from 'react';

import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Toolbar,
  Typography,

} from '@material-ui/core';
import  CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Form from './form';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog({
    buttonTitle='Please define button title',
    dialogTitle='Please define dialog title',
    formFields={},
    handleSubmit= ()=>{},
  }) {
  
  const classes = useStyles();
  // Internal state of the component
  const [state, setState] = React.useState({
    open: false,
    dataValue: {},
  });

  function handleClickOpen() {
    setState({
      ...state,
      open: true,
    });
  }

  function handleClose() {
    setState({
      ...state,
      open: false,
    });
  }

  const formEL = useRef(null);

  function handleSave() {
    formEL.current.submit();
  }

  const onSubmit = async (value) => {
    await handleSubmit(value);
    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonTitle}
      </Button>
      <Dialog fullScreen open={state.open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {dialogTitle}
            </Typography>
            <Button color="inherit" onClick={handleSave}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Form formFields={formFields} 
                elRef={formEL}
                onSubmit={onSubmit}
                dataValue={state.dataValue} />
        </DialogContent>
      </Dialog>
    </div>
  );
}