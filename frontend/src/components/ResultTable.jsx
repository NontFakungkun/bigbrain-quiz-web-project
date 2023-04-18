import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ResultTable = (props) => {
  const { players } = props
  const [rows, setRows] = useState([])

  function createData (name, score) {
    return { name, score };
  }

  useEffect(() => {
    players.forEach(player => {
      setRows(rows.push(createData(player, 0)));
      console.log(player);
    });
  }, [])

  // const rows = [
  //   createData('-', 0),
  //   createData('-', 0),
  //   createData('-', 0),
  //   createData('-', 0),
  //   createData('-', 0),
  // ];

  return <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Score🎉</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}

export default ResultTable
