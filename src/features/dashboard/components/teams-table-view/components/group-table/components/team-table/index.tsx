import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ResultSummary } from '../../../../types';
import { Typography } from '@material-ui/core';

interface Props {
  groupNumber: number;
  data: ResultSummary[];
}

export default function TeamTable({ groupNumber, data }: Props): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Typography variant='h6' style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}} align={'center'}>
        Group {groupNumber}
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team name</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">Goals Scored</TableCell>
            <TableCell align="right">Alternate Points</TableCell>
            <TableCell align="right">Registration Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.points}</TableCell>
              <TableCell align="right">{row.goals}</TableCell>
              <TableCell align="right">{row.altPoints}</TableCell>
              <TableCell align="right">{new Date(row.registrationDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
