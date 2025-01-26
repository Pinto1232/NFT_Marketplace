import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const JumbotronContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'backgroundImage',
})<{ backgroundImage: string }>(({ theme, backgroundImage }) => ({
  background: `
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    ${backgroundImage ? `url(${backgroundImage})` : theme.palette.background.default}
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '590px',
  width: '100%',
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  overflow: 'hidden',
  transition: 'background 1s ease-in-out',
  animation: 'fadeIn 1s ease-in',
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  }
}));

export const JumbotronContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}));

export const JumbotronTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
}));

export const JumbotronSubtitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 400,
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
}));