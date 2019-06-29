import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

export default function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.columns.map((column, index) => (
              <StyledTableCell key={index} align={column.align}>{column.title}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              { props.columns.map((column, index) => {
                let data = row[column.data];
                if (data._ethersType === 'BigNumber') {
                  data = data.toNumber();
                }
                if(column.enumOf) {
                  data = column.enumOf[data];
                }
                return <StyledTableCell key={index} align={column.align}>{data}</StyledTableCell>
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}