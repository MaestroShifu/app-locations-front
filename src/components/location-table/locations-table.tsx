import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IconButton } from '@material-ui/core';
import { ILocation } from '../../service/location-api';

interface ILocationsTable {
  className?: string;
  locations: ILocation[];
  isView: boolean;
  viewAction: (index: number) => void;
  deleteAction: (id: string) => void;
}

const LocationsTable: React.FunctionComponent<ILocationsTable> = (props) => {
  const rows = props.locations.map((location, index) => {
    const deleteAction = () => {
      props.deleteAction(location.id || '');
    }
    const viewAction = () => {
      props.viewAction(index)
    }
    const btnView = props.isView ? (
      <IconButton aria-label='view' onClick={viewAction}>
        <VisibilityIcon/>
      </IconButton>      
    ) : null;
    return (
      <TableRow key={location.id}>
        {/* ID */}
        <TableCell component='th' scope='row'>{location.id}</TableCell>
        {/* NAME */}
        <TableCell align='right'>{location.name}</TableCell>
        {/* AREA M2 */}
        <TableCell align='right'>{location.area_m2}</TableCell>
        {/* ACTIONS */}
        <TableCell align='right'>
          { btnView }
          <IconButton aria-label='delete' onClick={deleteAction}>
            <DeleteIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper} className={props.className}>
      <Table aria-label='locations table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right'>Area m2</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LocationsTable;