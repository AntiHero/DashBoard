import {colors} from '../table/table';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';

const styles = theme => ({
  root: {
    width: '20vw',
    height: '100%',
    marginTop: '50px',
    overflowX: 'hidden',
  },
  cell: {
    width: '100px'
  }
});

function Colors(props) {
  const { classes } = props;

  return (
   <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" className={classes.cell} style={{backgroundColor: `${colors.checked}`}}>
              </TableCell>
              <TableCell component="th" scope="row" className={classes.cell} style={{backgroundColor: 'gray'}} align="center">
                {'Checked'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" style={{backgroundColor: `${colors.checking}`}}>
              </TableCell>
              <TableCell component="th" scope="row" style={{backgroundColor: 'gray'}} align="center">
                {'Need to be checked'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" style={{backgroundColor: `${colors.todo}`}}>
              </TableCell>
              <TableCell component="th" scope="row" style={{backgroundColor: 'gray'}} align="center">
                {'To Do'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" style={{backgroundColor: `${colors.wasted}`}}>
              </TableCell>
              <TableCell component="th" scope="row" style={{backgroundColor: 'gray'}} align="center">
                {'Wasn\'t solved'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row" style={{backgroundColor: `${colors.working}`}}>
              </TableCell>
              <TableCell component="th" scope="row" style={{backgroundColor: 'gray'}} align="center">
                {'Student is working on'}
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(Colors);