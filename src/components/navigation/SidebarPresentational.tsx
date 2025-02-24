import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Collapse,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountBalanceWallet as WalletIcon,
  ShoppingCart as MarketplaceIcon,
  Inventory as InventoryIcon,
  AccountTree as ContractIcon,
  Settings as SettingsIcon,
  Verified as ValidateIcon,
  Store as StoreIcon,
  Receipt as OrdersIcon,
  EmojiEvents as RewardIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Logout as LogoutIcon,
  Support as SupportIcon,
  Newspaper as NewsIcon,
  Tv as StarvaraIcon,
} from '@mui/icons-material';
import logo from '../../assets/logo.svg';

interface SidebarPresentationalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'permanent' | 'temporary';
  walletOpen: boolean;
  rewardOpen: boolean;
  activeItem: string;
  toggleWallet: () => void;
  toggleReward: () => void;
  handleItemClick: (name: string) => void;
  handleLogout: () => void;
}

const SidebarPresentational: React.FC<SidebarPresentationalProps> = ({
  isOpen,
  onClose,
  variant,
  walletOpen,
  rewardOpen,
  activeItem,
  toggleWallet,
  toggleReward,
  handleItemClick,
  handleLogout,
}) => {
  const drawerWidth = isOpen ? 240 : 70;

  return (
    <Drawer
      variant={variant}
      open={isOpen}
      onClose={variant === 'temporary' ? onClose : undefined}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
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
          justifyContent: isOpen ? 'start' : 'left',
        }}
      >
        <img
          src={logo}
          alt="NFT Marketplace Logo"
          style={{
            width: isOpen ? 40 : 30,
            marginRight: isOpen ? 10 : 0,
            transition: 'width 0.3s',
          }}
        />
      </Box>
      <Divider />
      <List>
        {/* Dashboard */}
        <ListItem
          onClick={() => handleItemClick('Dashboard')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'Dashboard' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <DashboardIcon
              sx={{
                color: activeItem === 'Dashboard' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Dashboard" />}
        </ListItem>

        {/* AuBit Wallet Dropdown */}
        <ListItem
          onClick={toggleWallet}
          sx={{
            cursor: 'pointer',
            color: walletOpen ? '#FF5A5F' : '#FFFFFF',
            backgroundColor: walletOpen ? '#2A2C32' : 'transparent',
          }}
        >
          <ListItemIcon>
            <WalletIcon
              sx={{
                color: walletOpen ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="AuBit Wallet" />}
          {isOpen && (walletOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </ListItem>
        <Collapse in={walletOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              onClick={() => handleItemClick('Assets')}
              sx={{
                cursor: 'pointer',
                pl: 4,
                color: activeItem === 'Assets' ? '#FF5A5F' : '#FFFFFF',
                backgroundColor: '#2A2C32',
              }}
            >
              <ListItemText primary="Assets" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick('Claims')}
              sx={{
                cursor: 'pointer',
                pl: 4,
                color: activeItem === 'Claims' ? '#FF5A5F' : '#FFFFFF',
                backgroundColor: '#2A2C32',
              }}
            >
              <ListItemText primary="Claims" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick('Mint')}
              sx={{
                cursor: 'pointer',
                pl: 4,
                color: activeItem === 'Mint' ? '#FF5A5F' : '#FFFFFF',
                backgroundColor: '#2A2C32',
              }}
            >
              <ListItemText primary="Mint" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick('Sell')}
              sx={{
                cursor: 'pointer',
                pl: 4,
                color: activeItem === 'Sell' ? '#FF5A5F' : '#FFFFFF',
                backgroundColor: '#2A2C32',
              }}
            >
              <ListItemText primary="Sell" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick('Import Contract')}
              sx={{
                cursor: 'pointer',
                pl: 4,
                color: activeItem === 'Import Contract' ? '#FF5A5F' : '#FFFFFF',
                backgroundColor: '#2A2C32',
              }}
            >
              <ListItemText primary="Import Contract" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick('Wallet Settings')}
              sx={{
                cursor: 'pointer',
                pl: 4,
                color: activeItem === 'Wallet Settings' ? '#FF5A5F' : '#FFFFFF',
                backgroundColor: '#2A2C32',
              }}
            >
              <ListItemText primary="Wallet Settings" />
            </ListItem>
          </List>
        </Collapse>

        {/* Marketplace */}
        <ListItem
          onClick={() => handleItemClick('Marketplace')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'Marketplace' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <MarketplaceIcon
              sx={{
                color: activeItem === 'Marketplace' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Marketplace" />}
        </ListItem>

        {/* Validate AuBit */}
        <ListItem
          onClick={() => handleItemClick('Validate AuBit')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'Validate AuBit' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <ValidateIcon
              sx={{
                color: activeItem === 'Validate AuBit' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Validate AuBit" />}
        </ListItem>

        {/* Store */}
        <ListItem
          onClick={() => handleItemClick('Store')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'Store' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <StoreIcon
              sx={{
                color: activeItem === 'Store' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Store" />}
        </ListItem>

        {/* Inventory */}
        <ListItem
          onClick={() => handleItemClick('Inventory')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'Inventory' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <InventoryIcon
              sx={{
                color: activeItem === 'Inventory' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Inventory" />}
        </ListItem>

        {/* Orders */}
        <ListItem
          onClick={() => handleItemClick('Orders')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'Orders' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <OrdersIcon
              sx={{
                color: activeItem === 'Orders' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Orders" />}
        </ListItem>

        {/* Rewards Dropdown */}
        <ListItem
          onClick={toggleReward}
          sx={{
            cursor: 'pointer',
            color: rewardOpen ? '#FF5A5F' : '#FFFFFF',
            backgroundColor: rewardOpen ? '#2A2C32' : 'transparent',
          }}
        >
          <ListItemIcon>
            <RewardIcon
              sx={{
                color: rewardOpen ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Rewards" />}
          {isOpen && (rewardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </ListItem>
        <Collapse in={rewardOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              onClick={() => handleItemClick('Reward Points')}
              sx={{
                cursor: 'pointer',
                pl: 4,
                color: activeItem === 'Reward Points' ? '#FF5A5F' : '#FFFFFF',
                backgroundColor: '#2A2C32',
              }}
            >
              <ListItemText primary="Reward Points" />
            </ListItem>
            <ListItem
              onClick={() => handleItemClick('Reward History')}
              sx={{
                cursor: 'pointer',
                pl: 4,
                color: activeItem === 'Reward History' ? '#FF5A5F' : '#FFFFFF',
                backgroundColor: '#2A2C32',
              }}
            >
              <ListItemText primary="Reward History" />
            </ListItem>
          </List>
        </Collapse>

        {/* News */}
        <ListItem
          onClick={() => handleItemClick('News')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'News' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <NewsIcon
              sx={{
                color: activeItem === 'News' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="News" />}
        </ListItem>

        {/* Starvara */}
        <ListItem
          onClick={() => handleItemClick('Starvara')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'Starvara' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <StarvaraIcon
              sx={{
                color: activeItem === 'Starvara' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Starvara" />}
        </ListItem>

        {/* Support */}
        <ListItem
          onClick={() => handleItemClick('Support')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'Support' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <SupportIcon
              sx={{
                color: activeItem === 'Support' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Support" />}
        </ListItem>

        {/* Settings */}
        <ListItem
          onClick={() => handleItemClick('Settings')}
          sx={{
            cursor: 'pointer',
            color: activeItem === 'Settings' ? '#FF5A5F' : '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <SettingsIcon
              sx={{
                color: activeItem === 'Settings' ? '#FF5A5F' : '#FFFFFF',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Settings" />}
        </ListItem>

        {/* Logout */}
        <ListItem
          onClick={handleLogout}
          sx={{
            cursor: 'pointer',
            color: '#FFFFFF',
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          {isOpen && <ListItemText primary="Logout" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SidebarPresentational;