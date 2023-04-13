import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';

const ModalStartGameBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  color: green,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  opacity: [1, 1, 1],
});

export default ModalStartGameBox
