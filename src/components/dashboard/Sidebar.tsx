import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'permanent' | 'temporary'; // Add drawer type
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, variant }) => {
  const drawerWidth = variant === 'permanent' ? (isOpen ? 240 : 70) : 240;

  return (
    <Drawer
      variant={variant}
      open={isOpen}
      onClose={variant === 'temporary' ? onClose : undefined} // Handle closing for temporary mode
      sx={{
        width: variant === 'permanent' ? drawerWidth : 'auto',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1E1F25',
          color: '#FFFFFF',
          transition: 'width 0.3s',
        },
      }}
    >
      <Box
        sx={{
          padding: isOpen ? '20px' : '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'center' : 'left',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#FF5A5F',
            display: isOpen ? 'block' : 'none',
          }}
        >
          NFT Marketplace
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Dashboard" />}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AccountBalanceWalletIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Assets Wallet" />}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <StoreIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Marketplace" />}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ExpandMoreIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Reward Program" />}
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#FF5A5F' }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Logout" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
