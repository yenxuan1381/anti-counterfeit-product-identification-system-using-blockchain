// import { HomeBackground } from '@assets/index';
import bgImg from '../../img/bg.png'
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component using MUI's styled utility
export const ThemeContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  minHeight: '100vh',
  backgroundImage: `url(${bgImg})`,
  backgroundColor: '#020202',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}));
