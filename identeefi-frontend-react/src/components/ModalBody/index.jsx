import { styled } from '@mui/material/styles'

const ModalBody =  styled('div')(({ theme }) => ({
  // minHeight: 200,
  // minWidth: 200,
  background: theme.palette.background.paper,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'center',
  borderRadius: 10,
  boxShadow: `17px 19px 37px -10px black`,
}))
export default ModalBody;