import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';



  

  export const JumbotronContainer = styled(Box)<{ backgroundImage: string }>(({ backgroundImage }) => ({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '590px',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
  }));
  
  

export const JumbotronContent = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '20px',
  borderRadius: '8px',
  
}));

export const JumbotronTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '10px',
}));

export const JumbotronSubtitle = styled(Typography)(({ theme }) => ({
  marginTop: '0',
}));