import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import fetchRequest from '../utils/fetchRequest';
import { Box } from '@mui/system';

const ResultTable = (props) => {
  const { sessionId } = props;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchRequest({}, 'GET', `/admin/session/${sessionId}/results`)
      .then(data => {
        data.results.forEach(player => {
          let score = 0;
          player.answers.forEach((answer) => {
            if (answer.correct) { score++; }
          })
          const newRows = rows;
          newRows.push({ name: player.name, score });
          setRows(newRows);
        })
      })
      .catch('session still active');
  }, []);

  return <>
  <Box sx={{ width: 500, height: 500 }}>
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <>
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">
              {row.score}
            </TableCell>
          </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Box>
  </>
}

export default ResultTable
