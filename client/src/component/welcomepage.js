import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function PaperSheet() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Project name
        </Typography>
        <Typography component="p">
          To be filled in with the detail of the project
        </Typography>
        <Typography component="p">
          ..
        </Typography>
        <Typography component="p">
          ..
        </Typography>
        <Typography component="p">
          ..
        </Typography>
        <Typography component="p">
          Logo and so on
        </Typography>
      </Paper>
    </div>
  );
}