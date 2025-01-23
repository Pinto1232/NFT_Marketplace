import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  minWidth: '100%',
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#14181C',
  color: '#fff',
}));

export const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));


export const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '1rem',

  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(1),
    fontSize: '95',
  },
}));

export const RightActionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(),
}));

export const BalanceChip = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  color: '#fff',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),

  [theme.breakpoints.down('md')]: {
    whiteSpace: 'nowrap',
    padding: theme.spacing(0.5, 1),
    marginRight: theme.spacing(-2.4),
    fontSize: '12px',
    backgroundColor: '#14181C',
  },
}));

export const UserWalletChip = styled(BalanceChip)(({ theme }) => ({
    borderRadius: '16px',
    [theme.breakpoints.down('md')]: {
      borderRadius: '16px',
      backgroundColor: theme.palette.grey[800],
      color: '#fff',
      border: '1px solid #fff',
        padding: theme.spacing(0.6, 1),
        fontSize: '14px',
    },
  }));

  export const YellowDot = styled('span')(() => ({
    width: '16px',
    height: '16px',
    backgroundColor: '#A3770C',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '8px',
  }));



export const WalletContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    [theme.breakpoints.down('md')]: {
        border: '1px solid rgba(176, 150, 56, 0.64)',
        padding: theme.spacing(0.1, 0.7,),
        alignItems: 'center',
        gap: theme.spacing(0.66), 
        marginLeft: theme.spacing(1),
        borderRadius: '42px',
    },
}));
