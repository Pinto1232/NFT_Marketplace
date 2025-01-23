import React, { useState } from 'react';
import { NavBarProps } from './NavBar.types';
import {
    StyledAppBar,
    StyledToolbar,
    MenuButton,
    LogoContainer,
    RightActionsContainer,
    BalanceChip,
    UserWalletChip,
    YellowDot,
    WalletContainer,
} from './NavBar.styles';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FiAlignLeft } from "react-icons/fi";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { DropdownLogin } from '../ui/dropdown/DropdownLogin';

const NavBar: React.FC<NavBarProps> = ({
    brandName,
    userBalance,
    userWallet,
    onNotificationClick,
    onMenuItemClick,
    menuItems = [],
    className,
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleMenuItemClick = (item: string) => {
        onMenuItemClick?.(item);
        setDrawerOpen(false);
    };

    return (
        <>
            <StyledAppBar position="static" className={className}>
                <StyledToolbar>
                    <LogoContainer style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MenuButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <FiAlignLeft />
                        </MenuButton>

                        <Typography variant="h6" component="div" sx={{
                            marginLeft: isMobile ? '-14px' : 0, fontSize: '1rem'
                        }}>
                            {brandName}
                        </Typography>
                    </LogoContainer>

                    <RightActionsContainer>
                        {/** Crypto Balance */
                            <WalletContainer>
                                <BalanceChip>
                                    <img
                                        src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=024"
                                        alt="BTC"
                                        style={{ width: 16, height: 16, whiteSpace: 'nowrap' }}
                                    />
                                    <span>{userBalance}</span>
                                </BalanceChip>

                                {/** Wallet Address */}
                                <ListItemButton>
                                    <UserWalletChip>
                                        <YellowDot />
                                        <span>{userWallet}</span>
                                    </UserWalletChip>
                                </ListItemButton>
                            </WalletContainer>}
                        {/* Login Dropdown */}
                        <DropdownLogin />

                        <IconButton color="inherit" onClick={onNotificationClick}>
                            <NotificationsNoneIcon />
                        </IconButton>
                    </RightActionsContainer>
                </StyledToolbar>
            </StyledAppBar>

            {/** Side Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    <Typography variant="h6" sx={{ p: 1 }}>
                        {brandName}
                    </Typography>

                    {/** Menu items */}
                    {menuItems.map((item) => (
                        <ListItemButton key={item} onClick={() => handleMenuItemClick(item)}>
                            <Typography>{item}</Typography>
                        </ListItemButton>
                    ))}
                    <ListItemButton onClick={onNotificationClick}>
                        <NotificationsNoneIcon />
                        <Typography sx={{ ml: 1 }}>Notifications</Typography>
                    </ListItemButton>

                    <Divider />
                </List>
            </Drawer>
        </>
    );
};

export default NavBar;
